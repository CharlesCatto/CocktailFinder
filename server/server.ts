// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// // Middleware
// app.use(cors()); // Permet les requêtes CORS
// app.use(express.json()); // Pour pouvoir lire les corps de requêtes JSON

// // Exemple de route de test
// app.get("/api/cocktails", (req, res) => {
// 	res.status(200).json({ message: "Cocktail API is working" });
// });

// // Démarrage du serveur
// app.listen(port, () => {
// 	console.log(`Server running on port ${port}`);
// });
import express from "express";
import cors from "cors";
import cardRoutes from "./routes/cardRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use("/api/cards", cardRoutes);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
