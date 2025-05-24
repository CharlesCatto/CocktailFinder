import type { RequestHandler } from "express";
import authRepository from "./AuthRepository";
import jwt from "../../middlewares/jwtMiddleware";
import * as argon2 from "argon2";
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

		if (!req.body.hashedPassword) {
			res.status(500).json({ error: "Password not hashed" });
			return;
		}

		const userId = await authRepository.create({
			email,
			password: req.body.hashedPassword,
			username,
			firstname: firstname || null,
			lastname: lastname || null,
			is_admin: false,
		});

		const user = await authRepository.findById(userId);
		if (!user) {
			res.status(500).json({ error: "User creation failed" });
			return;
		}

		const token = jwt.createToken({
			userId: user.id,
			email: user.email,
			isAdmin: user.is_admin,
		});

		const { password: _, ...userWithoutPassword } = user;

		res
			.status(201)
			.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 8 * 60 * 60 * 1000,
			})
			.json(userWithoutPassword);
		return;
	} catch (error) {
		next(error);
	}
};

const login: RequestHandler = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await authRepository.findByEmail(email);

		if (!user) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const passwordMatch = await argon2.verify(user.password, password);
		if (!passwordMatch) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const token = jwt.createToken({
			userId: user.id,
			email: user.email,
			isAdmin: user.is_admin,
		});

		const { password: _, ...userWithoutPassword } = user;

		res
			.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 8 * 60 * 60 * 1000,
			})
			.json(userWithoutPassword);
		return;
	} catch (error) {
		next(error);
	}
};

const logout: RequestHandler = (req, res) => {
	res
		.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
		})
		.status(200)
		.json({ message: "Logout successful" });
	return;
};

export default {
	register,
	login,
	logout,
};
