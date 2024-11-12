import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

const dialect = new PostgresDialect({
	pool: new Pool({
		database: "testDatabase",
		host: "localhost",
		user: "postgres",
		port: 5432,
		max: 10,
	}),
});

export const db = new Kysely<Database>({
	dialect,
});
