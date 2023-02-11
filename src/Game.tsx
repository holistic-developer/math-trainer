import {useRef, useState} from "react";
import {Examples} from "./Examples";

export const Game: React.FC = () => {
    const main = useRef<HTMLElement>(null);
    const [started, setStarted] = useState<boolean>(false);
    const [rounds, setRounds] = useState<number>(10);

    return (
        <main ref={main}>
            {started ? (
                    <Examples rounds={rounds} done={() => document.exitFullscreen().then(() => setStarted(false))}/>
                ) :
                (
                    <>
                        <p>{rounds} Beispiele</p>
                        <span style={{display: "flex", gap: "1vw"}}>
                            <button onClick={() => setRounds(prev => prev + 1)}>+</button>
                            <button onClick={() => setRounds(prev => prev - 1)}
                            disabled={rounds <= 2}>−</button>
                        </span>
                        <button onClick={() => main.current?.requestFullscreen().then(() => setStarted(true))}>LOS!</button>
                    </>
                )}
        </main>
    );
};