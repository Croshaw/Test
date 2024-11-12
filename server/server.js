import Fastify from "fastify";
import calc from "./calc.js";
const fastify = Fastify({ logger: true });

fastify.get("/", async function handler(request, reply) {
	const exp = request.query.exp;
	return { result: await calc.calc(exp) };
});

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}