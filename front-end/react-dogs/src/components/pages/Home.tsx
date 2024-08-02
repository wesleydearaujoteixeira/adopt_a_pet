import { Outlet } from "react-router-dom"
import '../../App.css';
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import { UserProvider } from "../../context/UserContext";



const Home = () => {
    
  return (

    <div> 
    <UserProvider>
          <NavBar/>
          <Outlet/>
          <Container/>    
          <Footer/>
    </UserProvider>
    </div>
  )
}

export default Home