'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/store';
import { useLoginMutation, useRefreshTokenMutation } from '../services/apiSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000;
        const now = Date.now();

        if (expiresAt > now) {
          // Token is still valid
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        } else {
          // Token expired
          handleLogout();
        }
      } catch (err) {
        console.error('Token parsing error:', err);
        handleLogout();
      }
    }
    setLoading(false);

    // Check token validity periodically
    const interval = setInterval(checkTokenValidity, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkTokenValidity = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        const timeUntilExpiry = expiresAt - now;

        if (timeUntilExpiry < 0) {
          // Token expired
          handleLogout();
        } else if (timeUntilExpiry < 5 * 60 * 1000) {
          // Token expiring in less than 5 minutes, refresh it
          handleTokenRefresh();
        }
      } catch (error) {
        console.error('Token validation error:', error);
        handleLogout();
      }
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await refreshTokenMutation({ refreshToken }).unwrap();
        const newAccessToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginMutation({ email, password }).unwrap();
      const { user: userData, accessToken, refreshToken } = response.data;

      // Store user data and tokens
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      const message = error.data?.message || error.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
    setError(null);

    // Redirect to login page
    window.location.href = '/login';
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      error,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};