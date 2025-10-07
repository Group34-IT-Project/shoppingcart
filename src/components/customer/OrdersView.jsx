import React from 'react';

const OrdersView = () => {
  return (
    <div className="orders-view">
      <h2>📦 My Orders</h2>
      <div className="no-orders">
        <p>You haven't placed any orders yet.</p>
        <p>Start shopping to see your orders here!</p>
      </div>
    </div>
  );
};

export default OrdersView;