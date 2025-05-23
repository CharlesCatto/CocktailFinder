import express from "express";
import { getAllCocktails } from "../../modules/cocktail/cocktailActions";
const router = express.Router();

router.get("/", getAllCocktails); // GET /api/cocktails

export default router;
