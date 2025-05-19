import { readFile } from "node:fs/promises";
import createClient from "../database/client";
import path from "node:path";

async function migrate() {
	const client = await createClient();

	try {
		const sqlPath = path.resolve(__dirname, "../database/schema.sql");
		const sql = await readFile(sqlPath, "utf-8");

		// Sépare les requêtes par point-virgule et filtre les lignes vides
		const queries = sql
			.split(";")
			.map((q) => q.trim())
			.filter((q) => q.length > 0);

		// Exécute chaque requête une par une
		for (const query of queries) {
			await client.query(query);
		}

		console.log("✅ Migration terminée !");
	} catch (err) {
		console.error("❌ Erreur de migration :", err);
	} finally {
		await client.end();
	}
}

migrate();
