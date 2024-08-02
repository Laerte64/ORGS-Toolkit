import { useState } from "react";

import { PurposeFuncOps } from "./../../types/enum/PurposeFuncOps";
import InputVariables from "./InputVariables";
import InputRestrictions from "./InputRestrictions";
import Variable from "../../model/simplex/variable";
import Restriction from "../../model/simplex/restriction";

interface VariableRestrictionFormProps {
  nVariable: number;
  nRestriction: number;
  functionValues: Variable[]; 
  restrictionValues: Restriction[];

  setFunctionValues: (functionValues: number[]) => void;
  handleFunctionNameInput: (xVariable: number, value: string) => void;
  setPurposeFuncOpsInput: (purposeFunc: PurposeFuncOps) => void;
  
  setRestrictionsCoefValues: (xVariable: number, xRestriction: number, value: number) => void 
  setRestrictionsLimitValue: (xRestriction: number, value: number) => void 
  setRestrictionsEqualityType: (xRestriction: number,type: number) => void

  hangleChangeLimitValue: (value: number, xVariable: number, typeLimit: string) => void;
  handleAddRestriction: () => void;
}

function VariableRestrictionForm({
  nVariable,
  nRestriction,
  functionValues,
  restrictionValues,
  setFunctionValues,
  handleFunctionNameInput,
  setPurposeFuncOpsInput,
  setRestrictionsCoefValues,
  setRestrictionsLimitValue,
  setRestrictionsEqualityType,
  hangleChangeLimitValue,
  handleAddRestriction,
}: VariableRestrictionFormProps) {
  //Using the state with the ePurposeFuncOps
  const [purposeFunc, setPurposeFunc] = useState<PurposeFuncOps>(
    PurposeFuncOps.Maximize
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPurposeFunc(e.target.value as PurposeFuncOps);
    setPurposeFuncOpsInput(e.target.value as PurposeFuncOps);
  };

  return (
    <div className="mt-2">
      <div className="my-4">
        <h1 className="p-1 text-xl">What is the purpose of the function?</h1>

        <select
          className="border border-black p-1 rounded-md px-3 "
          value={purposeFunc}
          onChange={handleSelectChange}
        >
          {/* Associando os valores do enum às opções */}
          <option value={PurposeFuncOps.Maximize}>
            {PurposeFuncOps.Maximize}
          </option>
          <option value={PurposeFuncOps.Minimize}>
            {PurposeFuncOps.Minimize}
          </option>
        </select>
      </div>

      <div className="flex-wrap justify-center">
        <div className="bg-gray-100 p-5 rounded-xl m-5">
          
          <InputVariables
            functionValues = {functionValues}
            nVariable = {nVariable}
            hangleChange = {setFunctionValues}
            handleFunctionNameInput= {handleFunctionNameInput}
            hangleChangeLimitValue = {hangleChangeLimitValue}
          />

          <InputRestrictions
            nVariable = {nVariable}
            nRestrictions = {nRestriction}
            restrictionValues = {restrictionValues}
            handleAddRestriction = {handleAddRestriction}
            setRestrictionsCoefValues = {setRestrictionsCoefValues}
            setRestrictionsLimitValue = {setRestrictionsLimitValue}
            setRestrictionsEqualityType = {setRestrictionsEqualityType}
          />

        </div>
      </div>
    </div>
  );
}

export default VariableRestrictionForm;
