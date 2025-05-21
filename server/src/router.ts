import express from "express";
import cocktailRouter from "./routes/api/cocktailRoutes";
import favorisRouter from "./routes/api/favorisRoutes";

const router = express.Router();

router.use("/cocktails", cocktailRouter);
router.use("/favoris", favorisRouter);

export default router;
