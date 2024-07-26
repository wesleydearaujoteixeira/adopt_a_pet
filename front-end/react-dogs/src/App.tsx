import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  Home  from './components/pages/Home';
import { Login } from './components/pages/Auth/Login';
import { Register } from './components/pages/Auth/Register';
import { Profile } from './components/pages/User/Profile';


const router = createBrowserRouter([

    {
      path: '/',
      element: <Home/>,
      children: [
        
      {
        path: '/login',
        element: <Login/>
      },

      {
        path: '/register',
        element: <Register/>
      
      },

      {
        path: '/profile',
        element: <Profile/>
      
      },
    
    ]
    }


]);  

router


function App() {

  return (  
        <>
          <RouterProvider router={router}/>
        </>
  );
}

export default App;
