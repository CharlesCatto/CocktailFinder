import express from "express";
// import favoris actions ici quand elles seront prêtes

const router = express.Router();

router.get("/", (req, res) => {
	res.json({ message: "Favoris route ready!" });
});

export default router;
