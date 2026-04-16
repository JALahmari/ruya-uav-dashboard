import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Mock users database - in production this would be a real database
  const [mockUsers, setMockUsers] = useState({
    admin: { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' },
    operator: { username: 'operator', password: 'op123', role: 'operator', name: 'UAV Operator' }
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("ruya_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("ruya_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulate authentication
    const { username, password } = credentials;
    
    const foundUser = mockUsers[username];
    if (foundUser && foundUser.password === password) {
      const userSession = {
        id: Date.now(),
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        loginTime: new Date().toISOString()
      };
      
      setUser(userSession);
      localStorage.setItem("ruya_user", JSON.stringify(userSession));
      return { success: true, user: userSession };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ruya_user");
  };

  const addOperator = (operatorData) => {
    const { username, password, name } = operatorData;
    
    // Check if username already exists
    if (mockUsers[username]) {
      return { success: false, error: "Username already exists" };
    }

    // Add new operator
    const newOperator = {
      username,
      password,
      role: 'operator',
      name
    };

    setMockUsers(prev => ({
      ...prev,
      [username]: newOperator
    }));

    return { success: true, operator: newOperator };
  };

  const removeOperator = (username) => {
    // Prevent removing admin
    if (mockUsers[username]?.role === 'admin') {
      return { success: false, error: "Cannot remove admin users" };
    }

    const updatedUsers = { ...mockUsers };
    delete updatedUsers[username];
    setMockUsers(updatedUsers);

    return { success: true };
  };

  const getOperators = () => {
    return Object.values(mockUsers).filter(u => u.role === 'operator');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    addOperator,
    removeOperator,
    getOperators
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};