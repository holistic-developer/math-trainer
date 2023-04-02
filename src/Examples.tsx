import { useCallback, useReducer, useState } from 'react';
import { Answers } from './Answers';
import { getRandomInt, getRandomIntExcept } from './randomNumberUtil';
import { GameMode } from './Game';

export const minValue = 1;

type ExampleState = {
  a: number;
  b: number;
  addition: boolean;
  options: number[];
  answer: number;
};

export const Examples: React.FC<{ rounds: number; gameMode: GameMode; maxValue: number; done: () => void }> = ({ rounds, gameMode, maxValue, done }) => {
  const calculateExample = useCallback(
    (state: ExampleState) => {
      switch (gameMode) {
        case GameMode.ADDITION:
          state.addition = true;
          break;
        case GameMode.SUBTRACTION:
          state.addition = false;
          break;
        default:
          state.addition = Boolean(getRandomInt(0, 1));
      }
      state.a = getRandomIntExcept(state.addition ? minValue : Math.floor(maxValue / 2), state.addition ? maxValue - 1 : maxValue, [state.a]);
      state.b = getRandomIntExcept(minValue, state.addition ? maxValue - state.a : state.a - 1, [state.b]);

      const minAnswer = state.addition ? 2 : 1;
      const maxAnswer = state.addition ? maxValue : maxValue - 1;
      const correct = state.addition ? state.a + state.b : state.a - state.b;
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

  const [{ a, b, addition, options, answer }, dispatch] = useReducer(
    calculateExample,
    {
      a: 1,
      b: 2,
      addition: true,
      options: [],
      answer: 0,
    },
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
        {a} {addition ? '+' : '-'} {b} =
      </h1>
      <Answers correct={answer} answers={options} success={solved} />
      <div className="progress">
        <div className="progress-bar" style={{ width: `${(completed / rounds) * 100}%` }}></div>
      </div>
    </>
  );
};
