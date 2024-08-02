import { useState } from "react";
import InputVariableValue from "./form/InputVariableValue";
import Variable from "../../model/simplex/variable";
import InputLimitVariableValue from "../simplex/form/InputLimitVariableValue";
import InputVariableName from "./form/InputVariableName";

interface InputVariablesProps {
  nVariable: number;
  hangleChange: (functionValues: number[]) => void;
  handleFunctionNameInput: (xVariable: number, value: string) => void;
  hangleChangeLimitValue: (value: number,xVariable: number,typeLimit: string) => void;
  functionValues: Variable[];
}

function InputVariables({
  nVariable,
  hangleChange,
  handleFunctionNameInput,
  hangleChangeLimitValue,
  functionValues,
}: InputVariablesProps): JSX.Element {
  const [valueVariables, setValueVariables] = useState<number[]>(
    Array(nVariable).fill(0)
  );

  function ChangeVariables(inputValue: number, xVariable: number): void {
    // Cria uma cópia do vetor atual
    const newValues = [...valueVariables];
    // Atualiza o valor na posição xVariable - 1 (ajuste para base zero)
    newValues[xVariable - 1] = inputValue;
    // Atualiza o estado com o novo vetor
    hangleChange(newValues);
    setValueVariables(newValues);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">Function names:</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-5">
        {Array.from({ length: nVariable }, (_, index) => (
          <InputVariableName
            key={index}
            xVariable={index + 1}
            handleChange={handleFunctionNameInput}
            value={functionValues[index].name}
          />
        ))}
      </div>

      <h1 className="mb-4 text-2xl font-bold">Function values:</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {Array.from({ length: nVariable }, (_, index) => (
          <InputVariableValue
            key={index}
            xVariable={index + 1}
            value={functionValues[index].value}
            label={`x${index + 1}`}
            handleChange={ChangeVariables}
          />
        ))}
      </div>

      <div className="mt-10">
        
        <h1 className="mb-4 text-2xl font-bold">Limit of function:</h1>

        <h1 className="text-xl my-2">Upper:</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: nVariable }, (_, index) => (
            <InputLimitVariableValue
              typeLimit="upper"
              value={functionValues[index].upper}
              key={index}
              xVariable={index + 1}
              label={`x${index + 1}`}
              handleChange={hangleChangeLimitValue}
            />
          ))}
        </div>

        <h1 className="text-xl my-2 ">Lower:</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: nVariable }, (_, index) => (
            <InputLimitVariableValue
              key={index}
              typeLimit="lower"
              value={functionValues[index].lower}
              xVariable={index + 1}
              label={`x${index + 1}`}
              handleChange={hangleChangeLimitValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InputVariables;
