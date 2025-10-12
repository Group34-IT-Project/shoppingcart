import React, { useState } from 'react';
import { useAuth } from './contexts/useAuth';
import { useCart } from './contexts/CartContext';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToCart, getCartCount } = useCart();
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      category: 'Electronics',
      stock: 15,
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      category: 'Electronics',
      stock: 8,
      description: 'Feature-rich smartwatch with health monitoring'
    },
    {
      id: 3,
      name: 'Coffee Maker',
      price: 49.99,
      category: 'Home',
      stock: 0,
      description: 'Automatic coffee maker for your morning brew'
    }
  ]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleOrderSuccess = (order) => {
    setShowCheckout(false);
    setOrderConfirmation(order);
  };

  const handleCloseConfirmation = () => {
    setOrderConfirmation(null);
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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #eee' }}>
        <h1>🛒 ShopEasy</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => setShowCart(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            🛒 Cart
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
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
          <span>Welcome, <strong>{user?.name}</strong>!</span>
          <span style={{ padding: '5px 10px', backgroundColor: user?.type === 'supplier' ? '#ffc107' : '#007bff', color: user?.type === 'supplier' ? 'black' : 'white', borderRadius: '15px', fontSize: '12px' }}>
            {user?.type === 'supplier' ? 'Supplier' : 'Customer'}
          </span>
          <button onClick={logout} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      <div style={{ padding: '20px', backgroundColor: '#e8f5e8', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>🎉 Welcome to ShopEasy!</h2>
        <p>You are successfully logged in as {user?.name} ({user?.email})</p>
        {user?.type === 'supplier' && (
          <p><strong>Supplier Dashboard:</strong> You can add and manage products.</p>
        )}
      </div>

      <div>
        <h2>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>{product.name}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{product.category}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>${product.price}</p>
              <p style={{ color: product.stock > 10 ? '#28a745' : product.stock > 0 ? '#ffc107' : '#dc3545', fontWeight: 'bold' }}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
              <p>{product.description}</p>
              <button 
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: product.stock > 0 ? '#28a745' : '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  width: '100%'
                }}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} onCheckout={handleCheckout} />}
      {showCheckout && <Checkout onClose={() => setShowCheckout(false)} onSuccess={handleOrderSuccess} />}
      
      {/* Order Confirmation Modal */}
      {orderConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '40px',
            maxWidth: '500px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ color: '#28a745', marginBottom: '15px' }}>Order Placed Successfully!</h2>
            <p style={{ marginBottom: '10px' }}>Order ID: <strong>#{orderConfirmation.id}</strong></p>
            <p style={{ marginBottom: '20px' }}>Total: <strong>${orderConfirmation.total.toFixed(2)}</strong></p>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Your order is being processed. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={handleCloseConfirmation}
              style={{
                padding: '12px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;