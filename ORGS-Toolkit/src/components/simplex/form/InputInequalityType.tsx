import { useState } from 'react';
import { ConstraintType } from '../../../types/enum/InequalityTypeOps'

interface InputInequalityTypeProps {
    onInequalitySelect: (inequality: string, xRestriction: number) => void;
    xRestriction: number;
}

function InputInequalityType({ onInequalitySelect, xRestriction }: InputInequalityTypeProps): JSX.Element {
    // Adicionando estado local para gerenciar o valor selecionado
    const [selectedInequality, setSelectedInequality] = useState<string>(ConstraintType.LessThanOrEqual);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        console.log("Antes da Mudança: ", selectedInequality);
        setSelectedInequality(newValue);
        console.log("Depois da Mudança: ", newValue);
        onInequalitySelect(newValue, xRestriction);
    };

    return (
        <div>
            <select
                value={selectedInequality}  // Usar o estado local como o valor do select
                onChange={handleChange}
                className='border border-black p-1 rounded-md w-10 text-black bg-white'
               >
                <option key={ConstraintType.LessThanOrEqual} value={ConstraintType.LessThanOrEqual} className='text-black bg-'>
                    ≤
                </option>
                <option key={ConstraintType.GreaterThanOrEqual} value={ConstraintType.GreaterThanOrEqual} className='text-black'>
                    ≥
                </option>
                <option key={ConstraintType.Equal} value={ConstraintType.Equal} className='text-black'>
                    =
                </option>
            </select>
        </div>
    );
}

export default InputInequalityType;