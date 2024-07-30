import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import { Login } from './components/pages/Auth/Login';
import { Register } from './components/pages/Auth/Register';
import { Profile } from './components/pages/User/Profile';
import MyPets from './components/pages/Pets/MyPets';
import AddPets from './components/pages/Pets/addPets';

const router = createBrowserRouter([
  
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'mypets',
        element: <MyPets />
      },
      {
        path: 'pet/add',
        element: <AddPets />
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
