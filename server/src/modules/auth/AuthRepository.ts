import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../database/client";
import type { User } from "../../types/user";

export default {
	async create(user: Omit<User, "id">): Promise<number> {
		const [result] = await pool.query<ResultSetHeader>(
			"INSERT INTO user (email, password, username, firstname, lastname, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
			[
				user.email,
				user.password,
				user.username,
				user.firstname || null,
				user.lastname || null,
				user.is_admin || false,
			],
		);
		return result.insertId;
	},

	async findByEmail(email: string): Promise<User | null> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT id, email, password, username, firstname, lastname, is_admin FROM user WHERE email = ?",
			[email],
		);
		return rows[0] as User | null;
	},

	async findById(id: number): Promise<User | null> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT id, email, username, firstname, lastname, is_admin FROM user WHERE id = ?",
			[id],
		);
		return rows[0] as User | null;
	},

	async findByUsername(username: string): Promise<User | null> {
		const [rows] = await pool.query<RowDataPacket[]>(
			"SELECT id, email, username FROM user WHERE username = ?",
			[username],
		);
		return rows[0] as User | null;
	},
};
