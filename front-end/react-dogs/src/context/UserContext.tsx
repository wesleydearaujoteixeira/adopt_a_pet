import { createContext, useContext } from "react";
import useAuth, { UserTypes } from "../hooks/auth";


type ContextTypes = {
    register:  (User: UserTypes) => void,
    authenticate: boolean,
    logout: () => void,
    Login: (User: UserTypes) => void

}

export const UserContext = createContext <ContextTypes | null> (null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const { authenticate, register, logout, Login } = useAuth();

  return (
    <UserContext.Provider value={{register, authenticate, logout, Login }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(UserContext);
};
