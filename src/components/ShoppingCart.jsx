import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'; // ← Updated import
import { PaymentProvider } from '../contexts/PaymentContext';
import AuthSection from './auth/AuthSection';
import RoleSelection from './auth/RoleSelection';
import Header from './layout/Header';
import CustomerApp from './customer/CustomerApp';
import SupplierApp from './supplier/SupplierApp';
import LoadingSpinner from './shared/LoadingSpinner';

const ShoppingCart = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('marketplace');

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthSection />;
  }

  if (!user.role) {
    return <RoleSelection />;
  }

  return (
    <PaymentProvider>
      <div className="shopping-cart-container">
        <Header />
        
        {user.role === 'customer' && (
          <CustomerApp activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        
        {user.role === 'supplier' && (
          <SupplierApp activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </PaymentProvider>
  );
};

export default ShoppingCart;