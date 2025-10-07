import React, { useState } from 'react';
import MarketplaceView from './MarketplaceView';
import OrdersView from './OrdersView';
import PaymentMethodsView from './PaymentMethodsView';

const CustomerApp = ({ activeTab, setActiveTab }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="customer-app">
      <div className="navigation-tabs">
        <button 
          className={`tab-btn ${activeTab === 'marketplace' ? 'active' : ''}`}
          onClick={() => setActiveTab('marketplace')}
        >
          🛍️ Marketplace
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 My Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          💳 Payment Methods
        </button>
      </div>

      {activeTab === 'marketplace' && (
        <MarketplaceView 
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}
      {activeTab === 'orders' && <OrdersView />}
      {activeTab === 'payments' && <PaymentMethodsView />}
    </div>
  );
};

export default CustomerApp;