import express from "express";
import cors from "cors";
import router from "./router";
import type { ErrorRequestHandler } from "express";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);

// Routes
app.use("/", router);

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
	console.error("[APP ERROR]", err);
	console.error("On request:", req.method, req.path, "\nBody:", req.body);
	next(err);
};
app.use(logErrors);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	res.status(500).json({
		error: "Internal Server Error",
		message: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
};
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Server ready on port ${PORT}`);
});

export default app;
