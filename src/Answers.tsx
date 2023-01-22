import {useState} from "react";

export const Answers: React.FC<{ answers: number[]; correct: number, success: () => any }> = ({answers, correct, success}) => {

    const [errors, setErrors] = useState<HTMLButtonElement[]>([]);

    const addError = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.currentTarget.disabled = true
        event.currentTarget.className = "wrong";
        setErrors([...errors, event.currentTarget]);
    }

    const resetErrors = () => {
        errors.forEach(element => {
            element.disabled = false;
            element.className = "";
        })
        setErrors([]);
        success();
    }

    return (
        <div className="answers">
            {answers.map((number, index) => (
                <button
                    key={index}
                    onClick={(event) => {
                        if (number === correct) {
                            event.currentTarget.className = "correct";
                            event.currentTarget.blur();
                            resetErrors();
                        } else {
                            addError(event);
                        }
                    }}>
                    {number}
                </button>
            ))}
        </div>
    );
}