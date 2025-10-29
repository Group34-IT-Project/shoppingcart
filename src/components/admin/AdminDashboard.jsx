import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';

function AdminDashboard() {
  const { allUsers, stats, getRecentRegistrations, getUsersByType } = useAdmin();

  const recentRegistrations = getRecentRegistrations(30);
  const customers = getUsersByType('customer');
  const suppliers = getUsersByType('supplier');
  const admins = getUsersByType('admin');

  // Calculate registration trends (last 7 days vs previous 7 days)
  const last7Days = getRecentRegistrations(7);
  const previous7Days = allUsers.filter(user => {
    const userDate = new Date(user.createdAt);
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    return userDate >= fourteenDaysAgo && userDate < sevenDaysAgo;
  });

  const trend = last7Days.length - previous7Days.length;
  const trendPercentage = previous7Days.length > 0
    ? ((trend / previous7Days.length) * 100).toFixed(1)
    : 0;

  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Admin Dashboard</h2>

      {/* Registration Trend */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          Registration Trend (Last 7 Days)
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
            {last7Days.length}
          </div>
          <div>
            <div style={{
              color: trend >= 0 ? '#059669' : '#dc2626',
              fontWeight: '600'
            }}>
              {trend >= 0 ? '+' : ''}{trend} ({trend >= 0 ? '+' : ''}{trendPercentage}%)
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              vs previous 7 days
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* User Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            User Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Customers</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '100px',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${stats.totalUsers > 0 ? (customers.length / stats.totalUsers) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px'
                  }} />
                </div>
                <span style={{ fontWeight: '500', minWidth: '30px' }}>{customers.length}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Suppliers</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '100px',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${stats.totalUsers > 0 ? (suppliers.length / stats.totalUsers) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: '#10b981',
                    borderRadius: '4px'
                  }} />
                </div>
                <span style={{ fontWeight: '500', minWidth: '30px' }}>{suppliers.length}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Admins</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '100px',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${stats.totalUsers > 0 ? (admins.length / stats.totalUsers) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: '#f59e0b',
                    borderRadius: '4px'
                  }} />
                </div>
                <span style={{ fontWeight: '500', minWidth: '30px' }}>{admins.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Registrations */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
            Recent Registrations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentRegistrations.length === 0 ? (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>
                No recent registrations
              </p>
            ) : (
              recentRegistrations.slice(0, 5).map((user) => (
                <div key={user.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: user.type === 'customer' ? '#3b82f6' :
                                   user.type === 'supplier' ? '#10b981' : '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', fontSize: '14px' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)} • {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* All Users Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
          All Users ({stats.totalUsers})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Registered</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                allUsers.slice(0, 10).map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{user.name}</td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: user.type === 'customer' ? '#dbeafe' :
                                       user.type === 'supplier' ? '#d1fae5' : '#fef3c7',
                        color: user.type === 'customer' ? '#1e40af' :
                              user.type === 'supplier' ? '#065f46' : '#92400e'
                      }}>
                        {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {allUsers.length > 10 && (
          <div style={{ textAlign: 'center', marginTop: '16px', color: '#6b7280' }}>
            Showing 10 of {allUsers.length} users
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
