// src/contexts/AuthContext.js
import { createContext } from 'react';

// Create with a default value for safety
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false
});