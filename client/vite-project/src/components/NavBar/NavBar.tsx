import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./NavBar.module.css";

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className={styles.navbar}>
			<h1 className={styles.title}>Cocktail</h1>

			<div className={styles.menuIcon} onClick={toggleMenu}>
				<span className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
				<span className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
				<span className={`${styles.bar} ${isOpen ? styles.open : ""}`} />
			</div>

			<div className={`${styles.menu} ${isOpen ? styles.openMenu : ""}`}>
				<NavLink to="/">Accueil</NavLink>
				<NavLink to="/about">À propos</NavLink>
			</div>
		</nav>
	);
}

export default NavBar;
