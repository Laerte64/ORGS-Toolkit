import { useState } from "react";

interface InputConstraintLimitProps {
  xRestriction: number;
  value: number;
  handleChange: (xRestriction: number, input: number) => void;
}

function InputConstraintLimit({
  xRestriction,
  value,
  handleChange,
}: InputConstraintLimitProps): JSX.Element {
  const [valueInput, setValueInput] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueInput(inputValue);

    let numericValue: number;

    if (inputValue === '') {
      numericValue = 0;
      setIsInvalid(true);
    } else if (inputValue === '-') {
      numericValue = -0; // Isso é apenas para permitir a digitação de "-"
      setIsInvalid(true); // Define como inválido para borda vermelha
    } else if (!isNaN(parseFloat(inputValue))) {
      numericValue = parseFloat(inputValue);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      return;
    }

    handleChange(xRestriction, numericValue);
  };

  return (
    <div className="pl-3">
      <input
        className={`border-2 rounded-md text-center w-24 ${isInvalid ? 'border-red-500' : 'border-black'}`}
        name={"Limit" + xRestriction}
        type="number" 
        value={valueInput}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputConstraintLimit;
