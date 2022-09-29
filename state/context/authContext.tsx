import { authContextType } from "@/state/type/authContextType";
import { createContext, useContext } from "react";

const authContextDefaultValues: authContextType = {
  user: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);

export function useAuth() {
  return useContext(AuthContext);
}
