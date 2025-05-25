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
						Welcome to our retro-futuristic cocktail universe! Discover the
						perfect recipe based on what’s chilling in your bar.
					</p>
					<p>
						Fueled by the electric vibes of the '80s, this site whisks you away
						to Miami Beach—where every cocktail has a story to tell.
					</p>
					<p className={styles.signature}>– Cheers, and happy mixing!</p>
				</div>
			</div>
		</div>
	);
}
