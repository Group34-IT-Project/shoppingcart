import React, { useState, useEffect } from 'react';
import { usePayment } from '../../contexts/PaymentContext';

const PaymentMethodsView = () => {
  const { getPaymentMethods, deletePaymentMethod } = usePayment();
  const [savedMethods, setSavedMethods] = useState([]);

  useEffect(() => {
    setSavedMethods(getPaymentMethods());
  }, [getPaymentMethods]);

  const handleDelete = (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      deletePaymentMethod(paymentId);
      setSavedMethods(getPaymentMethods());
    }
  };

  return (
    <div className="payment-methods-view">
      <div className="section-header">
        <h2>💳 Payment Methods</h2>
        <button className="add-payment-btn">
          + Add New Card
        </button>
      </div>

      <div className="security-notice">
        <h4>🔒 Your Payment Security</h4>
        <p>We use tokenization to protect your card details. Your actual card numbers are never stored on our servers.</p>
      </div>

      <div className="saved-methods">
        <h3>Your Saved Cards</h3>
        {savedMethods.length === 0 ? (
          <p className="no-cards">No saved payment methods</p>
        ) : (
          savedMethods.map(method => (
            <div key={method.id} className="saved-card">
              <div className="card-info">
                <div className="card-brand">{method.brand}</div>
                <div className="card-number">•••• •••• •••• {method.last4}</div>
                <div className="card-expiry">Expires {method.expMonth}/{method.expYear}</div>
              </div>
              <button 
                className="delete-card-btn"
                onClick={() => handleDelete(method.id)}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsView;