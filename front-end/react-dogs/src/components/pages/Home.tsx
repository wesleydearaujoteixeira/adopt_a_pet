import { Outlet } from "react-router-dom"
import '../../App.css';
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Container from "./layout/Container";

const Home = () => {
    
  return (
    <div>

      <NavBar/>
      <Outlet/>
       <Container/>    
      <Footer/>
    
    </div>
  
  )
}

export default Home