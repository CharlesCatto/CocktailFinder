import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", router);

// Port configuration
const PORT = process.env.PORT || 3000;

export default app;
