// import express from "express";
// import AuthActions from "./modules/auth/AuthActions";

// const router = express.Router();

// /* ************************************************************************* */
// // Authentification (identique à Road-Addict)
// /* ************************************************************************* */
// router.post("/api/register", AuthActions.register);
// router.post("/api/login", AuthActions.login);

// /* ************************************************************************* */
// // Middleware pour les erreurs (optionnel mais recommandé)
// /* ************************************************************************* */

// export default router;

// // import cocktailRouter from "./routes/api/cocktailRoutes"; router.use("/cocktails", cocktailRouter); router.use("/favoris", favorisRouter);

import express from "express";
import AuthActions from "./modules/auth/AuthActions";
import { hashPassword, verifyToken } from "./middlewares/authMiddleware";

const router = express.Router();

router.post("/api/register", hashPassword, AuthActions.register);
router.post("/api/login", AuthActions.login);
router.post("/api/logout", AuthActions.logout);

router.get("/api/me", verifyToken, (req, res) => {
	res.json({ user: req.user });
});

export default router;
