import React from 'react';
import { useCart } from '../contexts/CartContext';

function Cart({ onClose, onCheckout }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Shopping Cart</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      padding: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Shopping Cart ({cart.length})</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cart.map(item => (
          <div key={item.id} style={{
            padding: '15px',
            borderBottom: '1px solid #eee',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                🗑️
              </button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  borderRadius: '3px'
                }}
              >
                -
              </button>
              <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                style={{
                  padding: '5px 10px',
                  border: '1px solid #ddd',
                  backgroundColor: item.quantity >= item.stock ? '#eee' : 'white',
                  cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                  borderRadius: '3px'
                }}
              >
                +
              </button>
              <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '2px solid #eee',
        paddingTop: '15px',
        marginTop: '15px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        
        <button
          onClick={clearCart}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          Clear Cart
        </button>
        
        <button
          onClick={onCheckout}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;