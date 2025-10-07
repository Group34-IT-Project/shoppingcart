;import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // ← Updated import

const RoleSelection = () => {
  const { updateUserRole, user } = useAuth();
  // ... rest of the code remains the same


  const selectRole = (role) => {
    updateUserRole(role);
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-card">
        <h2>Welcome to Group34{user.name ? `, ${user.name}` : ''}! 👋</h2>
        <p>How would you like to use our marketplace?</p>
        
        <div className="role-options">
          <div className="role-card" onClick={() => selectRole('customer')}>
            <div className="role-icon">🛍️</div>
            <h3>Customer</h3>
            <p>I want to shop from various sellers and creators</p>
            <ul>
              <li>Browse wide range of products</li>
              <li>Support local businesses</li>
              <li>Save payment methods for faster checkout</li>
              <li>Track your orders</li>
            </ul>
            <button className="role-select-btn">Continue as Customer</button>
          </div>
          
          <div className="role-card" onClick={() => selectRole('supplier')}>
            <div className="role-icon">🏪</div>
            <h3>Supplier</h3>
            <p>I want to sell products and manage my store</p>
            <ul>
              <li>List your products easily</li>
              <li>Manage inventory and stock</li>
              <li>Track sales and orders</li>
              <li>Reach more customers</li>
            </ul>
            <button className="role-select-btn">Continue as Supplier</button>
          </div>
        </div>
        
        <p className="role-note">
          You can change this later in your account settings
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;