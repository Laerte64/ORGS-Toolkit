
interface NumberSelectorProps {
  label?: string;
  numbers: number[];
  onNumberSelect: (number: number) => void;
  disabled: string;
  value?: number | string;  // Mudança de defaultValue para value
}

function NumberSelector({ label, numbers, onNumberSelect, disabled, value = '' }: NumberSelectorProps): JSX.Element {
  return (
    <div className='m-5'>
      <h1 className="p-1 text-xl">{label}</h1>
      <select
        onChange={(e) => onNumberSelect(Number(e.target.value))}
        value={value}  // Usando value para tornar o componente controlado
        className='border border-black p-1 rounded-md px-3'>
        <option value="" disabled>{disabled}</option>
        {numbers.map((number, index) => (
          <option key={index} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NumberSelector;
