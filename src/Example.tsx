import {useState} from "react";
import {Answers} from "./Answers";
import {getRandomInt, getRandomIntExcept} from "./randomNumberUtil";

export const minValue = 1;
export const maxValue = 10;

function useCalculateExample() {
    const [a, setA] = useState(getRandomInt(minValue, maxValue));
    const [b, setB] = useState(getRandomInt(minValue, maxValue));
    const [addition, setAddition] = useState(Boolean(getRandomInt(0, 1)));

    const calculateExample = () => {
        const addition = Boolean(getRandomInt(0,1));
        const newA = getRandomIntExcept(addition ? minValue : minValue + 1, maxValue, [a]);
        const newB = getRandomIntExcept(minValue, addition ? maxValue : a - 1, [b]);
        setAddition(addition);
        setA(newA);
        setB(newB);
    }

    const minAnswer = addition ? 2 : 1
    const maxAnswer = addition ? maxValue * 2 : maxValue
    const correct = addition ? a + b : a - b;
    const answers: number[] = [];
    for (let i = 0; i < 5; i++) {
        answers.push(getRandomIntExcept(minAnswer, maxAnswer, [... answers, correct]))
    }
    answers.splice(getRandomInt(0, 5), 0, correct);

    return {a, b, addition, answers, correct, calculateExample};
}

export const Example: React.FC = () => {
    const {a, b, addition, answers, correct, calculateExample} = useCalculateExample();
    return (
        <main>
            <h1>{a} {addition ? '+' : '-'} {b} =</h1>
            <Answers correct={correct}
                     answers={answers}
                     success={() => calculateExample()}/>
        </main>
    );
}