import React, { useState, useEffect } from 'react';
import InputVariableValue from './form/InputVariableValue';

interface InputVariablesProps {
    nVariable: number;
    hangleChange: (functionValues: number[]) => void;
}

function InputVariables({ nVariable, hangleChange }: InputVariablesProps): JSX.Element {
    const [valueVariables, setValueVariables] = useState<number[]>(Array(nVariable).fill(0));

   // console.log(valueVariables);

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
        <div className='flex flex-col items-center'>

            <div className='mb-4 text-2xl font-bold'>
                Function:
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: nVariable }, (_, index) => (
                    <InputVariableValue
                        key={index}
                        xVariable={index + 1}
                        label={`x${index + 1}`}
                        handleChange={ChangeVariables}
                    />
                ))}
            </div>
        </div>
    );
}

export default InputVariables;