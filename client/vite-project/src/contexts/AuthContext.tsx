import { createContext, useContext, ReactNode, useState } from "react";

interface User {
	id: number;
	username: string;
	email: string;
	is_admin: boolean;
}

interface AuthContextType {
	user: User | null;
	handleLogin: (user: User) => void;
	handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const handleLogin = (userData: User) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
