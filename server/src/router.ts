import express from "express";
import AuthActions from "./modules/auth/AuthActions";

const router = express.Router();

/* ************************************************************************* */
// Authentification (identique à Road-Addict)
/* ************************************************************************* */
router.post("/api/register", AuthActions.register);
router.post("/api/login", AuthActions.login);

/* ************************************************************************* */
// Middleware pour les erreurs (optionnel mais recommandé)
/* ************************************************************************* */
router.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	},
);

export default router;
