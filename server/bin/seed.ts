// server/bin/seed.ts
import createClient from "../database/client";

async function seed() {
	const client = await createClient();

	try {
		await client.query(
			"INSERT INTO cocktail (id, name, image_url, category, alcoholic, glass, instructions) VALUES (?, ?, ?, ?, ?, ?, ?)",
			[
				11000,
				"Gin Tonic",
				"https://example.com/gin-tonic.jpg",
				"Cocktail",
				true,
				"Highball glass",
				"Mélanger avec des glaçons.",
			],
		);

		await client.query("INSERT INTO ingredient (name) VALUES (?), (?), (?)", [
			"Gin",
			"Tonic",
			"Citron",
		]);

		console.log("✅ Données insérées !");
	} catch (err) {
		console.error("❌ Erreur lors du seed :", err);
	} finally {
		await client.end();
	}
}

seed();
