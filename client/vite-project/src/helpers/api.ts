import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
	const user = localStorage.getItem("user");
	if (user) {
		const parsedUser = JSON.parse(user);
		config.headers.Authorization = `Bearer ${parsedUser.token}`;
	}
	return config;
});

export default api;
