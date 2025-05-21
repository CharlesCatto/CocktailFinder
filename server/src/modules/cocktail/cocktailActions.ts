import type { Request, Response } from "express";
import { findAllCocktails } from "./cocktailRepository";

export const getAllCocktails = async (req: Request, res: Response) => {
	try {
		const cocktails = await findAllCocktails();
		res.status(200).json(cocktails);
	} catch (error) {
		console.error("Erreur dans getAllCocktails:", error);
		res
			.status(500)
			.json({ error: "Erreur serveur lors de la récupération des cocktails." });
	}
};

// // Exemple dans cocktailActions.ts
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/cocktails/' });

// router.post('/', upload.single('image'), createCocktail);
