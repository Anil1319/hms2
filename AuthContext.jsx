
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample user data - in a real app, this would come from an API
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'patient@example.com', role: 'patient', password: 'password' },
  { id: 2, name: 'Dr. Jane Smith', email: 'doctor@example.com', role: 'doctor', password: 'password' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'password' }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user in local storage
    const savedUser = localStorage.getItem('healthRecordsUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Find user with matching email, password and role
    const user = sampleUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      // In a real app, we'd receive and store a token
      const authenticatedUser = { ...user, password: undefined };
      setCurrentUser(authenticatedUser);
      localStorage.setItem('healthRecordsUser', JSON.stringify(authenticatedUser));
      
      // Redirect based on role
      if (role === 'patient') {
        navigate('/patient/dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      return { success: true };
    }
    
    return { 
      success: false, 
      error: 'Invalid credentials. Please check your email, password, and role.'
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthRecordsUser');
    navigate('/login');
  };

  const signup = (name, email, password, role) => {
    // Check if user already exists
    const existingUser = sampleUsers.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    // In a real app, this would be a POST request to create the user
    const newUser = {
      id: sampleUsers.length + 1,
      name,
      email,
      role,
      password
    };
    
    sampleUsers.push(newUser);
    
    // Auto login after signup
    return login(email, password, role);
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
