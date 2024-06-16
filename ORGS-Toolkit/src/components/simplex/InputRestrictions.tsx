import InputConstraintLimit from "../form/InputConstraintLimit";
import InputInequalityType from "../form/InputInequalityType";
import InputRestrictionValue from "../form/InputRestriction";

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
    <div className="mt-5">
      <h1 className="pb-3 text-2xl font-bold">Restrictions:</h1>
      <div className="flex justify-center">
        <div>
          {Array.from({ length: nRestrictions }, (_, index_) => (
            <div className="flex" key={`restriction-${index_}`}>
              {Array.from({ length: nVariable }, (_, index) => (
                <>
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