import { useRef, useState } from 'react';
import { Examples } from './Examples';

export const Game: React.FC = () => {
  const main = useRef<HTMLElement>(null);
  const [started, setStarted] = useState<boolean>(false);
  const [rounds, setRounds] = useState<number>(10);
  const [doubling, setDoubling] = useState<boolean>(false);

  return (
    <main ref={main}>
      {started ? (
        <Examples rounds={rounds} onlyDoubling={doubling} done={() => document.exitFullscreen().then(() => setStarted(false))} />
      ) : (
        <>
          <p>{rounds} Beispiele</p>
          <span style={{ display: 'flex', gap: '1vw' }}>
            <button onClick={() => setRounds((prev) => prev + 1)}>+</button>
            <button onClick={() => setRounds((prev) => prev - 1)} disabled={rounds <= 2}>
              −
            </button>
          </span>
          <button className={'small'} onClick={() => setDoubling((prevState) => !prevState)}>
            Nur Verdoppelungen: {doubling ? 'ein' : 'aus'}
          </button>
          <button onClick={() => main.current?.requestFullscreen().then(() => setStarted(true))}>LOS!</button>
        </>
      )}
    </main>
  );
};
