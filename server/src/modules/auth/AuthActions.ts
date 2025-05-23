import type { RequestHandler } from "express";
import authRepository from "./AuthRepository";
import type { User } from "../../types/user";

const register: RequestHandler = async (req, res, next) => {
	try {
		const { email, password, username, firstname, lastname } = req.body;

		if (!email || !password) {
			res.status(400).json({ error: "Email and password required" });
			return;
		}

		const userId = await authRepository.create({
			email,
			password,
			username: username || "", // Valeur par défaut si undefined
			firstname: firstname || "",
			lastname: lastname || "",
		});

		res.status(201).json({
			id: userId,
			email,
			username: username || null,
			firstname: firstname || null,
			lastname: lastname || null,
		});
	} catch (error) {
		next(error);
	}
};

const login: RequestHandler = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await authRepository.findByEmail(email);

		if (!user || user.password !== password) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		// Type assertion si nécessaire
		const userWithProfile = user as User & {
			firstname?: string;
			lastname?: string;
			is_admin?: boolean;
		};

		res.json({
			id: user.id,
			email: user.email,
			username: user.username || null,
			firstname: userWithProfile.firstname || null,
			lastname: userWithProfile.lastname || null,
			is_admin: userWithProfile.is_admin || false,
		});
	} catch (error) {
		next(error);
	}
};

export default {
	register,
	login,
};
