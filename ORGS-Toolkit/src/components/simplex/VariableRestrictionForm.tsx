interface VariableRestrictionFormProps{
    nVariable: number; 
    nRestriction: number;
}

function VariableRestrictionForm({ nVariable, nRestriction }: VariableRestrictionFormProps){

    return (
        <div>
            <div>
                {nVariable} - {nRestriction}
            </div>
        </div>
    )
}

export default VariableRestrictionForm