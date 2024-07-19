import styles from './FormInput.module.css';



interface InputsProps {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  multiple?: boolean; // Optional prop
}

const Inputs: React.FC<InputsProps> = ({ type, text, name, placeholder, handleOnChange, value, multiple }) => {
 
    return (
   
   
   <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        placeholder={placeholder} 
        onChange={handleOnChange} 
        value={value} 
        multiple={multiple ? true : undefined} // Conditionally add the "multiple" attribute
      />
    </div>
  );
}

export default Inputs;
