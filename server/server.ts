import { FastifyReply, FastifyRequest, fastify } from "fastify";
import { Insertable } from "kysely";
import { Repository } from "./repository";
import { Hz, Job, Person } from "./types";

const server = fastify();

interface GetQuery {
	id?: string;
}

function setup<T>(path: string, crud: Repository<T>) {
	server.get(
		path,
		async (
			request: FastifyRequest<{ Querystring: GetQuery }>,
			reply: FastifyReply
		) => {
			const { id } = request.query;

			if (id) {
				const result = await crud.findById(Number(id));
				return { result };
			} else {
				const result = await crud.get();
				return { result };
			}
		}
	);
	server.post(
		path,
		async (
			request: FastifyRequest<{ Body: Insertable<T> }>,
			reply: FastifyReply
		) => {
			try {
				const object = request.body;

				// Call the addPerson function to add the new person
				const newObject = await crud.create(object as Insertable<T>);

				// Send response with the created person
				reply.status(201).send({ result: newObject });
			} catch (error) {
				// Handle potential errors, such as database insertion errors
				reply.status(500).send({ error: error });
			}
		}
	);
}

setup<Person>("/person", new Repository("persons"));
setup<Job>("/job", new Repository("jobs"));
setup<Hz>(
	"/hz",
	new Repository(
		"hz",
		query =>
			query
				.innerJoin("persons", "persons.id", "hz.person_id")
				.innerJoin("jobs", "jobs.id", "hz.job_id")
				.select(["jobs.name as job_name", "persons.name as p_name"]),
		obj => ({
			id: obj.id,
			person: {
				surname: obj.surname,
				name: obj.p_name,
				patronymic: obj.patronymic,
			},
			job: {
				name: obj.job_name,
			},
		})
	)
);

server.listen({ port: 8080 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
