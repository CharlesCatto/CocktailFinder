import { useState, useEffect } from "react";
import { useCocktailContext } from "../../contexts/CocktailContext";
import styles from "./CocktailSearch.module.css";

interface CocktailSearchProps {
	setIsLoading: (loading: boolean) => void;
}

const placeholderOptions = [
	"Espresso Martini?",
	"Tequila vibe? 🍹",
	"Classy & strong?",
	"Sweet & deadly 😈",
	"Pink & dangerous 💖",
	"Rum or vodka?",
	"James Bond style? 🍸",
	"Minty fresh?",
	"Surprise me!",
	"Something bold?",
];

// // 🇫🇷 Français
// const phrases = [
// 	"Un petit mojito ?",
// 	"Quelque chose de frais ?",
// 	"Un cocktail fruité ?",
// 	"À base de rhum, peut-être ?",
// 	"Un classique revisité ?",
// ];

// // 🇬🇧 English
// const sentences = [
// 	"Espresso Martini?",
// 	"Something tropical?",
// 	"Shake it up!",
// 	"Whiskey, maybe?",
// 	"Pink but deadly?",
// 	"Classy & strong?",
// 	"Surprise me!",
// 	"Citrusy delight?",
// 	"Vodka or gin?",
// 	"Light and fun?",
// ];

// // 🇪🇸 Español
// const oracion = [
// 	"¿Un mojito fresco?",
// 	"¿Algo con tequila?",
// 	"¡Sabor tropical!",
// 	"¿Un cóctel clásico?",
// 	"¡Sorpréndeme!",
// ];

function CocktailSearch({ setIsLoading }: CocktailSearchProps) {
	const [query, setQuery] = useState("");
	const [placeholder, setPlaceholder] = useState("Search a cocktail...");
	const { setCocktails } = useCocktailContext();

	useEffect(() => {
		const getRandomPlaceholder = () =>
			placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];

		setPlaceholder(getRandomPlaceholder());

		const interval = setInterval(() => {
			setPlaceholder(getRandomPlaceholder());
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const handleSearch = () => {
		if (!query.trim()) return;

		setIsLoading(true);
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setCocktails(data.drinks || []);
			})
			.catch((err) => {
				console.error("API error:", err);
				setCocktails([]);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchBox}>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && handleSearch()}
					placeholder={placeholder}
					className={styles.input}
				/>
				<button
					type="button"
					onClick={handleSearch}
					className={styles.button}
					disabled={!query.trim()}
				>
					Search
				</button>
			</div>
		</div>
	);
}

export default CocktailSearch;
