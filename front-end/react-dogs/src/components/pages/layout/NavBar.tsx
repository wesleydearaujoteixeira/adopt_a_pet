import { Link } from "react-router-dom"
import Logo from '../../../assets/pet_dog.png';
import styles from './NavBar.module.css';

const NavBar = () => {


  return (

    <nav className={styles.navBar}>

        
            <Link to="/" className={styles.navBar_logo}> 
                <img src={Logo} alt="logo" />
                <h1> Adopter A Pet </h1>
            </Link>

        <ul>
            <li>
                <Link to="/"> Adotar </Link>
            </li>

            <li>
                <Link to="/login"> Entrar </Link>
            </li>

            <li>
                <Link to="/register"> Registrar </Link>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar