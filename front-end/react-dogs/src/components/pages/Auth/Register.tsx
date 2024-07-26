import { useState, ChangeEvent } from "react";
import Inputs from "../../Inputs/Inputs";
import styles from "../../Inputs/Form.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/UserContext";
import { FaEyeSlash } from "react-icons/fa";

import style from '../Auth/FormRegister.module.css'
import { Message } from "../layout/Message";

export const Register = () => {

  const provider = useAuthContext();

  interface TypeUser {
    name: string, 
    phone:string,
    email: string,
    password: string,
    confirmpassword: string,
  }


  const [status, setStatus] = useState(false);
  const [estatic, setEstatic] = useState(false);

  const [user, setUser] = useState  <TypeUser> ({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
  });


  function handleChange(e:  ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }


  const handleSubmit = (e: React.FormEvent) => {
    
    e.preventDefault();
    console.log(user);
    provider?.register(user);


    // Handle form submission
  };


  const handleShowPassword = () =>  {
      setStatus(!status);
  };


  const handleShowPasswordTwo = () => {
    setEstatic(!estatic);
  }


  return (
    <section className="sectionRegister">

      <Message/>
      
      <h1>Register</h1>

      <form className={style.Form}   method="post" onSubmit={handleSubmit}>
        <Inputs
          text="Nome"
          type="text"
          name="name"
          value={user.name}
          placeholder="Digite seu Nome"
          handleOnChange={handleChange}
        />

        <Inputs
          text="Telefone"
          type="text"
          name="phone"
          value={user.phone}
          placeholder="Digite seu número "
          handleOnChange={handleChange}
        />

        <Inputs
          text="E-mail"
          type="email"
          name="email"
          value={user.email}
          placeholder="Digite seu E-mail "
          handleOnChange={handleChange}
        />
        <Inputs
          text="Senha"
          type={status === true ? "text" : "password"}
          name="password"
          value={user.password}
          placeholder="Digite sua senha "
          handleOnChange={handleChange}
        />
        <Inputs
          text="Confirmar Senha"
          type={estatic === true ? "text" : "password"}
          name="confirmpassword"
          value={user.confirmpassword}
          placeholder="Confirme sua Senha"
          handleOnChange={handleChange}
        />
        
        
        <div className={style.figuteOutEyes} >
          <FaEyeSlash onClick={() => handleShowPassword()} />
        </div>


        <div className={style.figuteOutEyesTwo}>
          <FaEyeSlash onClick={() => handleShowPasswordTwo()}/>
        </div>

        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
    </section>
  );
};
