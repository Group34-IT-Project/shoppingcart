import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users and current session
    const savedUsers = localStorage.getItem('shopEasy_users');
    const currentUser = localStorage.getItem('shopEasy_currentUser');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    
    setLoading(false);
  }, []);

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      type: userData.type || 'customer',
      createdAt: new Date().toISOString(),
      cart: [],
      orders: []
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('shopEasy_users', JSON.stringify(updatedUsers));
    
    // Auto-login after registration
    setUser(newUser);
    localStorage.setItem('shopEasy_currentUser', JSON.stringify(newUser));
    
    return newUser;
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('shopEasy_currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const demoLogin = () => {
    const demoUser = {
      id: 1,
      name: 'Demo User',
      email: 'demo@example.com',
      type: 'customer',
      cart: [],
      orders: []
    };
    setUser(demoUser);
    localStorage.setItem('shopEasy_currentUser', JSON.stringify(demoUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopEasy_currentUser');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    
    localStorage.setItem('shopEasy_currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('shopEasy_users', JSON.stringify(updatedUsers));
  };

  const value = {
    user,
    users,
    register,
    login,
    demoLogin,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isSupplier: user?.type === 'supplier',
    loading
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;