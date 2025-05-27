import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import bar from "../../assets/BAR.png";
import kro from "../../assets/KRO.png";

function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.carouselPlaceholder}>
				<div className={styles.imageContainer}>
					<img
						className={styles.bar}
						src={bar}
						alt="Bar"
						style={{ width: "100%", height: "auto" }}
					/>
					<img
						className={styles.light}
						src={kro}
						alt="Lights"
						style={{
							width: "100%",
							height: "auto",
							pointerEvents: "none",
						}}
					/>
				</div>
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
