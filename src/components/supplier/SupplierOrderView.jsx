import React from 'react';

const SupplierOrdersView = () => {
  return (
    <div className="supplier-orders-view">
      <h2>📦 Customer Orders</h2>
      <div className="orders-placeholder">
        <p>Manage and fulfill customer orders here.</p>
        <p>When customers purchase your products, orders will appear here.</p>
        
        <div className="sample-orders">
          <h3>Sample Orders (Coming Soon)</h3>
          <div className="order-list">
            <div className="order-item">
              <p><strong>Order #001</strong> - Wireless Headphones</p>
              <p>Customer: John Doe</p>
              <p>Status: Pending</p>
            </div>
            <div className="order-item">
              <p><strong>Order #002</strong> - Cotton T-Shirt</p>
              <p>Customer: Jane Smith</p>
              <p>Status: Processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrdersView;