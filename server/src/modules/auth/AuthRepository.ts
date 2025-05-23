// import databaseClient from "../../../database/client";

// type User = {
// 	id?: number;
// 	email: string;
// 	password: string;
// 	username?: string;
// };

// class AuthRepository {
// 	// The C of CRUD - Create operation (pour
// 	// l'authentification c'est le register)

// 	async create(user: Omit<User, "id">) {
// 		// Execute the SQL INSERT query to add a new user to the "user" table
// 		const [result] = await databaseClient.query<Result>(
// 			"INSERT INTO user (title, user_id) values (?, ?)",
// 			[user.email, user.password],
// 		);

// 		return result.insertId;
// 	}
// }
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
};
