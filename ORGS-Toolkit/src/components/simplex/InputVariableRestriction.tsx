import React, { useEffect, useState } from 'react';
import NumberSelector from './form/NumberSelector';

interface InputVariableRestrictionProps {
    handleVariableRestriction: (variable: number, restriction: number) => void;
    initialVariable: number;
    initialRestriction: number;
}

function InputVariableRestriction({ handleVariableRestriction, initialVariable, initialRestriction }: InputVariableRestrictionProps): JSX.Element {
    const [nVariable, setnVariable] = useState<number>(initialVariable);
    const [nRestriction, setnRestriction] = useState<number>(initialRestriction);

    // Este useEffect sincroniza o estado interno com as props sempre que elas mudam
    useEffect(() => {
        setnVariable(initialVariable);
        setnRestriction(initialRestriction);
    }, [initialVariable, initialRestriction]); // Dependências para atualizar os estados

    useEffect(() => {
        if (nVariable > 0 && nRestriction > 0) {
            handleVariableRestriction(nVariable, nRestriction);
        }
    }, [nVariable, nRestriction]); // Chamada ao método pai quando o estado muda

    function onChangeNVariable(value: number): void {
        setnVariable(value);
        localStorage.setItem('nVariable', value.toString());
    }

    function onChangeNRestriction(value: number): void {
        setnRestriction(value);
        localStorage.setItem('nRestriction', value.toString());
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center'>
                <NumberSelector
                    label='Number of Variables'
                    numbers={Array.from({ length: 25 }, (_, index) => index + 1)}
                    onNumberSelect={onChangeNVariable}
                    disabled=''
                    value={nVariable}
                />

                <NumberSelector
                    label='Number of Restrictions'
                    numbers={Array.from({ length: 40 }, (_, index) => index + 1)}
                    onNumberSelect={onChangeNRestriction}
                    disabled=''
                    value={nRestriction}
                />
            </div>
        </div>
    );
}

export default InputVariableRestriction;