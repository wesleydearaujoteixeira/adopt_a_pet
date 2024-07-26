import { createContext, useContext } from "react";
import useAuth, { UserTypes } from "../hooks/auth";


type ContextTypes = {
    register:  (User: UserTypes) => void,
    authenticate: boolean,
    logout: () => void,
    Login: (User: UserTypes) => void,
    setAutenticate: (state: boolean) => void

}

export const UserContext = createContext <ContextTypes | null> (null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const { authenticate, register, logout, Login, setAutenticate} = useAuth();

  return (
    <UserContext.Provider value={{register, authenticate, logout, Login, setAutenticate }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(UserContext);
};
