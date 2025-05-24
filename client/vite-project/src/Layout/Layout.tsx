import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import NeonSound from "../components/sound/NeonSound";
import KoolGang from "../components/sound/KoolGang";
import styles from "./Layout.module.css";

function Layout() {
	return (
		<div className={styles.container}>
			<NeonSound />
			<KoolGang />

			<header className={styles.header}>
				<NavBar />
			</header>

			<main className={styles.main}>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}

export default Layout;
