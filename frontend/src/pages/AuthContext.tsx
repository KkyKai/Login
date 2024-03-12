import React, { useContext, useEffect, useState } from "react";

interface AuthContextType {
  currentUser: any; // Update this to the appropriate type of currentUser
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>; // Update this to the appropriate type of setCurrentUser
}

const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  loading: false,
  setCurrentUser: () => {}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Update this to the appropriate type of currentUser
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      setCurrentUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setLoading(false); // If there's no user in localStorage, set loading to false
    }
  }, []);

  const value = {
    currentUser,
    loading,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
