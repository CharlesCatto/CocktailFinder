const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default {
	async post<T>(endpoint: string, data: object): Promise<T> {
		const response = await fetch(`${API_URL}/api${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();

		if (!response.ok) {
			throw new Error(
				responseData.error || responseData.message || "Erreur serveur",
			);
		}

		return responseData;
	},
};
