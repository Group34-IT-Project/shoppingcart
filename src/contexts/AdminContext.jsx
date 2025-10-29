import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import apiService from '../services/api';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalSuppliers: 0,
    totalAdmins: 0,
    recentRegistrations: 0
  });

  // Load all users when admin logs in
  useEffect(() => {
    if (user && user.type === 'admin') {
      loadAllUsers();
    }
  }, [user]);

  // Load all users from API
  const loadAllUsers = async () => {
    try {
      setLoading(true);
      const users = await apiService.getUsers();
      setAllUsers(users);
      calculateStats(users);
    } catch (error) {
      console.error('Failed to load users:', error);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate admin statistics
  const calculateStats = (users) => {
    const totalUsers = users.length;
    const totalCustomers = users.filter(u => u.type === 'customer').length;
    const totalSuppliers = users.filter(u => u.type === 'supplier').length;
    const totalAdmins = users.filter(u => u.type === 'admin').length;

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = users.filter(u =>
      new Date(u.createdAt) > thirtyDaysAgo
    ).length;

    setStats({
      totalUsers,
      totalCustomers,
      totalSuppliers,
      totalAdmins,
      recentRegistrations
    });
  };

  // Get users by type
  const getUsersByType = (type) => {
    return allUsers.filter(user => user.type === type);
  };

  // Get recent registrations
  const getRecentRegistrations = (days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return allUsers
      .filter(user => new Date(user.createdAt) > cutoffDate)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const value = {
    allUsers,
    stats,
    loading,
    loadAllUsers,
    getUsersByType,
    getRecentRegistrations
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
