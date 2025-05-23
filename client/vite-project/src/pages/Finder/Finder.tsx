// src/pages/Finder/Finder.tsx
import { useState, useEffect } from "react";
import { useCocktailContext } from "../../contexts/CocktailContext";
import CocktailSearch from "../../components/CocktailSearch/CocktailSearch";
import styles from "./Finder.module.css";

function Finder() {
	const { cocktails } = useCocktailContext();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Explorer les Cocktails</h1>

			<div className={styles.searchSection}>
				<CocktailSearch setIsLoading={setIsLoading} />
			</div>

			{isLoading && <div className={styles.loader}>Chargement...</div>}

			<div className={styles.results}>
				{cocktails.length > 0 ? (
					<div className={styles.grid}>
						{cocktails.map((drink) => (
							<div key={drink.idDrink} className={styles.card}>
								<img
									src={drink.strDrinkThumb}
									alt={drink.strDrink}
									className={styles.image}
								/>
								<h3 className={styles.name}>{drink.strDrink}</h3>
								<p className={styles.category}>{drink.strCategory}</p>
							</div>
						))}
					</div>
				) : (
					<p className={styles.empty}>
						Utilisez la recherche pour découvrir des cocktails
					</p>
				)}
			</div>
		</div>
	);
}

export default Finder;
