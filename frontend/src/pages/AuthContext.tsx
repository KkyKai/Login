import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  currentUser: any;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>; 
}

const initialState = {
  currentUser: null,
  loading: false,
  setCurrentUser: () => {}
};

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    setCurrentUser,
  };

  console.log("value:", value);
  console.log("children:", children);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

