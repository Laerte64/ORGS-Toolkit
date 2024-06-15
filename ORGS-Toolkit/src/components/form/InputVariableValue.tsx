import React from 'react';

interface InputVariableValueProps {
    xVariable: number;
    label: string;
    handleChange: (inputValue: number, xVariable: number) => void;
}

function InputVariableValue({ xVariable, label, handleChange }: InputVariableValueProps): JSX.Element {

    // Função interna para lidar com a mudança de valor do input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Converte o valor do input para número e chama a função handleChange passando o valor e o xVariable

        handleChange(parseFloat(event.target.value), xVariable);
    };

    return (
        <div className="flex">

            <input
                className='border-2 border-black rounded-md text-center w-24'
                name={"x" + xVariable}
                type="number"
                onChange={handleInputChange}
            />

            <div className='pr-4 pl-1'>
                {label}
            </div>
        </div>
    );
}

export default InputVariableValue;
