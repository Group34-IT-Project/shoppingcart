import React, { useState } from 'react';
import { useAuth } from './contexts/useAuth';
import { useCart } from './contexts/CartContext';
import { useProducts } from './contexts/ProductContext';
import { useSupplier } from './contexts/SupplierContext';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Cart from './components/Cart.jsx';
import CustomerApp from './components/customer/CustomerApp.jsx';
import SupplierApp from './components/supplier/SupplierApp.jsx';
import RoleSelection from './components/auth/RoleSelection.jsx';

function App() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToCart, getCartCount } = useCart();
  const { products } = useProducts();
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [activeTab, setActiveTab] = useState('marketplace'); // for customer/supplier apps

  const categories = ['All Products', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  // Show role selection if user doesn't have a type set
  if (isAuthenticated && !user?.type) {
    return <RoleSelection onRoleSelected={() => setShowRoleSelection(false)} />;
  }

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register
        onSwitchToLogin={() => setShowRegister(false)}
        onSwitchToRoleSelection={() => setShowRoleSelection(true)}
      />
    ) : showRoleSelection ? (
      <RoleSelection onRoleSelected={() => setShowRoleSelection(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  // Role-based routing: show different apps based on user type
  if (user?.type === 'supplier') {
    return <SupplierApp activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  // Default to customer marketplace
  return (
    <CustomerApp activeTab={activeTab} setActiveTab={setActiveTab} />
  );
}

export default App;