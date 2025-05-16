import { useEffect, useRef } from "react";

function KoolGang() {
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.volume = 0.25;
			audio.play().catch((e) => {
				console.warn("Lecture bloquée par le navigateur", e);
			});
		}
	}, []);

	return (
		<audio
			ref={audioRef}
			src="/audio/audiokool_gang_sample.mp4"
			loop
			preload="auto"
		/>
	);
}

export default KoolGang;
