import {useState} from 'react';
import Inputs from '../../Inputs/Inputs';
import {Link} from 'react-router-dom';

import { useAuthContext } from '../../../context/UserContext'
import styles from './Login.module.css';



export const Login = () => {

  const provider = useAuthContext();


  interface TypeUser {
    name: string, 
    phone:string,
    email: string,
    password: string,
    confirmpassword: string,
  }

  const [user, setUser] = useState  <TypeUser> ({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
 

  function handleChange(e:  React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(user);
    provider?.Login(user)
  }


  return (
    <section className={styles.LoginContent}>
        <h1>Login</h1>
        <form action="post" onSubmit={(e) => handleSubmit(e)}>
        
        
          <Inputs
            text="Email"
            type="email"
            name="email"
            value={user.email}
            placeholder="Digite seu email"
            handleOnChange={handleChange}
          />

        <Inputs
            text="Senha"
            type="text"
            name="password"
            value={user.password}
            placeholder="Digite seu email"
            handleOnChange={handleChange}
          />

        <button className={styles.btnLogin}> Login  </button>
        </form>
        <p> Não tem uma conta? <Link to={'/register'}> Acesse aqui </Link></p>
    </section>
  )
}
