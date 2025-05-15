// src/CardList.tsx

import { useEffect, useState } from "react";

type Card = {
	id: number;
	title: string;
	description: string;
};

function CardList() {
	const [cards, setCards] = useState<Card[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/cards")
			.then((res) => res.json())
			.then((data) => setCards(data))
			.catch((error) => console.error("Erreur fetch :", error));
	}, []);

	return (
		<div>
			<h2>Liste des Cartes</h2>
			{cards.map((card) => (
				<div
					key={card.id}
					style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}
				>
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			))}
		</div>
	);
}

export default CardList;
