import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NeonSound from "../components/sound/NeonSound";
import KoolGang from "../components/sound/KoolGang";
import styles from "./Layout.module.css";

function Layout() {
	return (
		<div className={styles.container}>
			{/* Sons globaux qui jouent partout */}
			<NeonSound />
			<KoolGang />

			<header className={styles.header}>
				<NavBar />
			</header>

			<main className={styles.main}>
				<Outlet />
			</main>

			<footer className={styles.footer}>
				<p>© 2025 - Cocktail</p>
			</footer>
		</div>
	);
}

export default Layout;
