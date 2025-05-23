import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../database/client";
import type { User } from "../../types/user";

export default {
	async create(user: User): Promise<number> {
		const [result] = await pool.query<ResultSetHeader>(
			"INSERT INTO user (email, password, username, firstname, lastname) VALUES (?, ?, ?, ?, ?)",
			[user.email, user.password, user.username, user.firstname, user.lastname],
		);
		return result.insertId;
	},

	async findByEmail(email: string): Promise<User | undefined> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT id, email, password, username, firstname, lastname, is_admin FROM user WHERE email = ?",
			[email],
		);
		return rows[0] as User | undefined;
	},

	async findById(id: number): Promise<User | undefined> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT id, email, password, username, firstname, lastname, is_admin FROM user WHERE id = ?",
			[id],
		);
		return rows[0] as User | undefined;
	},
	async findByUsername(username: string): Promise<User | undefined> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT * FROM user WHERE username = ?",
			[username],
		);
		return rows[0] as User | undefined;
	},
};
