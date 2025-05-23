import type { User } from "../user";
declare global {
	namespace Express {
		export interface Request {
			/**
			 * Utilisateur authentifié (ajouté par les middlewares d'authentification)
			 * - `undefined` si non authentifié
			 * - Contient les infos basiques de l'utilisateur après login
			 */
			user?: Pick<User, "id" | "email" | "username" | "is_admin">;
		}
	}
}
