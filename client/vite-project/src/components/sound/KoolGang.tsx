// import { useEffect, useRef } from "react";

// function KoolGang() {
// 	const audioRef = useRef<HTMLAudioElement>(null);

// 	useEffect(() => {
// 		const audio = audioRef.current;
// 		if (audio) {
// 			audio.volume = 0.25;
// 			audio.play().catch((e) => {
// 				console.warn("Lecture bloquée par le navigateur", e);
// 			});
// 		}
// 	}, []);

// 	return (
// 		<audio
// 			ref={audioRef}
// 			src="/audio/audiokool_gang_sample.mp4"
// 			loop
// 			preload="auto"
// 		/>
// 	);
// }

// export default KoolGang;
import { useEffect, useRef, useState } from "react";

function KoolGang() {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [userInteracted, setUserInteracted] = useState(false);

	// Détecter la première interaction utilisateur
	useEffect(() => {
		const handleInteraction = () => {
			setUserInteracted(true);
			// On retire l'écouteur après la première interaction
			window.removeEventListener("click", handleInteraction);
			window.removeEventListener("keydown", handleInteraction);
			window.removeEventListener("touchstart", handleInteraction);
		};

		// Plusieurs types d'interactions possibles
		window.addEventListener("click", handleInteraction);
		window.addEventListener("keydown", handleInteraction);
		window.addEventListener("touchstart", handleInteraction);

		return () => {
			window.removeEventListener("click", handleInteraction);
			window.removeEventListener("keydown", handleInteraction);
			window.removeEventListener("touchstart", handleInteraction);
		};
	}, []);

	// Lancer la lecture après interaction
	useEffect(() => {
		if (userInteracted && audioRef.current) {
			audioRef.current.volume = 0.25;
			audioRef.current.play().catch((e) => {
				console.error("Erreur de lecture audio:", e);
			});
		}
	}, [userInteracted]);

	return (
		<audio
			ref={audioRef}
			src="/audio/audiokool_gang_sample.mp4"
			loop
			preload="auto"
			// Ajout muted pour contourner les restrictions (optionnel)
			muted={false}
		/>
	);
}

export default KoolGang;
