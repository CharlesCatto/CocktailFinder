import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar"; // Assure-toi d'avoir la NavBar créée dans components
import styles from "./Layout.module.css";

function Layout() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1>Card App 🃏</h1>
				<NavBar /> {/* Remplace le nav simple par ta NavBar */}
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>
				<p>© 2025 - Card App</p>
			</footer>
		</div>
	);
}

export default Layout;
