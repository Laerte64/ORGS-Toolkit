import React, { useState } from "react";

interface InputVariableValueProps {
  xVariable: number;
  label: string;
  value: number;
  handleChange: (inputValue: number, xVariable: number) => void;
}

function InputVariableValue({
  xVariable,
  label,
  value,
  handleChange
}: InputVariableValueProps): JSX.Element {
  // Função interna para lidar com a mudança de valor do input
  const [valueInput, setValueInput] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueInput(inputValue);

    let numericValue: number;

    if (inputValue === '') {
      numericValue = 0;
      setIsInvalid(false);
    } else if (inputValue === '-' || inputValue === '0-') {
      numericValue = -0; // Isso é apenas para permitir a digitação de "-"
      setIsInvalid(true); // Define como inválido para borda vermelha
    } else if (!isNaN(parseFloat(inputValue)) && (inputValue.match(/-/g) || []).length <= 1) {
      numericValue = parseFloat(inputValue);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      return;
    }

    handleChange(numericValue, xVariable);
  };

  return (
    <div className="flex">
      <input
        className={`border-2 rounded-md text-center w-24 ${isInvalid ? 'border-red-500' : 'border-black'}`}
        name={"x" + xVariable}
        type="number"
        value={valueInput}
        onChange={handleInputChange}
      />

      <div className="pr-4 pl-1">{label}</div>
    </div>
  );
}

export default InputVariableValue;
