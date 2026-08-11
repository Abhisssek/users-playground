import { useEffect, createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // console.log(accessToken);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.accessToken;

        setAccessToken(newAccessToken);

        const userResponse = await axios.get(
          "http://localhost:3000/api/auth/check-me",
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          },
        );

        setUser(userResponse.data);
      } catch (error) {
        console.log(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };



  // console.log(user);
  

  return (
    <AuthContext.Provider
      value={{ user, login, logout, accessToken, setAccessToken, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
