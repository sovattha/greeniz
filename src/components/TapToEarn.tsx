import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

export default function TapToEarn() {
  const [energy, setEnergy] = useState(100);
  const [points, setPoints] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  // const [user, setUser] = useState<string | null>(null);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [isLeavesFalling, setIsLeavesFalling] = useState(false);

  const characterAnimation = useAnimation();

  useEffect(() => {
    // Votre code existant pour l'initialisation
  }, []);

  useEffect(() => {
    // Votre code existant pour la gestion de l'énergie
  }, [lastTapTime]);

  const handleTap = () => {
    if (energy > 0) {
      if (!isLeavesFalling) {
        setIsLeavesFalling(true);

        // Générer les feuilles avec variations aléatoires
        const newLeaves = Array.from({ length: 10 }).map(() => {
          const delay = Math.random() * 0.5;
          const duration = Math.random() * 1 + 1.5;
          const fadeInEnd = Math.random() * 0.1 + 0.05;
          const fadeOutStart = Math.random() * 0.1 + 0.85;

          return {
            id: Math.random(),
            x: Math.random() * 200 - 100,
            delay,
            duration,
            rotation: Math.random() * 360,
            size: Math.random() * 30 + 20,
            fadeInEnd,
            fadeOutStart,
          };
        });

        setLeaves(newLeaves);

        // Supprimer les feuilles après l'animation
        setTimeout(() => {
          setLeaves([]);
          setIsLeavesFalling(false);
        }, 3000);
      }

      const newPoints = points + 1;
      setEnergy(energy - 1);
      setPoints(newPoints);
      setLastTapTime(Date.now());

      // Déclencher l'animation de rebond
      characterAnimation.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 },
      });
    } else {
      alert('Votre énergie est vide ! Revenez plus tard.');
    }
  };

  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(background.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          textAlign: 'center',
          marginTop: -40,
          paddingTop: 40,
          overflow: 'hidden',
          position: 'relative',
          fontFamily: '"Press Start 2P", cursive',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Greeniz</h1>
        {/* Barre d'énergie */}
        <div
          style={{
            display: 'inline-block',
            width: '200px',
            height: '20px',
            backgroundColor: '#555',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: `${energy}%`,
              height: '100%',
              backgroundColor: '#0f0',
              transition: 'width 0.3s ease-in-out',
            }}
          ></div>
        </div>
        {/* Affichage des points */}
        <div
          style={{
            fontSize: '18px',
            marginBottom: '20px',
          }}
        >
          Points: {points}
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <motion.img
            style={{ maxWidth: '100vw', cursor: 'pointer', zIndex: 2 }}
            src="character.png"
            onClick={handleTap}
            animate={characterAnimation}
          />
          <AnimatePresence>
            {leaves.map((leaf) => (
              <motion.img
                key={leaf.id}
                src="leaf.png"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  x: leaf.x,
                  width: `${leaf.size}px`,
                  rotate: leaf.rotation,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{
                  y: 300,
                  opacity: [0, 1, 1, 0],
                  rotate: leaf.rotation + 360,
                  scale: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  y: { duration: leaf.duration, ease: 'easeInOut', delay: leaf.delay },
                  rotate: { duration: leaf.duration, ease: 'linear', delay: leaf.delay },
                  opacity: {
                    duration: leaf.duration,
                    ease: 'easeInOut',
                    delay: leaf.delay,
                    times: [0, leaf.fadeInEnd, leaf.fadeOutStart, 1],
                  },
                  scale: {
                    duration: leaf.duration * leaf.fadeInEnd,
                    ease: 'easeOut',
                    delay: leaf.delay,
                  },
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
