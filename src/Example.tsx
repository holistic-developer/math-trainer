import {useReducer} from "react";
import {Answers} from "./Answers";
import {getRandomInt, getRandomIntExcept} from "./randomNumberUtil";

export const minValue = 1;
export const maxValue = 10;

type ExampleState = {
    a: number;
    b: number;
    addition: boolean;
    answers: number[];
    correct: number;
}

function calculateExample(state: ExampleState) {
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
    state.answers = answers;
    state.correct = correct;
    return {...state};
}

export const Example: React.FC = () => {
    const [{a, b, addition, answers, correct}, dispatch] = useReducer(calculateExample, {
        a: 1,
        b: 2,
        addition: true,
        answers: [],
        correct: 3
    }, arg => calculateExample(arg));
    return (
        <main>
            <h1>{a} {addition ? '+' : '-'} {b} =</h1>
            <Answers correct={correct}
                     answers={answers}
                     success={dispatch}/>
        </main>
    );
}