import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const decodeToken = async (token) => {
    if (token) {
      const decodedUser = jwt_decode(token);
      const userData = decodedUser.data;
      console.log('User', userData);
      setUser(userData);
    } else {
      const localStorageToken = localStorage.getItem('token');
      if (localStorageToken) {
        console.log('User from local');
        decodeToken(localStorageToken);
      }
    }
  };
  useEffect(() => {
    decodeToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, decodeToken }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context) {
    return context;
  }
};

export default useUser;
