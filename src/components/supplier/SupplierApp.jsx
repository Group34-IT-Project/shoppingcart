import React from 'react';
// Remove the problematic import temporarily
// import SupplierOrdersView from './SupplierOrdersView';
import AnalyticsView from './AnalyticsView';

const SupplierApp = ({ activeTab, setActiveTab }) => {
  return (
    <div className="supplier-app">
      <div className="navigation-tabs">
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📊 My Inventory
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Customer Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      {activeTab === 'inventory' && <div>Inventory Management Coming Soon</div>}
      {activeTab === 'orders' && <div>Order Management Coming Soon</div>}
      {activeTab === 'analytics' && <AnalyticsView />}
    </div>
  );
};

export default SupplierApp;