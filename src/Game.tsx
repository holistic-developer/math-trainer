import { useRef, useCallback, useState } from 'react';
import { Examples } from './Examples';

export const enum GameMode {
  DONE,
  ADDITION_10,
  ADDITION_20,
  ADDITION_100,
  SUBTRACTION_10,
  SUBTRACTION_20,
  SUBTRACTION_100,
  ADDITION_SUBTRACTION_10,
  ADDITION_SUBTRACTION_20,
  ADDITION_SUBTRACTION_100,
  MULTIPLICATION_100,
}

export const Game: React.FC = () => {
  const main = useRef<HTMLElement>(null);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DONE);
  const [rounds, setRounds] = useState<number>(10);

  const startGame = useCallback((mode: GameMode) => () => main.current?.requestFullscreen().then(() => setGameMode(mode)), []);

  return (
    <main ref={main}>
      {gameMode ? (
        <Examples rounds={rounds} gameMode={gameMode} done={() => document.exitFullscreen().finally(() => setGameMode(GameMode.DONE))} />
      ) : (
        <>
          <section>
            {rounds} Beispiele
            <span style={{ display: 'flex', gap: '1vw', justifyContent: 'center' }}>
              <button onClick={() => setRounds((prev) => prev + 1)}>+</button>
              <button onClick={() => setRounds((prev) => prev - 1)} disabled={rounds <= 2}>-</button>
            </span>
          </section>
          <section className="game-modes">
            <button onClick={startGame(GameMode.ADDITION_10)}>+ bis 10</button>
            <button onClick={startGame(GameMode.ADDITION_20)}>+ bis 20</button>
            <button onClick={startGame(GameMode.ADDITION_100)}>+ bis 100</button>
            <button onClick={startGame(GameMode.SUBTRACTION_10)}>- bis 10</button>
            <button onClick={startGame(GameMode.SUBTRACTION_20)}>- bis 20</button>
            <button onClick={startGame(GameMode.SUBTRACTION_100)}>- bis 100</button>
            <button onClick={startGame(GameMode.ADDITION_SUBTRACTION_10)}>+&nbsp;/&nbsp;- bis&nbsp;10</button>
            <button onClick={startGame(GameMode.ADDITION_SUBTRACTION_20)}>+&nbsp;/&nbsp;- bis&nbsp;20</button>
            <button onClick={startGame(GameMode.ADDITION_SUBTRACTION_100)}>+&nbsp;/&nbsp;- bis&nbsp;100</button>
            <button style={{gridColumn: "span 3"}} onClick={startGame(GameMode.MULTIPLICATION_100)}>1×1 bis 100</button>
          </section>
        </>
      )}
    </main>
  );
};
