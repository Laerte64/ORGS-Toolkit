import React from 'react';

interface InputRestrictionValueProps {
    xRestriction: number;
    xVariable: number;
    label: string;
    handleChange: (inputValue: number, xVariable: number, xRestriction: number) => void;
}

function InputRestrictionValue({ xRestriction, xVariable, label, handleChange }: InputRestrictionValueProps): JSX.Element {
    // Função interna para lidar com a mudança de valor do input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(parseFloat(event.target.value), xVariable, xRestriction);
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

export default InputRestrictionValue;