import {useEffect, createContext, useState, useContext } from "react";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);








  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh",{},
          {
            withCredentials: true,

          },
        );
        console.log(response);
        
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };





    refreshToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
