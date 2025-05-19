import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  username: string | null;
  authToken: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('authToken');
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setAuthToken(storedToken);
    }
  }, []);

  const login = (username: string, token: string) => {
    setUsername(username);
    setAuthToken(token);
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setUsername(null);
    setAuthToken(null);
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ username, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
