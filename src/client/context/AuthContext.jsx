import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
  
    useEffect(() => {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.userId, username: payload.username, email: payload.email });
      } else {
        setUser(null);
      }
    }, [token]);
  
    const login = (newToken, userData) => {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };