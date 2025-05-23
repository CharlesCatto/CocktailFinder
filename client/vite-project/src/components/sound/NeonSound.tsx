import React, { useEffect, useRef, useState } from "react";

function NeonSound() {
  const neon1Ref = useRef(null);
  const neon2Ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Démarre la séquence sonore au chargement du composant
    if (!playing) {
      setPlaying(true);
      // Joue neon1 une fois
      neon1Ref.current.play();

      // Quand neon1 finit, lance neon2 en boucle
      neon1Ref.current.onended = () => {
        neon2Ref.current.play();
      };
    }

    // régler volume une seule fois
    if (neon1Ref.current) neon1Ref.current.volume = 0.4;
    if (neon2Ref.current) neon2Ref.current.volume = 0.2;

  }, [playing]);

  return (
    <div>
      {/* Son au chargement, joue une seule fois */}
      <video
        ref={neon1Ref}
        src="/src/assets/sound/neon1.mp4"
        preload="auto"
        style={{ display: "none" }}
      />

      {/* Son en boucle */}
      <video
        ref={neon2Ref}
        src="/src/assets/sound/neon2.mp4"
        loop
        preload="auto"
        style={{ display: "none" }}
      />
    </div>
  );
}

export default NeonSound;
