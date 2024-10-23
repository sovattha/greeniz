import { useState, useEffect } from 'react';

export default function TapToEarn() {
  const [energy, setEnergy] = useState(100);
  const [points, setPoints] = useState(0);
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // const tg = (window as unknown as { Telegram: { WebApp: { initDataUnsafe: { user: string } } }}).Telegram.WebApp;
    // const userData = tg.initDataUnsafe.user;
    //
    // if (userData) {
    //   setUser(userData);
    //
    //   // TODO Charger l'état initial depuis le backend
    //
    // }
  }, []);

  useEffect(() => {
    // Vérifier si 4 heures se sont écoulées pour recharger l'énergie
    if (lastTapTime) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - lastTapTime;
        if (elapsed >= 4 * 60 * 60 * 1000) {
          setEnergy(100);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastTapTime]);

  const handleTap = () => {
    if (energy > 0) {
      const newPoints = points + 1; // Ajustez les points gagnés ici
      setEnergy(energy - 1);
      setPoints(newPoints);
      setLastTapTime(Date.now());

      // TODO Sauvegarder l'état actuel dans le backend

    } else {
      alert('Votre énergie est vide ! Revenez plus tard.');
    }
  };

  // if (!user) {
  //   return <p>Chargement...</p>;
  // }

  return (
      <div style={{
        width: '100vw',
        textAlign: 'center',
      }}>
        <h1>Greeniz</h1>
        <p>Bonjour {user}!</p>
        <p>Énergie : {energy}%</p>
        <p>Points : {points}</p>
        <button onClick={handleTap} disabled={energy === 0}>
          Taper sur le personnage
        </button>
      </div>
  );
}
