import React, { useState } from 'react';
import { useAuth } from './contexts/useAuth';
import { useCart } from './contexts/CartContext';
import { useProducts } from './contexts/ProductContext';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Cart from './components/Cart.jsx';

function App() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToCart, getCartCount } = useCart();
  const { products } = useProducts();
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const categories = ['All Products', 'Electronics', 'Fashion', 'Home & Living', 'Sports', 'Beauty'];

  const filteredProducts = selectedCategory === 'All Products' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  // Main app for authenticated users
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
            {/* Logo and Menu Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  display: window.innerWidth < 1024 ? 'block' : 'none',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
              >
                ☰
              </button>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ShopEasy
              </h1>
            </div>

            {/* Search Bar */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              flex: 1, 
              maxWidth: '600px', 
              margin: '0 32px',
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Search products..."
                style={{
                  width: '100%',
                  padding: '8px 8px 8px 40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', color: '#9ca3af' }}>🔍</span>
            </div>

            {/* Icons and User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px' }}>
                Welcome, <strong>{user?.name}</strong>
              </span>
              <button style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '8px',
                position: 'relative'
              }}>
                ❤️
              </button>
              <button
                onClick={() => setShowCart(true)}
                style={{
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  position: 'relative'
                }}
              >
                🛒
                {getCartCount() > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {getCartCount()}
                  </span>
                )}
              </button>
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

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Desktop Sidebar */}
          <aside style={{
            display: window.innerWidth >= 1024 ? 'block' : 'none',
            width: '256px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '24px',
            height: 'fit-content',
            position: 'sticky',
            top: '80px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Categories
            </h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === category ? '#dbeafe' : 'transparent',
                    color: selectedCategory === category ? '#2563eb' : '#374151',
                    fontWeight: selectedCategory === category ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </nav>

            {/* Filters */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Price Range</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Under R50', 'R50 - R100', 'R100 - R200', 'Over R200'].map(range => (
                  <label key={range} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: '14px' }}>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Rating</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[5, 4, 3].map(stars => (
                  <label key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: '14px' }}>{'⭐'.repeat(stars)} & Up</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              style={{
                display: window.innerWidth < 1024 ? 'block' : 'none',
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 30
              }}
            >
              <aside
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '256px',
                  backgroundColor: 'white',
                  padding: '24px',
                  overflowY: 'auto'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Categories</h2>
                  <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>
                    ×
                  </button>
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSidebarOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: selectedCategory === category ? '#dbeafe' : 'transparent',
                        color: selectedCategory === category ? '#2563eb' : '#374151',
                        fontWeight: selectedCategory === category ? '600' : '400'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </aside>
            </div>
          )}

          {/* Main Product Area */}
          <main style={{ flex: 1 }}>
            {/* Banner */}
            <div style={{
              background: 'linear-gradient(to right, #2563eb, #9333ea)',
              borderRadius: '8px',
              padding: '32px',
              color: 'white',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                Summer Sale!
              </h2>
              <p style={{ fontSize: '18px', marginBottom: '16px' }}>
                Up to 50% off on selected items
              </p>
              <button style={{
                backgroundColor: 'white',
                color: '#2563eb',
                padding: '8px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer'
              }}>
                Shop Now
              </button>
            </div>

            {/* Products Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{selectedCategory}</h2>
            </div>

            {/* Products Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '256px', objectFit: 'cover' }}
                    />
                    <button style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      ❤️
                    </button>
                    {product.stock === 0 && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          fontWeight: 'bold'
                        }}>
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {product.category}
                    </p>
                    <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                      <span style={{ color: '#fbbf24' }}>{'⭐'.repeat(Math.floor(product.rating || 0))}</span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>({product.rating})</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                      {product.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                        R{product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: product.stock > 0 ? '#2563eb' : '#9ca3af',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
}

export default App;