interface InputConstraintLimitProps {
    onChangeInputConstraintLimit: (xRestriction: number, input: number) => void;
    xRestriction: number;
}

function InputConstraintLimit({ onChangeInputConstraintLimit, xRestriction }: InputConstraintLimitProps): JSX.Element {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInputConstraintLimit(parseFloat(event.target.value), xRestriction);
    };

    return (
        <div className="pl-3">
            <input
                className='border-2 border-black rounded-md text-center w-24 my-1'
                name={"Limit" + xRestriction}
                type="number"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default InputConstraintLimit