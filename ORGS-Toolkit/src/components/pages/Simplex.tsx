import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputVariableRestriction from '../simplex/InputVariableRestriction';
import VariableRestrictionForm from '../simplex/VariableRestrictionForm';

import { PurposeFuncOps } from './../../types/enum/PurposeFuncOps'

function Simplex(): JSX.Element {
    const [nVariable, setnVariable] = useState<number | null>(null);
    const [nRestriction, setnRestriction] = useState<number | null>(null);
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

    return (
        <div className='text-center w-full'>

            <InputVariableRestriction
                handleVariableRestriction={setVariableRestriction}
            />

            {nVariable && nRestriction && (
                <VariableRestrictionForm 
                    nVariable={nVariable}
                    nRestriction={nRestriction}
                    setFunctionValues={setFunctionValuesInput}
                    setPurposeFuncOpsInput={setPurposeFuncOpsInput}
                />
            )}

            <div>
                {nVariable}-{nRestriction}-{functionValues}-{purposeFuncOps}
            </div>

        </div>
    );
}

export default Simplex;