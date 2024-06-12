interface ContainerProps {
  customClass?: string;
  children?: React.ReactNode; 
}
  
function Container( { customClass = '', children }: ContainerProps ): JSX.Element {
  return (
    <div className={`flex justify-around mx-auto flex-wrap ${customClass}`}>
      {children}
    </div>
  );
}
  
export default Container;  