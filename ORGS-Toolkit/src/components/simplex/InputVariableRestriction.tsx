import { useEffect, useState } from 'react';
import NumberSelector from './form/NumberSelector';
import SubmitButton from './form/SubmitButton';

interface InputVariableRestrictionProps {
    handleVariableRestriction: (variable: number, restriction: number) => void;
}

function InputVariableRestriction({ handleVariableRestriction }: InputVariableRestrictionProps): JSX.Element {
    // Consult the browser's localStorage to see if a value has already been set.
    // useState with a function initializer is used here to set the initial state based on localStorage data.

    // useState hook to manage and initialize the state for 'nVariable'.
    // It checks localStorage for a previously saved value under the key 'nVariable'.
    const [nVariable, setnVariable] = useState<number>(() => {
        // Attempt to retrieve the value from localStorage.
        const saved = localStorage.getItem('nVariable');
        // If a value is found, parse it as an integer using base 10.
        // If not found, default to 1.
        return saved ? parseInt(saved, 10) : 1;
    });

    // useState hook to manage and initialize the state for 'nRestriction'.
    // it checks for a saved value in localStorage under the key 'nRestriction'.
    const [nRestriction, setnRestriction] = useState<number>(() => {
        // Attempt to retrieve the value from localStorage.
        const saved = localStorage.getItem('nRestriction');
        // If a value is found, parse it as an integer using base 10.
        // If not found, default to 1.
        return saved ? parseInt(saved, 10) : 1;
    });

    useEffect(() => {
        const savedNRestriction = localStorage.getItem('nRestriction');
        const savedNVariable = localStorage.getItem('nVariable');

        if(savedNRestriction && savedNVariable){
            onChange(savedNVariable ? parseInt(savedNVariable, 10) : 1, savedNRestriction ? parseInt(savedNRestriction, 10) : 1)
        }
    }, []); 

    function onChange(nVariable_: number, nRestriction_: number): void {
        if (nVariable_ > 0 && nRestriction_ > 0 && nVariable_ && nRestriction_) {
            // Return the values to the parent component
            handleVariableRestriction(nVariable_, nRestriction_)
        }
    }

    //function to onNumberSelect event of Variable 
    function onChangeNVariable(e: number): void {
        setnVariable(e)
        //set the items in loca storage
        localStorage.setItem('nVariable', e.toString());
        onChange(e, nRestriction)
    }

    //function to onNumberSelect event of Restrictions
    function onChangeNRestriction(e: number): void {
        setnRestriction(e)
        //set the items in loca storage
        localStorage.setItem('nRestriction', e.toString());
        onChange(nVariable, e)
    }

    return (

        <div className='flex flex-col items-center'>

            <div className='flex justify-center'>
                <NumberSelector
                    label='Number of Variables'
                    numbers={Array.from({ length: 25 }, (_, index) => index + 1)}
                    onNumberSelect={(e) => onChangeNVariable(e)}
                    disabled=''
                    defaultValue={nVariable}
                />

                <NumberSelector
                    label='Number of Restrictions'
                    numbers={Array.from({ length: 40 }, (_, index) => index + 1)}
                    onNumberSelect={(e) => onChangeNRestriction(e)}
                    disabled=''
                    defaultValue={nRestriction}
                />
            </div>

        </div>

    )
}

export default InputVariableRestriction