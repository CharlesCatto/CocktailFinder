import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.content}>
				<div className={styles.logoContainer}>
					<span className={styles.logo}>Cocktail</span>
					<span className={styles.slogan}>Find your perfect mix</span>
				</div>

				{/* <nav className={styles.nav}>
					<Link to="/" className={styles.link}>
						Home
					</Link>
					<Link to="/finder" className={styles.link}>
						Finder
					</Link>
					<Link to="/about" className={styles.link}>
						About
					</Link>
					<Link to="/account" className={styles.link}>
						Account
					</Link>
				</nav> */}

				<div className={styles.socials}>
					{/* <a href="_" className={styles.socialLink}>
						Instagram
					</a>
					<a href="_" className={styles.socialLink}>
						Twitter
					</a> */}
					<a
						href="https://github.com/CharlesCatto/CocktailFinder"
						className={styles.socialLink}
					>
						GitHub
					</a>
				</div>

				<div className={styles.copyright}>
					© 2025 COCKTAIL FINDER | All rights reserved
				</div>
			</div>
		</footer>
	);
}
