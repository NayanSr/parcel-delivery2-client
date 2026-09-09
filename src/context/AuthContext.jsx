
// TODO use two file one for useAuth function and another for AuthProvider. Also use  HttpOnly + Secure cookie approach for security purpose not localStorage
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend URL
  const API_URL = "http://localhost:5000/api";

  // অ্যাপ লোড হলে localStorage থেকে user চেক করবে
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register
  const register = async (formData) => {
    const res = await axios.post(`${API_URL}/auth/register`, formData);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    }
    return res.data;
  };

  // Login
  const login = async (formData) => {
    const res = await axios.post(`${API_URL}/auth/login`, formData);
    if (res.data) {
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    }
    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    API_URL,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};