import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path"; // <-- Correction ici

// Charge le .env depuis la racine du projet (Card-App/.env)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const createClient = async () => {
	return await mysql.createConnection({
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 3306, // Conversion explicite en nombre
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	});
};
console.log("Tentative de connexion avec :", {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME,
});

export default createClient;
