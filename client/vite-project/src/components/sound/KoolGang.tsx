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
	const [isPlaying, setIsPlaying] = useState(false);
	const [showButton, setShowButton] = useState(true);

	const togglePlay = async () => {
		if (!audioRef.current) return;

		try {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				await audioRef.current.play();
				// Cache le bouton après la première interaction réussie
				setShowButton(false);
			}
			setIsPlaying(!isPlaying);
		} catch (error) {
			console.error("Erreur de lecture audio:", error);
			setShowButton(true);
		}
	};

	useEffect(() => {
		// Précharge le volume mais ne lance pas la lecture
		if (audioRef.current) {
			audioRef.current.volume = 0.25;
		}
	}, []);

	return (
		<>
			{showButton && (
				<button
					type="button"
					onClick={togglePlay}
					style={{
						position: "fixed",
						bottom: "20px",
						right: "20px",
						zIndex: 1000,
						padding: "10px 15px",
						backgroundColor: "#ff4757",
						color: "white",
						border: "none",
						borderRadius: "5px",
						cursor: "pointer",
					}}
				>
					{isPlaying ? "🔊 Son ON" : "🔇 Son OFF"}
				</button>
			)}

			<audio
				ref={audioRef}
				src="/audio/audiokool_gang_sample.mp4"
				loop
				preload="auto"
				muted={false}
			/>
		</>
	);
}

export default KoolGang;
