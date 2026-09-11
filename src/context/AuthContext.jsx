// TODO use two file one for useAuth function and another for AuthProvider. Also use  HttpOnly + Secure cookie approach for security purpose not localStorage
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Backend URL
  const API = "http://localhost:5000/api";

  // অ্যাপ লোড হলে token চেক করবে
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Register
  const register = async (formData) => {
    const res = await axios.post(`${API}/auth/register`, formData);
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  // Login
  const login = async (formData) => {
    const res = await axios.post(`${API}/auth/login`, formData);
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    API,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
