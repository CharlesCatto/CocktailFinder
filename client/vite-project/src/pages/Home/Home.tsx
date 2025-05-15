import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.carouselPlaceholder}>
				<p className={styles.carouselText}>[ Carrousel ici bientôt ✨ ]</p>
			</div>

			<Link to="/cocktails" className={styles.ctaButton}>
				Découvrir les Cocktails
			</Link>

			<p className={styles.description}>
				Bienvenue dans l'univers rétro de la mixologie ! 🌐<br />
				Explore une base de données de cocktails stylés et trouve ta boisson
				idéale. Recherche par ingrédient, par nom ou découvre des recettes
				aléatoires venues d'une autre dimension 🍸🪩
			</p>
		</div>
	);
}

export default Home;
