import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for the user in sessionStorage on component mount
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      if (response.status === 201 || response.status === 200) {
        const registeredUser = response.data.user;
        setIsLoggedIn(true);
        setUser(registeredUser);
        sessionStorage.setItem("user", JSON.stringify(registeredUser));
        return { success: true, message: "Registration successful!" };
      } else {
        return { success: false, message: "Registration failed. Please try again." };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: error.response?.data || "An error occurred during registration." };
    }
  };

  const login = async (userData, headers) => {
    try {
      const response = await api.post("/users/login", userData, { headers });
      if (response.status === 200) {
        const loggedInUser = response.data.user;
        setIsLoggedIn(true);
        setUser(loggedInUser);
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: "Login failed. Please check your credentials." };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: error.response?.data || "An error occurred during login." };
    }
  };

  const logout = () => {
    // Remove user info from sessionStorage and set user to null
    setIsLoggedIn(false);
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, register, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
