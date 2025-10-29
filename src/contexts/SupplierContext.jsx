import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useProducts } from './ProductContext';

const SupplierContext = createContext();

export function SupplierProvider({ children }) {
  const { user, updateUser } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [supplierOrders, setSupplierOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalProducts: 0,
    totalOrders: 0,
    averageRating: 0
  });

  // Load supplier data when user changes
  useEffect(() => {
    if (user && user.type === 'supplier') {
      // Load supplier's products
      const userProducts = products.filter(p => p.supplierId === user.id);
      setSupplierProducts(userProducts);

      // Load supplier's orders (from all orders that contain their products)
      const userOrders = user.supplierOrders || [];
      setSupplierOrders(userOrders);

      // Calculate analytics
      calculateAnalytics(userProducts, userOrders);
    } else {
      setSupplierProducts([]);
      setSupplierOrders([]);
    }
  }, [user, products]);

  // Calculate analytics data
  const calculateAnalytics = (products, orders) => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const averageRating = products.length > 0
      ? products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length
      : 0;

    setAnalytics({
      totalRevenue,
      totalProducts,
      totalOrders,
      averageRating: Math.round(averageRating * 10) / 10
    });
  };

  // Add new product to supplier's inventory
  const addSupplierProduct = (productData) => {
    const newProduct = addProduct(productData, user.id);
    setSupplierProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  // Update supplier's product
  const updateSupplierProduct = (productId, updates) => {
    updateProduct(productId, updates);
    setSupplierProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, ...updates } : p)
    );
  };

  // Delete supplier's product
  const deleteSupplierProduct = (productId) => {
    deleteProduct(productId);
    setSupplierProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = supplierOrders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setSupplierOrders(updatedOrders);

    // Update in user data
    updateUser({ supplierOrders: updatedOrders });
  };

  // Get low stock products
  const getLowStockProducts = (threshold = 5) => {
    return supplierProducts.filter(p => p.stock <= threshold);
  };

  // Get out of stock products
  const getOutOfStockProducts = () => {
    return supplierProducts.filter(p => p.stock === 0);
  };

  const value = {
    supplierProducts,
    supplierOrders,
    analytics,
    addSupplierProduct,
    updateSupplierProduct,
    deleteSupplierProduct,
    updateOrderStatus,
    getLowStockProducts,
    getOutOfStockProducts
  };

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
}

export function useSupplier() {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a SupplierProvider');
  }
  return context;
}
