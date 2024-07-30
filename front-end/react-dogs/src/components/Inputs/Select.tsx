import selectStyle from './selectStyles.module.css'



type TypeProps = {
      text: string,
      name: string,
      options: string[],
      handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
      value?: string,

}


export function Select ({text, name, options, handleOnChange, value}: TypeProps) {

      return (
            <div className={selectStyle.selectInfo}>
                  <label>{text}</label>
                  <select 
                     name={name} 
                     value={value} 
                     onChange={handleOnChange}>
                     {options.map((option, index) => (
                        <option key={index} value={option}> {option}</option>
                     ))}
                  </select>
            </div>
      )
      

}