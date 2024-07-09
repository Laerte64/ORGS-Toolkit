import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import InputVariableRestriction from '../simplex/InputVariableRestriction';
import VariableRestrictionForm from '../simplex/VariableRestrictionForm';

import { PurposeFuncOps } from './../../types/enum/PurposeFuncOps'

function Simplex(): JSX.Element {
    const { t } = useTranslation("simplex");

    const [nVariable, setnVariable] = useState<number>(() => {
        // Attempt to retrieve the value from localStorage.
        const saved = localStorage.getItem('nVariable');
        // If a value is found, parse it as an integer using base 10.
        // If not found, default to 1.
        return saved ? parseInt(saved, 10) : 1;
    });

    const [nRestriction, setnRestriction] = useState<number>(() => {
        // Attempt to retrieve the value from localStorage.
        const saved = localStorage.getItem('nRestriction');
        // If a value is found, parse it as an integer using base 10.
        // If not found, default to 1.
        return saved ? parseInt(saved, 10) : 1;
    });

    const [functionValues, setFunctionValues] = useState<number[]>([]);

    const [purposeFuncOps, setPurposeFuncOps] = useState<PurposeFuncOps>(PurposeFuncOps.Maximize);

    console.log(purposeFuncOps);

    const navigate = useNavigate();

    function setVariableRestriction(variable: number, restriction: number): void {
        if (variable !== nVariable || restriction !== nRestriction) {
            setnVariable(variable);
            setnRestriction(restriction);

            navigate(`/simplex/inputmatrix`);
        }
    }

    function setFunctionValuesInput(functionValues: number[]): void {
        if(functionValues){
            setFunctionValues(functionValues);
            console.log(functionValues);
        }
    }

    function setPurposeFuncOpsInput(purposeFunc: PurposeFuncOps): void {
        setPurposeFuncOps(purposeFunc);
    }

    function addRestriction(){
        if(nRestriction){
            const nRestriction_ = nRestriction + 1

            localStorage.setItem('nRestriction', nRestriction_.toString());

            setnRestriction(nRestriction + 1);
        }
    }

    return (
        <div className='text-center w-full'>

            <InputVariableRestriction
                handleVariableRestriction={setVariableRestriction}
                initialVariable={nVariable}
                initialRestriction={nRestriction}
            />

            {nVariable && nRestriction && (
                <VariableRestrictionForm 
                    nVariable={nVariable}
                    nRestriction={nRestriction}
                    setFunctionValues={setFunctionValuesInput}
                    setPurposeFuncOpsInput={setPurposeFuncOpsInput}
                    handleAddRestriction={addRestriction}
                />
            )}

            <div>
                {nVariable}-{nRestriction}-{functionValues}-{purposeFuncOps}
            </div>

        </div>
    );
}

export default Simplex;