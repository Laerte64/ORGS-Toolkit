import { useEffect, useRef, useState } from "react";
import InputConstraintLimit from "./form/InputConstraintLimit";
import InputInequalityType from "./form/InputInequalityType";
import InputRestrictionValue from "./form/InputRestrictionValue";
import Restriction from "../../model/simplex/restriction";

interface InputRestrictionsProps {
  nVariable: number;
  nRestrictions: number;
  restrictionValues: Restriction[];
  handleAddRestriction: () => void;
  setRestrictionsCoefValues: (xVariable: number,xRestriction: number,value: number) => void;
  setRestrictionsLimitValue: (xRestriction: number, value: number) => void;
  setRestrictionsEqualityType: (xRestriction: number, type: number) => void;
}

function InputRestrictions({
  nVariable,
  nRestrictions,
  restrictionValues,
  handleAddRestriction,
  setRestrictionsCoefValues,
  setRestrictionsLimitValue,
  setRestrictionsEqualityType,
}: InputRestrictionsProps) {
  const ref = useRef<HTMLDivElement[]>([]);

  // Estado para armazenar o estilo de justificação para cada restrição
  const [justification, setJustification] = useState<string[]>(
    new Array(nRestrictions).fill("")
  );

  useEffect(() => {
    const checkOverflow = () => {
      const newJustification = justification.slice(); // Copia o estado atual
      ref.current.forEach((element, index) => {
        if (element && element.scrollWidth > element.clientWidth) {
          newJustification[index] = "";
        } else {
          newJustification[index] = "justify-center";
        }
      });
      setJustification(newJustification);
    };
    checkOverflow();
    // Ouvinte para mudanças de tamanho que podem afetar o overflow
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [nRestrictions, nVariable]); // Dependências que podem causar re-renderização

  return (
    <div className="pt-5">
      <h1 className="pb-3 text-2xl font-bold">Restrictions:</h1>
      <div className="flex-wrap justify-center overflow-x-scroll">
        <div className="">
          {Array.from({ length: nRestrictions }, (_, index_) => (
            <div
              ref={(el) => (ref.current[index_] = el)}
              className={`flex ${justification[index_]} p-1`}
              key={`restriction-${index_}`}
            >
              {Array.from({ length: nVariable }, (_, index) => (
                <InputRestrictionValue
                  key={index}
                  xVariable={index + 1}
                  xRestriction={index_ + 1}
                  label={`X${index + 1}`}
                  value={restrictionValues[index_].coef[index]}
                  handleChange={setRestrictionsCoefValues}
                />
              ))}

              <InputInequalityType
                xRestriction={index_ + 1}
                value={restrictionValues[index_].type}
                handleChange={setRestrictionsEqualityType}
              />

              <InputConstraintLimit
                xRestriction={index_ + 1}
                value={restrictionValues[index_].limit}
                handleChange={setRestrictionsLimitValue}
              />

              {index_ + 1 == nRestrictions && (
                <button
                  onClick={handleAddRestriction}
                  className="w-6 -ml-6 border border-black relative left-10 rounded-md bg-white"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="my-2">
          {Array.from({ length: nVariable }, (_, index) => (
            <span key={index}>
              X{index + 1}
              {index < nVariable - 1 && <>,&nbsp;</>}
            </span>
          ))}
          <span>&nbsp; ≥ 0</span>
        </div>
      </div>
    </div>
  );
}

export default InputRestrictions;
