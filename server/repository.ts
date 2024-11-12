import { SelectQueryBuilder } from "kysely/dist/cjs/query-builder/select-query-builder";
import { Insertable } from "kysely/dist/cjs/util/column-type";
import { db } from "./database";
import { Database, types } from "./types";
export class Repository<T> {
	private tableName: types;
	private joiner?: (
		query: SelectQueryBuilder<Database, types, {}>
	) => SelectQueryBuilder<Database, types, {}>;
	private mapper?: (obj: any) => any;
	constructor(
		tableName: types,
		joiner?: (
			query: SelectQueryBuilder<Database, types, {}>
		) => SelectQueryBuilder<Database, types, {}>,
		mapper?: (obj: any) => any
	) {
		this.tableName = tableName;
		this.joiner = joiner;
		this.mapper = mapper;
	}
	async get() {
		let start = db.selectFrom(this.tableName);
		if (this.joiner) start = this.joiner(start);
		const result = await start.selectAll().execute();
		if (this.mapper) return result.map(this.mapper);
		return result;
	}
	async findById(id: number) {
		let start = db.selectFrom(this.tableName).where("id", "=", id);
		if (this.joiner) start = this.joiner(start);
		const result = await start.selectAll().executeTakeFirst();
		if (this.mapper) return this.mapper(result);
		return result;
	}
	async create(object: Insertable<T>) {
		return await db
			.insertInto(this.tableName)
			.values(object)
			.returningAll()
			.executeTakeFirstOrThrow();
	}
}
