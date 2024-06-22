interface SubmitButtonProps{
    text: string;
}

function SubmitButton({ text }: SubmitButtonProps): JSX.Element {
    return (
      <div>

        <button className={`bg-green-800 text-white py-2 px-4 rounded transition duration-500 ease-in-out focus:outline-none`}>
          {text}
        </button>

      </div>
    );
  }
  
export default SubmitButton;