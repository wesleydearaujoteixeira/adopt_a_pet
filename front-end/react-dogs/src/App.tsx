import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/pages/Home';
import { Login } from './components/pages/Auth/Login';
import { Register } from './components/pages/Auth/Register';
import { Profile } from './components/pages/User/Profile';
import MyPets from './components/pages/Pets/MyPets';
import AddPets from './components/pages/Pets/addPets';
import EditPet from './components/pages/Pets/EditPet';
import Dashboard from './components/pages/layout/Dashboard';
import Details from './components/pages/layout/Details';
import MyAdoptions from './components/pages/layout/MyAdoptions';

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
      },

      {
        path: 'pet/edit/:id',
        element: <EditPet/>
      },

      {
        path: '/pet/dashboard',
        element: <Dashboard/>
      },
      
      {
        path: 'pet/:id',
        element: <Details/>
      },

      {
        path: 'pet/myadoptions',
        element: <MyAdoptions/>
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
