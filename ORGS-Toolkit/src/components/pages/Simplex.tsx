import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import InputVariableRestriction from "../simplex/InputVariableRestriction";
import VariableRestrictionForm from "../simplex/VariableRestrictionForm";

import { PurposeFuncOps } from "./../../types/enum/PurposeFuncOps";
import Variable from "../../model/simplex/variable";
import Restriction from "../../model/simplex/restriction";
import { EqualityType } from "../../model/simplex/restriction";

function Simplex(): JSX.Element {
  const { t } = useTranslation("simplex");

  const [nVariable, setnVariable] = useState<number>(() => {
    // Attempt to retrieve the value from localStorage.
    const saved = localStorage.getItem("nVariable");
    // If a value is found, parse it as an integer using base 10.
    // If not found, default to 1.
    return saved ? parseInt(saved, 10) : 1;
  });

  const [nRestriction, setnRestriction] = useState<number>(() => {
    // Attempt to retrieve the value from localStorage.
    const saved = localStorage.getItem("nRestriction");
    // If a value is found, parse it as an integer using base 10.
    // If not found, default to 1.
    return saved ? parseInt(saved, 10) : 1;
  });

  const [functionValues, setFunctionValues] = useState<Variable[]>(() =>
    Array.from(
      { length: nVariable },
      (_, index) => new Variable(`X${index + 1}`, 0, Infinity, 0)
    )
  );

  const [restrictionValues, setRestrictionValues] = useState<Restriction[]>(
    () => {
      // Função para gerar um vetor de zeros do tamanho especificado
      const returnNumberVetor = (size: number): number[] => {
        let vetor: number[] = [];
        for (let i = 0; i <= size; i++) {
          vetor.push(0);
        }
        return vetor;
      };

      const saved = localStorage.getItem("nVariable");
      // If a value is found, parse it as an integer using base 10.
      // If not found, default to 1.
      let saved_ = saved ? parseInt(saved, 10) : 1;

      // Inicializa o estado restrictionValues
      return Array.from(
        { length: nRestriction },
        (_, index) =>
          new Restriction(EqualityType.lower, returnNumberVetor(saved_), 0)
      );
    }
  );

  const [purposeFuncOps, setPurposeFuncOps] = useState<PurposeFuncOps>(
    PurposeFuncOps.Maximize
  );

  const [listErrors, setLisErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  function setVariableRestriction(variable: number, restriction: number): void {
    if (variable !== nVariable || restriction !== nRestriction) {
      if (variable !== nVariable) {
        // Arrumando o coeficiente das restrições para ter o mesmo tamanho das variáveis
        let updatedRestrictions: Restriction[] = restrictionValues.map(
          (restriction) => ({
            ...restriction,
          })
        );

        updatedRestrictions.map((restriction) => {
          let updatedCoef: number[] = restriction.coef;

          updatedCoef = Array.from({ length: variable }, (_, index) => {
            // Verifica se o índice atual tem uma instância existente
            if (updatedCoef[index]) {
              return updatedCoef[index];
            } else {
              return 0;
            }
          });

          restriction.coef = updatedCoef;
        });

        setRestrictionValues(updatedRestrictions);

        let functionValues_: Variable[] = [];
        functionValues_ = Array.from({ length: variable }, (_, index) => {
          // Verifica se o índice atual tem uma instância existente
          if (functionValues[index]) {
            return functionValues[index];
          } else {
            return new Variable(`X${index + 1}`, 0, Infinity, 0);
          }
        });

        setFunctionValues(functionValues_);
      }

      if (restriction !== nRestriction) {
        let restrictionValues_: Restriction[] = [];
        restrictionValues_ = Array.from({ length: restriction }, (_, index) => {
          // Verifica se o índice atual tem uma instância existente
          if (restrictionValues[index]) {
            let updatedCoef: number[] = restrictionValues[index].coef;

            let lengthVariable = variable ? variable : nVariable;

            updatedCoef = Array.from({ length: lengthVariable }, (__, i) => {
              // Verifica se o índice atual tem uma instância existente
              if (restrictionValues[index].coef[i]) {
                return restrictionValues[index].coef[i];
              } else {
                return 0;
              }
            });

            restrictionValues[index].coef = updatedCoef;

            return restrictionValues[index];
          } else {
            let updatedCoef: number[] = Array.from(
              { length: variable },
              () => 0
            );

            return new Restriction(EqualityType.lower, updatedCoef, 0);
          }
        });

        setRestrictionValues(restrictionValues_);
      }

      setnVariable(variable);
      setnRestriction(restriction);

      navigate(`/simplex/inputmatrix`);
    }
  }

  //--------------------------FunctionValuesAndLimitValues--------------------------//

  function setFunctionNameInput(xVariable: number, value: string): void {
    console.log(xVariable, " ", value);
    const indexVariable: number = xVariable - 1;

    let updatedVariables: Variable[] = functionValues.map((variable) => ({
      ...variable,
    }));

    updatedVariables[indexVariable].name = value;
    setFunctionValues(updatedVariables);
  }

  function setFunctionValuesInput(functionCoefficientValues: number[]): void {
    //console.log(functionCoefficientValues);

    let functionValues_: Variable[] = Array.from(
      { length: functionCoefficientValues.length },
      (_, index) => {
        // Verifica se o índice atual tem uma instância existente

        if (!isNaN(functionCoefficientValues[index])) {
          let variable = functionValues[index];
          variable.value = functionCoefficientValues[index];

          return variable;
        } else {
          let variable = functionValues[index];
          variable.value = 0;

          return variable;
        }
      }
    );

    setFunctionValues(functionValues_);
  }

  function setFunctionValuesLimitInput(
    value: number,
    xVariable: number,
    typeLimit: string
  ): void {
    console.log("foi chamada setFunctionValuesLimitInput");
    /*
    let varibles: Variable[] = functionValues;
    const index: number = xVariable - 1;

    if (typeLimit === "upper") {

      //upper
      if (varibles[index]) {
        //se o limite supeior é maior
        if (varibles[index].upper >= varibles[index].lower) {
          console.log("valor ", varibles[index])
          varibles[index].upper = value;
        } else {
          console.log("valor ", varibles[index])
          let messageAlert =
            " (Upper limit value) is aa lower than (lower limit value) of variable X" + xVariable;
          alert(messageAlert);
        }
      } else {
        let messageAlert = "this variable doesn't exist, X" + xVariable;
        alert(messageAlert);
      }
    } else {

      //lower
      if (varibles[index]) {
        //se o limite supeior é maior
        if (varibles[index].lower <= varibles[index].upper) {
          varibles[index].lower = value;
        } else {
          let messageAlert =
            " (Upper limit value) is lower s than (lower limit value) of variable X" + xVariable;
          alert(messageAlert);
        }
      } else {
        let messageAlert = "this variable doesn't exist, X" + xVariable;
        alert(messageAlert);
      }
    }
      */

    let updatedVariables: Variable[] = functionValues.map((variable) => ({
      ...variable,
    }));

    const index: number = xVariable - 1;

    if (typeLimit === "upper") {
      updatedVariables[index].upper = value;
    } else {
      updatedVariables[index].lower = value;
    }

    console.log(updatedVariables);
    setFunctionValues(updatedVariables);
  }

  //--------------RestrictionsValues/InequalityType/Constraint--------------//
  function setRestrictionsCoefValues(
    xVariable: number,
    xRestriction: number,
    value: number
  ): void {
    const indexVariable: number = xVariable - 1;
    const indexRestriction: number = xRestriction - 1;

    let updatedRestrictions: Restriction[] = restrictionValues.map(
      (restriction) => ({
        ...restriction,
      })
    );

    let updatedRestriction: Restriction = updatedRestrictions[indexRestriction];

    let updatedCoef: number[] = updatedRestriction.coef;

    updatedCoef = Array.from({ length: nVariable }, (_, index) => {
      // Verifica se o índice atual tem uma instância existente
      if (updatedCoef[index]) {
        return updatedCoef[index];
      } else {
        return 0;
      }
    });

    updatedCoef[indexVariable] = value;

    updatedRestriction.coef = updatedCoef;
    updatedRestrictions[indexRestriction] = updatedRestriction;

    setRestrictionValues(updatedRestrictions);
  }

  function setRestrictionsLimitValue(
    xRestriction: number,
    value: number
  ): void {
    const indexRestriction: number = xRestriction - 1;

    let updatedRestrictions: Restriction[] = restrictionValues.map(
      (restriction) => ({
        ...restriction,
      })
    );

    let updatedRestriction: Restriction = updatedRestrictions[indexRestriction];
    updatedRestriction.limit = value;
    updatedRestrictions[indexRestriction] = updatedRestriction;

    setRestrictionValues(updatedRestrictions);
  }

  function setRestrictionsEqualityType(
    xRestriction: number,
    type: number
  ): void {
    console.log(xRestriction, " ", type);
    const indexRestriction: number = xRestriction - 1;

    let updatedRestrictions: Restriction[] = restrictionValues.map(
      (restriction) => ({
        ...restriction,
      })
    );

    let updatedRestriction: Restriction = updatedRestrictions[indexRestriction];

    let type_: EqualityType;

    if (type === 0) {
      type_ = EqualityType.equal;
    } else if (type === 1) {
      type_ = EqualityType.lower;
    } else if (type === 2) {
      type_ = EqualityType.greater;
    }

    updatedRestriction.type = type_;

    updatedRestrictions[indexRestriction] = updatedRestriction;
    setRestrictionValues(updatedRestrictions);
  }

  function setPurposeFuncOpsInput(purposeFunc: PurposeFuncOps): void {
    setPurposeFuncOps(purposeFunc);
  }

  function addRestriction(): void {
    if (nRestriction) {
      const nRestriction_ = nRestriction + 1;

      let restrictionValues_: Restriction[] = [];
      restrictionValues_ = Array.from({ length: nRestriction_ }, (_, index) => {
        // Verifica se o índice atual tem uma instância existente
        if (restrictionValues[index]) {
          let updatedCoef: number[] = restrictionValues[index].coef;

          let lengthVariable = nVariable ? nVariable : nVariable;

          updatedCoef = Array.from({ length: lengthVariable }, (__, i) => {
            // Verifica se o índice atual tem uma instância existente
            if (restrictionValues[index].coef[i]) {
              return restrictionValues[index].coef[i];
            } else {
              return 0;
            }
          });

          restrictionValues[index].coef = updatedCoef;

          return restrictionValues[index];
        } else {
          let updatedCoef: number[] = Array.from(
            { length: nVariable },
            () => 0
          );

          return new Restriction(EqualityType.lower, updatedCoef, 0);
        }
      });

      setRestrictionValues(restrictionValues_);

      localStorage.setItem("nRestriction", nRestriction_.toString());

      setnRestriction(nRestriction + 1);
    }
  }

  //--------------simplex--------------//
  function simplexCreate(){
    const errors = checkErrors();
    
  }

  function checkErrors(): void{
    let errors: string[] = [];

    functionValues.forEach((functionValue) => {
      if(functionValue.lower > functionValue.upper){
        let error = "The 'lower value' of Variable: "+functionValue.name +  " is bigger than 'upper value'"

        errors.push(error)
      }

    });

    setLisErrors(errors);
  }

  return (
    <div className="text-center w-full">
      <InputVariableRestriction
        handleVariableRestriction={setVariableRestriction}
        initialVariable={nVariable}
        initialRestriction={nRestriction}
      />

      {nVariable && nRestriction && (
        <VariableRestrictionForm
          nVariable={nVariable}
          nRestriction={nRestriction}
          functionValues={functionValues}
          restrictionValues={restrictionValues}
          setFunctionValues={setFunctionValuesInput}
          handleFunctionNameInput={setFunctionNameInput}
          setPurposeFuncOpsInput={setPurposeFuncOpsInput}
          setRestrictionsCoefValues={setRestrictionsCoefValues}
          setRestrictionsLimitValue={setRestrictionsLimitValue}
          setRestrictionsEqualityType={setRestrictionsEqualityType}
          hangleChangeLimitValue={setFunctionValuesLimitInput}
          handleAddRestriction={addRestriction}
        />
      )}

      <div>
        <button onClick={simplexCreate} className="bg-green-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 border border-emerald-700 rounded">
          Continuar
        </button>
      </div>

      
      {listErrors.length > 0 && (
        <div className="bg-red-100 m-5 rounded-md py-4">
          <h1 className="text-xl">ERROS:</h1>
          <div>
            {listErrors.map((error, index) => (
              <p key={index} className="p-2 text-md">
                {error}
              </p>
            ))}
          </div>
        </div>
      )}
        
      <div>
        <div className="my-4 text-2xl">
          <h1>Number of Variables: {nVariable}</h1>
          <h1>Number of Restrictions: {nRestriction}</h1>
          <h1>What is the purpose of the function: {purposeFuncOps}</h1>
        </div>

        <div className="space-y-8 p-4">
          <div className="flex justify-center text-xl">
            
            <table className="table-auto border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Value</th>
                  <th className="border border-gray-400 px-4 py-2">Range</th>
                </tr>
              </thead>
              <tbody>
                {functionValues.map((variable, index) => (
                  <tr key={index} className="bg-white even:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">
                      {variable.name}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {variable.value}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {variable.lower} to {variable.upper}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center text-xl">
            <table className="table-auto border-collapse border border-gray-400 w-auto max-w-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-6 py-3">
                    Coefficients
                  </th>
                  <th className="border border-gray-400 px-6 py-3">Type</th>
                  <th className="border border-gray-400 px-6 py-3">Limit</th>
                </tr>
              </thead>
              <tbody>
                {restrictionValues.map((restriction, index) => (
                  <tr key={index} className="bg-white even:bg-gray-100">
                    <td className="border border-gray-400 px-6 py-3">
                      <ul className="flex space-x-3">
                        {restriction.coef.map((coef, coefIndex) => (
                          <li key={coefIndex}>{coef}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-gray-400 px-6 py-3">
                      {restriction.type === 0 && "="}
                      {restriction.type === 1 && "≤"}
                      {restriction.type === 2 && "≥"}
                    </td>
                    <td className="border border-gray-400 px-6 py-3">
                      {restriction.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Simplex;
