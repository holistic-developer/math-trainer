import {useCallback, useReducer, useState} from "react";
import {Answers} from "./Answers";
import {getRandomInt, getRandomIntExcept} from "./randomNumberUtil";

export const minValue = 1;
export const maxValue = 10;

type ExampleState = {
    a: number;
    b: number;
    addition: boolean;
    options: number[];
    answer: number;
}

export const Examples: React.FC<{ rounds: number, done: () => void }> = ({rounds, done}) => {

    const calculateExample = useCallback((state: ExampleState) => {
        state.addition = Boolean(getRandomInt(0, 1));
        state.a = getRandomIntExcept(state.addition ? minValue : minValue + 1, maxValue, [state.a]);
        state.b = getRandomIntExcept(minValue, state.addition ? maxValue : state.a - 1, [state.b]);

        const minAnswer = state.addition ? 2 : 1
        const maxAnswer = state.addition ? maxValue * 2 : maxValue
        const correct = state.addition ? state.a + state.b : state.a - state.b;
        const answers: number[] = [];
        for (let i = 0; i < 5; i++) {
            answers.push(getRandomIntExcept(minAnswer, maxAnswer, [...answers, correct]))
        }
        answers.splice(getRandomInt(0, 5), 0, correct);
        state.options = answers;
        state.answer = correct;
        return {...state};
    }, [rounds]);

    const [{a, b, addition, options, answer}, dispatch] = useReducer(calculateExample, {
        a: 1,
        b: 2,
        addition: true,
        options: [],
        answer: 0,
    }, arg => calculateExample(arg));
    const [completed, setCompleted] = useState<number>(0);

    return (
        <>
            <h1>{a} {addition ? '+' : '-'} {b} =</h1>
            <Answers correct={answer}
                     answers={options}
                     success={() => {
                         if(completed + 1 >= rounds) {
                             done();
                         }
                         setCompleted(completed => completed+1)
                         dispatch();
                     }}/>
            <div className="progress">
                <div className="progress-bar" style={{width:`${completed/rounds*100}%`}}> </div>
            </div>
        </>
    );
}