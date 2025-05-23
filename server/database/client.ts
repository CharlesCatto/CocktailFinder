import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Configuration type-safe du pool
export const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "card_app",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

console.log("MySQL Pool configuré pour la base:", process.env.DB_NAME);
