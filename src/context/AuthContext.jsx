import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [joinRequest, setJoinRequest] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    { user && getUserById(user?.id); }
    getAllUser();
  }, [])

  const getAllUser = async () => {
    try {
      const response = await api.get("/users/all");
      // console.log("all user", response.data);
      setAllUser(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      console.log("user by id", response);
      // setUser(response.data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      if (response.status === 201 || response.status === 200) {
        const registeredUser = response.data.user;
        setIsLoggedIn(true);
        setUser(registeredUser);
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
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      team,
      setTeam,
      allUser,
      joinRequest,
      setJoinRequest,
      register,
      login,
      logout,
      isLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  );
};
