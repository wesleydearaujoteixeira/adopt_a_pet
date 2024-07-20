import { useState, ChangeEvent } from "react";
import Inputs from "../../Inputs/Inputs";
import styles from "../../Inputs/Form.module.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/UserContext";

export const Register = () => {

  const provider = useAuthContext();

  interface TypeUser {
    name: string, 
    phone:string,
    email: string,
    password: string,
    confirmPassword: string,
  }


  const [user, setUser] = useState  <TypeUser> ({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  return (
    <section className="sectionRegister">
      <h1>Register</h1>
      <form method="post" onSubmit={handleSubmit}>
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
          type="password"
          name="password"
          value={user.password}
          placeholder="Digite sua senha "
          handleOnChange={handleChange}
        />
        <Inputs
          text="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="Confirme sua Senha"
          handleOnChange={handleChange}
        />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Clique aqui</Link></p>
    </section>
  );
};
