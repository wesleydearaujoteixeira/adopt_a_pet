import { Link } from "react-router-dom";
import Logo from '../../../assets/pet_dog.png';
import styles from './NavBar.module.css';
import { useAuthContext } from '../../../context/UserContext';


const NavBar = () => {
    const  auth  = useAuthContext();

    auth?.authenticate 

   // const logOut = auth?.logout();

    function Exit() {
        auth?.logout();
        window.location.href = '/';
        window.location.reload();
        console.log('Saiu');
 
    }
  

    return (
        <nav className={styles.navBar}>
            <Link to="/" className={styles.navBar_logo}> 
                <img src={Logo} alt="logo" />
                <h1>Adopter A Pet</h1>
            </Link>

                <ul>

                    {!auth?.authenticate && (
                        <>
                            <li>
                                <Link to="/login"> Entrar </Link>
                            </li>

                            <li>
                                <Link to="/register"> Registrar </Link>
                            </li>                
                        </>
                    )}
                       {auth?.authenticate && (
                        <>
                             <li>
                                <Link to={'/profile'}> Profile </Link>
                            </li>

                            <li>
                                <Link to="/">Adotar</Link>
                            </li>

                            <li onClick={() => Exit()}>
                                <Link to={'/login'}> Sair </Link>
                            </li> 
                        </>
                    )}


                </ul>
        </nav>
    );
};

export default NavBar;
