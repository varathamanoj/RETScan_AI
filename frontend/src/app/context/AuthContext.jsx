import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Simulate API call - in real app, this would call your backend
    const userData = {
      email,
      role,
      name: email.split('@')[0],
      id: Math.random().toString(36).substr(2, 9),
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-jwt-token');
    setUser(userData);
    return userData;
  };

  const register = (name, email, password, role) => {
    // Simulate API call
    const userData = {
      email,
      role,
      name,
      id: Math.random().toString(36).substr(2, 9),
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-jwt-token');
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
