import { pool } from "../database/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

async function migrate() {
	const connection = await pool.getConnection();

	try {
		const sqlPath = path.resolve(__dirname, "../database/schema.sql");
		const sql = await readFile(sqlPath, "utf-8");

		// Désactive les vérifications de clé étrangère temporairement
		await connection.query("SET FOREIGN_KEY_CHECKS = 0");

		const queries = sql
			.split(";")
			.map((q) => q.trim())
			.filter((q) => q.length > 0);

		for (const query of queries) {
			if (query) await connection.query(query);
		}

		console.log("✅ Migration terminée !");
	} catch (err) {
		console.error("❌ Erreur de migration :", err);
		process.exit(1);
	} finally {
		// Réactive les vérifications de clé étrangère
		await connection.query("SET FOREIGN_KEY_CHECKS = 1");
		connection.release();
		await pool.end();
	}
}

migrate().catch(console.error);
