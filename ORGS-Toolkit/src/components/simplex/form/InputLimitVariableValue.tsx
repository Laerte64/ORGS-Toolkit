import { useState } from "react";

interface InputLimitVariableValueProps {
  xVariable: number;
  typeLimit: string;
  label: string;
  value: number;
  handleChange: (value: number, xVariable: number, typeLimit: string) => void;
}

function InputLimitVariableValue({ xVariable, typeLimit, label, value, handleChange }: InputLimitVariableValueProps): JSX.Element {
  
  // Função interna para lidar com a mudança de valor do input
  const [valueInput, setValueInput] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const [isInfinite, setIsInfinite] = useState<boolean>(() => {
    return value === Infinity;
  });
 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValueInput(inputValue);

    let numericValue: number;

    if (inputValue === "") {
      numericValue = 0;
      setIsInvalid(false);
    } else if (inputValue === "-" || inputValue === "0-") {
      numericValue = -0; // Isso é apenas para permitir a digitação de "-"
      setIsInvalid(true); // Define como inválido para borda vermelha
    } else if (
      !isNaN(parseFloat(inputValue)) &&
      (inputValue.match(/-/g) || []).length <= 1
    ) {
      numericValue = parseFloat(inputValue);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      return;
    }

    handleChange(numericValue, xVariable, typeLimit);
  };

  const toggleInfinite = () => {
    if (isInfinite) {
      setIsInfinite(false);
      setValueInput("∞"); // Restaurar o valor anterior do input
    } else {
      setIsInfinite(true);
      handleChange(Infinity, xVariable, typeLimit);
    }
  };

  return (
    <div className="flex items-center">
      <input
        className={`border-2 rounded-md text-center w-24 ${
          isInvalid ? "border-red-500" : "border-black"
        }`}
        name={"x" + xVariable}
        type="text"
        value={isInfinite ? "∞" : valueInput}
        onChange={handleInputChange}
        disabled={isInfinite}
      />
      <div className="px-1">{label}</div>
      {typeLimit === "upper" && (
        <button
          className=" py-1 px-2 bg-black text-white rounded"
          onClick={toggleInfinite}
        >
          {isInfinite ? "∞" : "∞"}
        </button>
      )}
    </div>
  );
}

export default InputLimitVariableValue;