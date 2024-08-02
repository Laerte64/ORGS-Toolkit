import { useState } from "react";

interface InputVariableName {
  xVariable: number;
  value: string;
  handleChange: (xVariable: number, value: string) => void;
}

function InputVariableName({
  xVariable,
  value,
  handleChange,
}: InputVariableName) {
  // Função interna para lidar com a mudança de valor do input
  const [valueInput, setValueInput] = useState<string>(value.toString());
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    setValueInput(inputValue);
    if (inputValue === "" || inputValue.trim().length === 0) {
      handleChange(xVariable, "");
      setValueInput("")
      setIsInvalid(true);
      return
    } else {
      setIsInvalid(false);
      handleChange(xVariable, inputValue);
    }
  };

  return (
    <div className="flex px-2">
      <input
        className={`border-2 rounded-md text-center w-24 h-7 ${
          isInvalid ? "border-red-500" : "border-black"
        }`}
        name={"x" + xVariable}
        type="text" // Mudança para "text" para permitir "-"
        value={valueInput}
        onChange={handleInputChange}
      />
     
    </div>
  );
}

export default InputVariableName;