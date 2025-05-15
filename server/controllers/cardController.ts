import { Request, Response } from "express";
import { getAllCards } from "../repositories/cardRepository";

export const fetchAllCards = (_req: Request, res: Response) => {
	const cards = getAllCards();
	res.json(cards);
};
