import { Generated, Selectable } from "kysely";

export type types = "persons" | "jobs" | "hz";

export interface Database {
	persons: PersonTable;
	jobs: JobsTable;
	hz: HzTable;
}
export interface PersonTable {
	id: Generated<number>;
	surname: string;
	name: string;
	patronymic: string | null;
}

export type Person = Selectable<PersonTable>;

export interface JobsTable {
	id: Generated<number>;
	name: string;
}

export type Job = Selectable<JobsTable>;

export interface HzTable {
	id: Generated<number>;
	person_id: number;
	job_id: number;
}

export type Hz = Selectable<JobsTable>;
