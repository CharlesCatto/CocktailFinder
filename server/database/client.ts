import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path";

// Charge le .env depuis le dossier server
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Vérification des variables d'environnement
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
	throw new Error("Database configuration is missing in .env file");
}

// Configuration type-safe du pool
export const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

console.log("MySQL Pool configuré pour la base:", process.env.DB_NAME);

// Fonction pour créer un client (compatible avec seed.ts)
export async function createClient() {
	return await pool.getConnection();
}
