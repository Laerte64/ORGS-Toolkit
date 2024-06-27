import { useEffect, useRef, useState } from 'react';
import InputConstraintLimit from "./form/InputConstraintLimit";
import InputInequalityType from "./form/InputInequalityType";
import InputRestrictionValue from "./form/InputRestriction";

interface InputRestrictionsProps {
  nVariable: number;
  nRestrictions: number;
  handleAddRestriction: () => void;
}

function InputRestrictions({ nVariable, nRestrictions, handleAddRestriction }: InputRestrictionsProps) {
  const ref = useRef<HTMLDivElement[]>([]);

  // Estado para armazenar o estilo de justificação para cada restrição
  const [justification, setJustification] = useState<string[]>(new Array(nRestrictions).fill(""));

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
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [nRestrictions, nVariable]); // Dependências que podem causar re-renderização

  return (
    <div className="pt-5">
      <h1 className="pb-3 text-2xl font-bold">Restrictions:</h1>
      <div className="flex-wrap justify-center overflow-x-scroll">
        <div className="">
          {Array.from({ length: nRestrictions }, (_, index_) => (

            <div ref={el => ref.current[index_] = el} className={`flex ${justification[index_]} p-1`} key={`restriction-${index_}`}>

              {Array.from({ length: nVariable }, (_, index) => (
                <InputRestrictionValue
                  key={index}
                  xVariable={index + 1}
                  xRestriction={index_ + 1}
                  label={`x${index + 1}`}
                />
              ))}

              <InputInequalityType
                xRestriction={index_ + 1}
              />

              <InputConstraintLimit
                xRestriction={index_ + 1}
              />

              {index_ + 1 == nRestrictions && (
                <button onClick={handleAddRestriction} className='w-6 -ml-6 border border-black relative left-10 rounded-md bg-white'>
                  +
                </button>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InputRestrictions;


/*import InputConstraintLimit from "./form/InputConstraintLimit";
import InputInequalityType from "./form/InputInequalityType";
import InputRestrictionValue from "./form/InputRestriction";

interface InputRestrictionsProps {
  nVariable: number;
  nRestrictions: number;
  handleRestrictionsValue: (nVariable: number, nRestrictions: number) => void;
}

function InputRestrictions({ nVariable, nRestrictions, handleRestrictionsValue }: InputRestrictionsProps) {

  function ChangeRestrictions(inputValue: number, xVariable: number, xRestriction: number): void {
    console.log(inputValue, " ", xVariable, " ", xRestriction);
  }

  function ChangeInequalitySelect(inequality: string, xRestriction: number): void {
    console.log(inequality, " ", xRestriction);
  }

  function ChangeConstraintLimit(constraintLimit: number, xRestriction: number): void {
    console.log(constraintLimit, " ", xRestriction);
  }

  return (
    <div className="pt-5">

      <h1 className="pb-3 text-2xl font-bold">Restrictions:</h1>

      <div className="flex-wrap justify-center overflow-x-scroll">

        <div>

          {Array.from({ length: nRestrictions }, (_, index_) => (
            <div className="flex justify-center " key={`restriction-${index_}`}>

              {Array.from({ length: nVariable }, (_, index) => (
                <>

                  <div className="flex justify-center p-1">

                    <div className="flex">

                      <InputRestrictionValue
                        key={index}
                        xVariable={index + 1}
                        xRestriction={index_ + 1}
                        label={`x${index + 1}`}
                        handleChange={ChangeRestrictions}
                      />

                      {index < nVariable - 1 &&

                        <div className="pr-1 text-xl">
                          +
                        </div>}

                    </div>
                  </div>
                </>

              ))}

              <InputInequalityType
                onInequalitySelect={ChangeInequalitySelect}
                xRestriction={index_ + 1}
              />

              <InputConstraintLimit
                onChangeInputConstraintLimit={ChangeConstraintLimit}
                xRestriction={index_ + 1}
              />

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default InputRestrictions
*/

