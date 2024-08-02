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
        <nav id={styles.menu} className={styles.navBar}>
            <Link to="/pet/dashboard" className={styles.navBar_logo}> 
                <img src={Logo} alt="logo" />
                <h1>Adopter A Pet</h1>
            </Link>

              

                <ul>

                <div className={styles.action} >
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
                                <Link to={'/pet/myadoptions'}> My Adoptions </Link>
                            </li>

                            <li>
                                <Link to={'/mypets'}> MyPets </Link>
                            </li>

                            <li>
                                <Link to="/pet/dashboard">Adotar</Link>
                            </li>

                            <li onClick={() => Exit()}>
                                <Link to={'/login'}> Sair </Link>
                            </li> 
                        </>
                    )}
                </div>



                <div className={styles.Exibir}>


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
                                <Link to={'/pet/myadoptions'}> My Adoptions </Link>
                            </li>

                            <li>
                                <Link to={'/mypets'}> MyPets </Link>
                            </li>

                            <li>
                                <Link to="/pet/dashboard">Adotar</Link>
                            </li>

                            <li onClick={() => Exit()}>
                                <Link to={'/login'}> Sair </Link>
                            </li> 
                        </>
                    )}
                </div>



                </ul>
        </nav>
    );
};

export default NavBar;
