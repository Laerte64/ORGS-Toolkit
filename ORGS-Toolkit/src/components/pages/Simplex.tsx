import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputVariableRestriction from '../simplex/InputVariableRestriction';
import VariableRestrictionForm from '../simplex/VariableRestrictionForm';

function Simplex(): JSX.Element {
    const [nVariable, setnVariable] = useState<number | null>(null);
    const [nRestriction, setnRestriction] = useState<number | null>(null);

    const navigate = useNavigate();

    function setVariableRestriction(variable: number, restriction: number): void {
        if (variable !== nVariable || restriction !== nRestriction) {
            setnVariable(variable)
            setnRestriction(restriction);

            navigate(`/simplex/inputmatrix`);
        }
    }

    return (
        <div className='text-center w-full'>

            <InputVariableRestriction
                handleVariableRestriction={setVariableRestriction}
            />

            {nVariable !== null && nRestriction !== null && (
                <VariableRestrictionForm 
                    nVariable={nVariable}
                    nRestriction={nRestriction}
                />
            )}

        </div>
    );
}

export default Simplex;