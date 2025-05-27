import styles from "./NotFound.module.css";
import wrongBar from "../../assets/WrongBar.png";

function NotFound() {
	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<img className={styles.wrongBar} src={wrongBar} alt="Wrong Bar" />
				<div className={styles.neonOverlay}>
					<h1 className={styles.neonTitle}>404</h1>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
