import type { RequestHandler } from "express";
import authRepository from "./AuthRepository";
import type { User } from "../../types/user";

const register: RequestHandler = async (req, res, next) => {
	try {
		const { email, password, username, firstname, lastname } = req.body;

		if (!email || !password || !username) {
			res
				.status(400)
				.json({ error: "Email, password and username are required" });
			return;
		}

		const [existingUser, existingUsername] = await Promise.all([
			authRepository.findByEmail(email),
			authRepository.findByUsername(username),
		]);

		if (existingUser) {
			res.status(409).json({ error: "Email already exists" });
			return;
		}

		if (existingUsername) {
			res.status(409).json({ error: "Username already exists" });
			return;
		}

		const userId = await authRepository.create({
			email,
			password,
			username,
			firstname: firstname || "",
			lastname: lastname || "",
		});

		res.status(201).json({
			id: userId,
			email,
			username,
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

		res.json({
			id: user.id,
			email: user.email,
			username: user.username || null,
			firstname: user.firstname || null,
			lastname: user.lastname || null,
			is_admin: user.is_admin || false,
		});
	} catch (error) {
		next(error);
	}
};

export default {
	register,
	login,
};
