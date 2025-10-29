import React, { useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { useSupplier } from '../../contexts/SupplierContext';
import InventoryView from './InventoryView';
import SupplierOrderView from './SupplierOrderView';
import AnalyticsView from './AnalyticsView';

function SupplierApp({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();
  const { analytics } = useSupplier();
  const [currentView, setCurrentView] = useState('inventory');

  const tabs = [
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'inventory':
        return <InventoryView />;
      case 'orders':
        return <SupplierOrderView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <InventoryView />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ShopEasy Supplier
              </h1>
            </div>

            {/* User Info and Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px' }}>
                Welcome, <strong>{user?.name}</strong>
              </span>
              <button
                onClick={logout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Analytics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
              R{analytics.totalRevenue}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Revenue</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
              {analytics.totalProducts}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Products</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
              {analytics.totalOrders}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Orders</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
              {analytics.averageRating}⭐
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Avg Rating</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px',
                  border: 'none',
                  backgroundColor: currentView === tab.id ? '#dbeafe' : 'transparent',
                  color: currentView === tab.id ? '#2563eb' : '#374151',
                  fontWeight: currentView === tab.id ? '600' : '400',
                  cursor: 'pointer',
                  borderRadius: currentView === tab.id ? '8px 8px 0 0' : '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '18px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '24px'
        }}>
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}

export default SupplierApp;
