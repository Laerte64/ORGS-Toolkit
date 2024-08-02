import { useState } from "react";

interface InputRestrictionValueProps {
  xRestriction: number;
  xVariable: number;
  label: string;
  value: number;
  handleChange: (
    xVariable: number,
    xRestriction: number,
    value: number
  ) => void;
}

function InputRestrictionValue({
  xRestriction,
  xVariable,
  label,
  value,
  handleChange
}: InputRestrictionValueProps): JSX.Element {
  // Função interna para lidar com a mudança de valor do input
  const [valueInput, setValueInput] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValueInput(inputValue);

    // Permitir "-" após "0"
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

    handleChange(xVariable, xRestriction, numericValue);
  };

  return (
    <div className="flex">
      <input
        className={`border-2 rounded-md text-center w-24 h-7 ${isInvalid ? 'border-red-500' : 'border-black'}`}
        name={"x" + xVariable}
        type="number" // Mudança para "text" para permitir "-"
        value={valueInput}
        onChange={handleInputChange}
      />
      <div className="pr-3 pl-1">{label}</div>
    </div>
  );
}

export default InputRestrictionValue;
