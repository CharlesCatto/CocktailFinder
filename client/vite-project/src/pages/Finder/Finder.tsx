import { useState, useEffect } from "react";
import { useCocktailContext } from "../../contexts/CocktailContext";
import CocktailSearch from "../../components/CocktailSearch/CocktailSearch";
import styles from "./Finder.module.css";
import type { Cocktail } from "../../types/cocktail";

function Finder() {
	const [emptyMessage, setEmptyMessage] = useState("");
	const { cocktails } = useCocktailContext();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(
		null,
	);

	const funMessages = [
		"Ready to shake things up? Start searching!",
		"No drinks yet... type a name and stir the magic!",
		"Search for your next favorite cocktail!",
		"No cocktails yet... Mix it up with a search!",
	];

	const getIngredients = (cocktail: Cocktail) => {
		const ingredients = [];
		for (let i = 1; i <= 15; i++) {
			const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
			const measure = cocktail[`strMeasure${i}` as keyof Cocktail];
			if (ingredient && ingredient.trim() !== "") {
				ingredients.push({
					ingredient,
					measure: measure?.trim() || "",
				});
			}
		}
		return ingredients;
	};

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * funMessages.length);
		setEmptyMessage(funMessages[randomIndex]);
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>The World of Cocktails</h1>

			<div className={styles.searchSection}>
				<CocktailSearch setIsLoading={setIsLoading} />
			</div>

			{isLoading && <div className={styles.loader}>Chargement...</div>}

			<div className={styles.results}>
				{cocktails.length > 0 ? (
					<div className={styles.grid}>
						{cocktails.map((drink) => (
							<div
								key={drink.idDrink}
								className={styles.card}
								onClick={() => setSelectedCocktail(drink)}
							>
								<img
									src={drink.strDrinkThumb}
									alt={drink.strDrink}
									className={styles.image}
								/>
								<h3 className={styles.name}>{drink.strDrink}</h3>
								{drink.strCategory && (
									<p className={styles.category}>{drink.strCategory}</p>
								)}
								{drink.strAlcoholic && (
									<p className={styles.alcoholic}>{drink.strAlcoholic}</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p className={styles.empty}>{emptyMessage}</p>
				)}
			</div>

			{/* Modal de détails */}
			{selectedCocktail && (
				<div
					className={styles.modalBackdrop}
					onClick={() => setSelectedCocktail(null)}
				>
					<div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							className={styles.closeButton}
							onClick={() => setSelectedCocktail(null)}
						>
							×
						</button>

						<div className={styles.modalHeader}>
							<img
								src={selectedCocktail.strDrinkThumb}
								alt={selectedCocktail.strDrink}
								className={styles.modalImage}
							/>
							<div className={styles.modalTitle}>
								<h2>{selectedCocktail.strDrink}</h2>
								<div className={styles.tags}>
									{selectedCocktail.strCategory && (
										<span className={styles.tag}>
											{selectedCocktail.strCategory}
										</span>
									)}
									{selectedCocktail.strAlcoholic && (
										<span className={styles.tag}>
											{selectedCocktail.strAlcoholic}
										</span>
									)}
									{selectedCocktail.strGlass && (
										<span className={styles.tag}>
											{selectedCocktail.strGlass}
										</span>
									)}
								</div>
							</div>
						</div>

						<div className={styles.modalBody}>
							<div className={styles.section}>
								<h3>Instructions</h3>
								<p>
									{selectedCocktail.strInstructions ||
										"No instructions available"}
								</p>
							</div>

							<div className={styles.section}>
								<h3>Ingredients</h3>
								<ul className={styles.ingredientsList}>
									{getIngredients(selectedCocktail).map((item, index) => (
										<li key={index} className={styles.ingredientItem}>
											{item.measure && (
												<span className={styles.measure}>{item.measure}</span>
											)}
											<span className={styles.ingredientName}>
												{item.ingredient}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Finder;
