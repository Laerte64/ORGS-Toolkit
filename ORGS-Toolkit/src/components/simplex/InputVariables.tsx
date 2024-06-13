import { useState, useEffect } from 'react';
import NumberSelector from '../form/NumberSelector';
import SubmitButton from '../form/SubmitButton';

function InputVariables(): JSX.Element {
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


    function submit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (nVariable > 0 && nRestriction > 0) {
            localStorage.setItem('nVariable', nVariable.toString());
            localStorage.setItem('nRestriction', nRestriction.toString());
        }
    }

    return (
        <div>

            <form onSubmit={submit} className='flex flex-col items-center'>

                <div className='flex justify-center'>
                    <NumberSelector
                        label='Number of Variables'
                        numbers={Array.from({ length: 15 }, (_, index) => index + 1)}
                        onNumberSelect={(e) => setnVariable(e)}
                        disabled=''
                        defaultValue={nVariable}
                    />

                    <NumberSelector
                        label='Number of Restrictions'
                        numbers={Array.from({ length: 30 }, (_, index) => index + 1)}
                        onNumberSelect={(e) => setnRestriction(e)}
                        disabled=''
                        defaultValue={nRestriction}
                    />
                </div>

                <div>
                    <SubmitButton
                        text='Confirm'
                    />
                </div>

            </form>

        </div>
    )
}

export default InputVariables