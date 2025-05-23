import { pool } from "../database/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function migrate() {
	const connection = await pool.getConnection(); // Utilisez getConnection() depuis le pool

	try {
		const sqlPath = path.resolve(__dirname, "../database/schema.sql");
		const sql = await readFile(sqlPath, "utf-8");

		const queries = sql
			.split(";")
			.map((q) => q.trim())
			.filter((q) => q.length > 0);

		for (const query of queries) {
			await connection.query(query);
		}

		console.log("✅ Migration terminée !");
	} catch (err) {
		console.error("❌ Erreur de migration :", err);
	} finally {
		connection.release(); // Libère la connexion dans le pool
	}
}

migrate();
