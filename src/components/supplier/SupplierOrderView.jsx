import React, { useState } from 'react';
import { useSupplier } from '../../contexts/SupplierContext';

function SupplierOrderView() {
  const { supplierOrders, updateOrderStatus } = useSupplier();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = selectedStatus === 'all'
    ? supplierOrders
    : supplierOrders.filter(order => order.status === selectedStatus);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#fef3c7'; // yellow
      case 'processing': return '#dbeafe'; // blue
      case 'shipped': return '#d1fae5'; // green
      case 'delivered': return '#d1fae5'; // green
      case 'cancelled': return '#fee2e2'; // red
      default: return '#f3f4f6'; // gray
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'pending': return '#92400e';
      case 'processing': return '#1e40af';
      case 'shipped': return '#065f46';
      case 'delivered': return '#065f46';
      case 'cancelled': return '#991b1b';
      default: return '#374151';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Order Management</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontWeight: '500' }}>Filter by Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              outline: 'none'
            }}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOrders.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '48px',
            textAlign: 'center',
            color: '#6b7280',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            {selectedStatus === 'all'
              ? 'No orders found. Orders will appear here when customers purchase your products.'
              : `No ${selectedStatus} orders found.`
            }
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              {/* Order Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
                    {new Date(order.date).toLocaleDateString()} • {order.customerName}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>
                    R{order.total}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: getStatusColor(order.status),
                    color: getStatusTextColor(order.status),
                    marginTop: '4px'
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                  Items ({order.items.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '6px'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500' }}>{item.name}</div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          Quantity: {item.quantity} • R{item.price} each
                        </div>
                      </div>
                      <div style={{ fontWeight: '600' }}>
                        R{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '16px',
                borderRadius: '6px',
                marginBottom: '16px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  Customer Information
                </h4>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  <div>Name: {order.customerName}</div>
                  <div>Email: {order.customerEmail}</div>
                  <div>Phone: {order.customerPhone}</div>
                  <div>Address: {order.shippingAddress}</div>
                </div>
              </div>

              {/* Status Update */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <div>
                  <label style={{ fontWeight: '500', marginRight: '8px' }}>Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      outline: 'none'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Last updated: {new Date(order.lastUpdated || order.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SupplierOrderView;
