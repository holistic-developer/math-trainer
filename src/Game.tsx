import { useRef, useState } from 'react';
import { Examples } from './Examples';

export const enum GameMode {
  DONE,
  ADDITION,
  SUBTRACTION,
  ADDITION_SUBTRACTION,
}

export const Game: React.FC = () => {
  const main = useRef<HTMLElement>(null);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DONE);
  const [rounds, setRounds] = useState<number>(10);
  const [maxValue, setMaxValue] = useState<number>(20);

  return (
    <main ref={main}>
      {gameMode ? (
        <Examples rounds={rounds} gameMode={gameMode} maxValue={maxValue} done={() => document.exitFullscreen().finally(() => setGameMode(GameMode.DONE))} />
      ) : (
        <>
          <p>
            {rounds} Beispiele
            <span style={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
              <button onClick={() => setRounds((prev) => prev + 1)}>+</button>
              <button onClick={() => setRounds((prev) => prev - 1)} disabled={rounds <= 2}>
                −
              </button>
            </span>
          </p>
          <p>
            [1 ... {maxValue}]
            <span style={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
              <button onClick={() => setMaxValue((prev) => prev + 1)}>+</button>
              <button onClick={() => setMaxValue((prev) => prev - 1)} disabled={maxValue <= 10}>
                −
              </button>
            </span>
          </p>
          <span style={{ display: 'flex', gap: '2vw', flexDirection: 'column' }}>
            <button className={'small-font'} onClick={() => main.current?.requestFullscreen().then(() => setGameMode(GameMode.ADDITION))}>
              Nur Addition
            </button>
            <button className={'small-font'} onClick={() => main.current?.requestFullscreen().then(() => setGameMode(GameMode.SUBTRACTION))}>
              Nur Subtraktion
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
