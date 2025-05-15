import express from "express";
import { fetchAllCards } from "../controllers/cardController";

const router = express.Router();

router.get("/", fetchAllCards);

export default router;
