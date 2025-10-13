import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Checkout from './Checkout';

function Cart({ onClose }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutSuccess = (order) => {
    alert(`Order placed successfully!\nOrder ID: ${order.id}\nTotal: R${order.total.toFixed(2)}`);
    setShowCheckout(false);
    onClose();
  };

  if (showCheckout) {
    return <Checkout onClose={() => setShowCheckout(false)} onSuccess={handleCheckoutSuccess} />;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Shopping Cart</h2>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0' }}>
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '4px 8px',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '8px' }}>Your cart is empty</p>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>Add some products to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} 
                  />
                  
                  {/* Product Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                        {item.category}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity Controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '18px'
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontWeight: '600', fontSize: '16px', minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: item.quantity >= item.stock ? '#e5e7eb' : '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            color: item.quantity >= item.stock ? '#9ca3af' : '#000'
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price and Remove */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
                          R{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: '24px',
            borderTop: '2px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            {/* Subtotal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '16px', color: '#6b7280' }}>Subtotal</span>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>R{getCartTotal().toFixed(2)}</span>
            </div>

            {/* Shipping Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Shipping</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>
                {getCartTotal() > 100 ? 'FREE' : 'Calculated at checkout'}
              </span>
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                R{getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Free Shipping Banner */}
            {getCartTotal() < 100 && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                💡 Add <strong>R{(100 - getCartTotal()).toFixed(2)}</strong> more for free shipping!
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={() => setShowCheckout(true)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping Link */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                marginTop: '12px',
                padding: '12px',
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;