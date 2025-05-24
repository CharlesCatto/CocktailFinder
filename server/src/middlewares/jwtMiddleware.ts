import jwt from "jsonwebtoken";
import "dotenv/config";

const APP_SECRET = process.env.APP_SECRET as string;

if (!APP_SECRET) {
	throw new Error("APP_SECRET is not defined in environment variables");
}

export default {
	createToken: (payload: object): string => {
		return jwt.sign(payload, APP_SECRET, { expiresIn: "8h" });
	},

	verifyToken: (token: string): string | jwt.JwtPayload => {
		return jwt.verify(token, APP_SECRET);
	},
};
