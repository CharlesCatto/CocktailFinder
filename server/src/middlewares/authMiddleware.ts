import * as argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import type { RequestHandler } from "express";

declare module "express-serve-static-core" {
	interface Request {
		user?: { sub: string; email: string };
	}
}
export const hashPassword: RequestHandler = async (req, res, next) => {
	try {
		if (!req.body.password) {
			res.status(400).json({ error: "Password is required" });
			return;
		}
		req.body.hashedPassword = await argon2.hash(req.body.password);
		next();
	} catch (error) {
		console.error("Password hashing error:", error);
		res.status(500).json({ error: "Password hashing failed" });
	}
};

export const verifyToken: RequestHandler = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		res.status(401).json({ error: "Unauthorized - No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

		if (
			typeof decoded === "object" &&
			"sub" in decoded &&
			"email" in decoded &&
			typeof decoded.sub === "string" &&
			typeof decoded.email === "string"
		) {
			req.user = {
				sub: decoded.sub,
				email: decoded.email,
			};
			next();
		} else {
			res.status(401).json({ error: "Invalid token payload" });
		}
	} catch (error) {
		console.error("Token verification error:", error);
		res.status(401).json({ error: "Invalid token" });
	}
};
