import { gql, useApolloClient } from "@apollo/client";
import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAuthContext: AuthContextProps = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const client = useApolloClient();
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    let mounted = true;
    client
      .query({
        query: gql`
          query RestoreCustomerSession {
            activeCustomer {
              id
            }
          }
        `,
        fetchPolicy: "no-cache",
      })
      .then(({ data }) => {
        if (mounted && localStorage.getItem("auth_token") === token)
          setIsLoggedIn(!!data?.activeCustomer);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [client]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
