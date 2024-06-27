import { useState } from "react";

import { PurposeFuncOps } from './../../types/enum/PurposeFuncOps'
import InputVariables from "./InputVariables";
import InputRestrictions from "./InputRestrictions";

interface VariableRestrictionFormProps {
    nVariable: number;
    nRestriction: number;
    setFunctionValues: (functionValues: number[]) => void;
    setPurposeFuncOpsInput: (purposeFunc: PurposeFuncOps) => void;
    handleAddRestriction: () => void;
}

function VariableRestrictionForm({ nVariable, nRestriction, setFunctionValues, setPurposeFuncOpsInput, handleAddRestriction }: VariableRestrictionFormProps) {

    //Using the state with the ePurposeFuncOps
    const [purposeFunc, setPurposeFunc] = useState<PurposeFuncOps>(PurposeFuncOps.Maximize);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPurposeFunc(e.target.value as PurposeFuncOps);
        setPurposeFuncOpsInput(e.target.value as PurposeFuncOps)
    };

    return (
        <div className="mt-2">
            <div className='my-4'>
                
                <h1 className="p-1 text-xl">What is the purpose of the function?</h1>

                <select
                    className='border border-black p-1 rounded-md px-3 '
                    value={purposeFunc}
                    onChange={handleSelectChange}
                >
                    {/* Associando os valores do enum às opções */}
                    <option value={PurposeFuncOps.Maximize}>{PurposeFuncOps.Maximize}</option>
                    <option value={PurposeFuncOps.Minimize}>{PurposeFuncOps.Minimize}</option>
                </select>
            </div>

            <div className="flex-wrap justify-center">
                <div className="bg-gray-100 p-5 rounded-xl m-5">
                    <InputVariables
                        nVariable={nVariable}
                        hangleChange={setFunctionValues}
                    />

                    <InputRestrictions
                        nVariable={nVariable}
                        nRestrictions={nRestriction}
                        handleAddRestriction={handleAddRestriction}
                    />

                </div>
            </div>

        </div>
    );
}

export default VariableRestrictionForm;