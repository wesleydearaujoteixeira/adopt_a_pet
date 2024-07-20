import { createContext, useContext } from "react";
import useAuth, { UserTypes } from "../hooks/auth";


type ContextTypes = {
    register:  (User: UserTypes) => void;

}

export const UserContext = createContext <ContextTypes | null> (null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const { register } = useAuth();

  return (
    <UserContext.Provider value={{register}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(UserContext);
};
