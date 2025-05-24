import styles from "./About.module.css";
import AboutBG from "../../assets/AboutBG.png";

export default function About() {
	return (
		<div className={styles.container}>
			<div
				className={styles.backgroundImage}
				style={{ backgroundImage: `url(${AboutBG})` }}
			/>

			<div className={styles.content}>
				<h1 className={styles.title}>Cocktail Finder</h1>
				<div className={styles.textBox}>
					<p>
						Bienvenue dans notre univers cocktail rétro-futuriste ! Trouvez la
						recette parfaite en fonction de ce que vous avez dans votre bar.
					</p>
					<p>
						Inspiré par l'énergie des années 80, ce site vous transporte à Miami
						Beach, où chaque cocktail raconte une histoire.
					</p>
					<p className={styles.signature}>- L'équipe Cocktail Finder</p>
				</div>
			</div>
		</div>
	);
}
