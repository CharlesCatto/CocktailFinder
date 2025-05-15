import { useState } from "react";

function AddCardForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		fetch("http://localhost:3000/api/cards", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, description }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Carte ajoutée !", data);
				setTitle("");
				setDescription("");
			})
			.catch((err) => console.error("Erreur ajout carte", err));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Ajouter une carte</h2>
			<input
				type="text"
				placeholder="Titre"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type="submit">Ajouter</button>
		</form>
	);
}

export default AddCardForm;
