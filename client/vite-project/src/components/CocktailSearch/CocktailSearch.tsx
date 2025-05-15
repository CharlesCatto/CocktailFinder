// src/components/CocktailSearch/CocktailSearch.tsx
import { useState } from "react";
import { useCocktailContext } from "../../contexts/CocktailContext";
import type { Cocktail } from "../../types/cocktail";

function CocktailSearch() {
	const [query, setQuery] = useState("");
	const { cocktails, setCocktails } = useCocktailContext();

	const handleSearch = () => {
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setCocktails(data.drinks || []);
			})
			.catch((err) => console.error("Erreur API :", err));
	};

	return (
		<div>
			<h2>Recherche de cocktails 🍸</h2>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
				placeholder="Tapez un nom de cocktail"
			/>

			<button type="button" onClick={handleSearch}>
				Rechercher
			</button>

			<div>
				{cocktails.map((drink: Cocktail) => (
					<div key={drink.idDrink}>
						<h3>{drink.strDrink}</h3>
						<img src={drink.strDrinkThumb} alt={drink.strDrink} />
					</div>
				))}
			</div>

			{cocktails.length === 0 && query && (
				<p>Aucun cocktail trouvé pour "{query}".</p>
			)}
		</div>
	);
}

export default CocktailSearch;
