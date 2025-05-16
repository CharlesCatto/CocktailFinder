// src/components/CocktailSearch/CocktailSearch.tsx
import { useState } from "react";
import { useCocktailContext } from "../../contexts/CocktailContext";
import styles from "./CocktailSearch.module.css";

interface CocktailSearchProps {
	setIsLoading: (loading: boolean) => void;
}

function CocktailSearch({ setIsLoading }: CocktailSearchProps) {
	const [query, setQuery] = useState("");
	const { setCocktails } = useCocktailContext();

	const handleSearch = () => {
		if (!query.trim()) return;

		setIsLoading(true);
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setCocktails(data.drinks || []);
			})
			.catch((err) => {
				console.error("Erreur API :", err);
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
					placeholder="Rechercher un cocktail..."
					className={styles.input}
				/>
				<button
					type="button"
					onClick={handleSearch}
					className={styles.button}
					disabled={!query.trim()}
				>
					Rechercher
				</button>
			</div>
		</div>
	);
}

export default CocktailSearch;
