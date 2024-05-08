import { useCallback, useReducer, useState } from 'react';
import { Answers } from './Answers';
import { getRandomInt, getRandomIntExcept } from './randomNumberUtil';
import { GameMode } from './Game';

export const minValue = 1;

type ExampleState = {
  a: number;
  b: number;
  operation: "+" | "-" | "×";
  options: number[];
  answer: number;
};

export const Examples: React.FC<{ rounds: number; gameMode: GameMode; done: () => void }> = ({ rounds, gameMode, done }) => {
  const calculateExample = useCallback(
    (state: ExampleState) => {
      let maxValue = 0;
      switch (gameMode) {
        case GameMode.ADDITION_10: 
        case GameMode.ADDITION_20:
        case GameMode.ADDITION_100:
          state.operation = '+';
          break;
        case GameMode.SUBTRACTION_10:
        case GameMode.SUBTRACTION_20:
        case GameMode.SUBTRACTION_100:
          state.operation = '-';
          break;
        case GameMode.MULTIPLICATION_100:
          state.operation = '×';
          break;
        default:
          state.operation = Boolean(getRandomInt(0, 1))? '+' : '-';
      }
      switch (gameMode) {
        case GameMode.ADDITION_10:
        case GameMode.SUBTRACTION_10:
        case GameMode.ADDITION_SUBTRACTION_10:
          maxValue = 10;
          break;
        case GameMode.ADDITION_20:
        case GameMode.SUBTRACTION_20:
        case GameMode.ADDITION_SUBTRACTION_20:
          maxValue = 20;
          break;
        default:
          maxValue = 100;
      }

      if(state.operation !== '+' && state.operation !== '-') {
        state.a = getRandomIntExcept(1, 10, [state.a]);
        state.b = getRandomIntExcept(1, 10, [state.b]);
      } else {
        state.a = getRandomIntExcept(state.operation === '+' ? minValue : Math.floor(maxValue / 2), state.operation === '+' ? maxValue - 1 : maxValue, [state.a]);
        state.b = getRandomIntExcept(minValue, state.operation === '+' ? maxValue - state.a : state.a - 1, [state.b]);
      }
      
      const minAnswer = state.operation === '+' ? 2 : 1;
      const maxAnswer = state.operation === '-' ? maxValue - 1 : maxValue;
      const correct = state.operation === '+' ? state.a + state.b : state.operation === '-' ? state.a - state.b : state.a * state.b;
      const answers: number[] = [];
      for (let i = 0; i < 5; i++) {
        answers.push(getRandomIntExcept(minAnswer, maxAnswer, [...answers, correct]));
      }
      answers.splice(getRandomInt(0, 5), 0, correct);
      state.options = answers;
      state.answer = correct;
      return { ...state };
    },
    [rounds, gameMode]
  );

  const [{ a, b, operation, options, answer }, dispatch] = useReducer(
    calculateExample,
    {
      a: 1,
      b: 2,
      operation: "+",
      options: [],
      answer: 0,
    } as ExampleState,
    (arg) => calculateExample(arg)
  );
  const [completed, setCompleted] = useState<number>(0);

  const solved = () => {
    setCompleted((completed) => completed + 1);
    if (completed + 1 >= rounds) {
      setTimeout(done, 500);
    } else {
      dispatch();
    }
  };

  return (
    <>
      <h1>
        {a} {operation} {b} =
      </h1>
      <Answers correct={answer} answers={options} success={solved} />
      <div className="progress">
        <div className="progress-bar" style={{ width: `${(completed / rounds) * 100}%` }}></div>
      </div>
    </>
  );
};
