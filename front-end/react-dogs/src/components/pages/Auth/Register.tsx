import { useState } from "react";
import Inputs from "../../Inputs/Inputs"
import styles from "../../Inputs/Form.module.css";
import { Link } from "react-router-dom";

export const Register = () => {
 
  const [nome, setNome] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




  return (
    <section className="sectionRegister">
        <h1>Register</h1>
        <form>

            <Inputs

              text="Nome"
              type="text"
              name="name"
              value={nome}
              placeholder="Digite seu Nome"
              handleOnChange={(e) => setNome(e.target.value)}
            

            />

            <Inputs

            text="Telefone"
            type="text"
            name="phone"
            value={phone}
            placeholder="Digite seu número "
            handleOnChange={(e) => setPhone(e.target.value)}


            />

          <Inputs

          text="E-mail"
          type="email"
          name="email"
          value={email}
          placeholder="Digite seu E-mail "
          handleOnChange={(e) => setEmail(e.target.value)}


          />
        
        <Inputs

        text="senha"
        type="password"
        name="password"
        value={password}
        placeholder="Digite sua senha "
        handleOnChange={(e) => setPassword(e.target.value)}
        
        
        />

        <Inputs

          text="confirmpassword"
          type="password"
          name="confirmpassword"
          value={confirmPassword}
          placeholder="Confirme sua Senha"
          handleOnChange={(e) => setConfirmPassword(e.target.value)}
        
        />    
          
        <button type="submit" className={styles.button} > Registrar </button>
            


        </form>

          <p> Já tem uma conta? <Link to="/login"> Clique aqui </Link></p>

    </section>
  )
}
