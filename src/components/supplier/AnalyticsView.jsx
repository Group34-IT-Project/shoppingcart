import React from 'react';
import { useSupplier } from '../../contexts/SupplierContext';

function AnalyticsView() {
  const { analytics, supplierProducts, supplierOrders } = useSupplier();

  // Calculate additional analytics
  const recentOrders = supplierOrders.filter(order =>
    new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
  );

  const monthlyRevenue = recentOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = supplierOrders.length > 0
    ? supplierOrders.reduce((sum, order) => sum + order.total, 0) / supplierOrders.length
    : 0;

  const topSellingProducts = supplierProducts
    .map(product => {
      const productOrders = supplierOrders.flatMap(order =>
        order.items.filter(item => item.productId === product.id)
      );
      const totalSold = productOrders.reduce((sum, item) => sum + item.quantity, 0);
      const revenue = productOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { ...product, totalSold, revenue };
    })
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  const orderStatusBreakdown = {
    pending: supplierOrders.filter(o => o.status === 'pending').length,
    processing: supplierOrders.filter(o => o.status === 'processing').length,
    shipped: supplierOrders.filter(o => o.status === 'shipped').length,
    delivered: supplierOrders.filter(o => o.status === 'delivered').length,
    cancelled: supplierOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Analytics Dashboard</h2>

      {/* Key Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
            R{monthlyRevenue.toFixed(2)}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Monthly Revenue</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
            R{averageOrderValue.toFixed(2)}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Avg Order Value</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
            {supplierOrders.filter(o => o.status === 'pending').length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending Orders</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
            {supplierProducts.filter(p => p.stock <= 5).length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Low Stock Items</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Order Status Breakdown */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Order Status Breakdown
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(orderStatusBreakdown).map(([status, count]) => (
              <div key={status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ textTransform: 'capitalize' }}>{status}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '100px',
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${supplierOrders.length > 0 ? (count / supplierOrders.length) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: status === 'pending' ? '#fbbf24' :
                                     status === 'processing' ? '#3b82f6' :
                                     status === 'shipped' ? '#10b981' :
                                     status === 'delivered' ? '#059669' : '#ef4444',
                      borderRadius: '4px'
                    }} />
                  </div>
                  <span style={{ fontWeight: '500', minWidth: '20px' }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Top Selling Products
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topSellingProducts.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                No sales data available yet
              </p>
            ) : (
              topSellingProducts.map((product, index) => (
                <div key={product.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {product.totalSold} sold • R{product.revenue.toFixed(2)} revenue
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Recent Orders (Last 30 Days)
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    No orders in the last 30 days
                  </td>
                </tr>
              ) : (
                recentOrders.slice(0, 10).map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>#{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.customerName}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: order.status === 'pending' ? '#fef3c7' :
                                       order.status === 'processing' ? '#dbeafe' :
                                       order.status === 'shipped' ? '#d1fae5' :
                                       order.status === 'delivered' ? '#d1fae5' : '#fee2e2',
                        color: order.status === 'pending' ? '#92400e' :
                              order.status === 'processing' ? '#1e40af' :
                              order.status === 'shipped' ? '#065f46' :
                              order.status === 'delivered' ? '#065f46' : '#991b1b'
                      }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontWeight: '600' }}>R{order.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsView;
