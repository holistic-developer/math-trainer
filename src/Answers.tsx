import { useState } from 'react';

export const Answers: React.FC<{
  answers: number[];
  correct: number;
  success: () => any;
}> = ({ answers, correct, success }) => {
  const [errors, setErrors] = useState<HTMLButtonElement[]>([]);

  const addError = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.currentTarget.className = 'wrong';
    setErrors([...errors, event.currentTarget]);
  };

  const resetErrors = () => {
    errors.forEach((element) => {
      element.disabled = false;
      element.className = '';
    });
    setErrors([]);
    success();
  };

  return (
    <div className="answers">
      {answers.map((number, index) => (
        <button
          key={number + '+' + index}
          onClick={(event) => {
            const button = event.currentTarget;
            button.disabled = true;
            if (number === correct) {
              event.currentTarget.className = 'correct';
              setTimeout(() => {
                button.disabled = false;
                resetErrors();
              }, 600);
            } else {
              addError(event);
            }
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};
