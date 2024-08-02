import React from 'react';
import { EqualityType } from '../../../model/simplex/restriction';

interface InputInequalityTypeProps {
  xRestriction: number;
  value: number;
  handleChange: (xRestriction: number, type: number) => void;
}

function InputInequalityType({
  xRestriction,
  value,
  handleChange,
}: InputInequalityTypeProps): JSX.Element {

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    handleChange(xRestriction, newValue);
  };

  return (
    <div>
      <select
        value={value}
        onChange={handleInputChange}
        className="border border-black rounded-md w-10 mt-1 text-black bg-white"
      >
        <option value={EqualityType.lower} className="text-black">
          ≤
        </option>
        <option value={EqualityType.greater} className="text-black">
          ≥
        </option>
        <option value={EqualityType.equal} className="text-black">
          =
        </option>
      </select>
    </div>
  );
}

export default InputInequalityType;
