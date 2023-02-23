import { useRef, useState } from 'react';
import { Examples } from './Examples';

export const enum GameMode {
  DONE,
  ADDITION_SUBTRACTION,
  DOUBLING,
}

export const Game: React.FC = () => {
  const main = useRef<HTMLElement>(null);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DONE);
  const [rounds, setRounds] = useState<number>(10);

  return (
    <main ref={main}>
      {gameMode ? (
        <Examples rounds={rounds} gameMode={gameMode} done={() => document.exitFullscreen().then(() => setGameMode(GameMode.DONE))} />
      ) : (
        <>
          <p>{rounds} Beispiele</p>
          <span style={{ display: 'flex', gap: '1vw' }}>
            <button onClick={() => setRounds((prev) => prev + 1)}>+</button>
            <button onClick={() => setRounds((prev) => prev - 1)} disabled={rounds <= 2}>
              −
            </button>
          </span>
          <span style={{ display: 'flex', gap: '1vw', flexDirection: 'column' }}>
            <button className={'small-font'} onClick={() => main.current?.requestFullscreen().then(() => setGameMode(GameMode.DOUBLING))}>
              Nur Verdoppelungen
            </button>
            <button className={'small-font'} onClick={() => main.current?.requestFullscreen().then(() => setGameMode(GameMode.ADDITION_SUBTRACTION))}>
              Addition und Subtraktion
            </button>
          </span>
        </>
      )}
    </main>
  );
};
