import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // ← Updated import

const Header = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="app-header">
      <div className="header-left">
        <h1>🛍️ Group34 Online Shopping</h1>
        {user && user.role && (
          <span className="user-role-badge">
            {user.role === 'customer' ? '🛍️ Customer' : '🎨 Supplier'}
          </span>
        )}
      </div>
      
      {user && (
        <div className="header-right">
          <div className="user-menu">
            <button 
              className="user-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              👤 {user.name}
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <span className="role">{user.role}</span>
                </div>
                
                <button className="dropdown-item">
                  ⚙️ Account Settings
                </button>
                
                <button 
                  className="dropdown-item logout"
                  onClick={logout}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;