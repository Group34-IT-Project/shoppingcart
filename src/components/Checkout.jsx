import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/useAuth';

function Checkout({ onClose, onSuccess }) {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);

  // Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'South Africa'
  });

  // Payment Information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card' // card, paypal, cash
  });

  const [errors, setErrors] = useState({});

  // Validate Shipping Info
  const validateShipping = () => {
    const newErrors = {};
    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Payment Info
  const validatePayment = () => {
    if (paymentInfo.paymentMethod === 'cash') return true;

    const newErrors = {};
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Step
  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const order = {
        id: Date.now(),
        items: cart,
        total: getCartTotal(),
        shipping: shippingInfo,
        payment: paymentInfo.paymentMethod,
        status: 'Processing',
        date: new Date().toISOString()
      };

      // Save order to user
      const userOrders = user?.orders || [];
      updateUser({ orders: [...userOrders, order] });

      // Clear cart
      clearCart();
      
      setLoading(false);
      
      // Show success
      if (onSuccess) {
        onSuccess(order);
      } else {
        alert('Order placed successfully! Order ID: ' + order.id);
        onClose();
      }
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + shipping + tax;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '1000px',
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
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Checkout</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '4px 8px'
            }}
          >
            ×
          </button>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          gap: '16px'
        }}>
          {['Shipping', 'Payment', 'Review'].map((label, index) => (
            <div key={label} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step > index + 1 ? '#10b981' : step === index + 1 ? '#2563eb' : '#e5e7eb',
                color: step >= index + 1 ? 'white' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span style={{
                fontWeight: step === index + 1 ? 'bold' : 'normal',
                color: step >= index + 1 ? '#111827' : '#6b7280'
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Main Content */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                  Shipping Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.fullName ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.fullName && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.fullName}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.email ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.email && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.phone ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.phone && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.phone}</span>}
                  </div>

                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.address ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.address && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.address}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.city ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.city && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.city}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Zip/Postal Code *
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: errors.zipCode ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                    {errors.zipCode && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.zipCode}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                  Payment Method
                </h3>

                {/* Payment Method Selection */}
                <div style={{ marginBottom: '24px', display: 'flex', gap: '12px' }}>
                  {[
                    { value: 'card', label: '💳 Credit Card', icon: '💳' },
                    { value: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { value: 'cash', label: 'Cash on Delivery', icon: '💵' }
                  ].map(method => (
                    <button
                      key={method.value}
                      onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: method.value })}
                      style={{
                        flex: 1,
                        padding: '16px',
                        border: paymentInfo.paymentMethod === method.value ? '2px solid #2563eb' : '1px solid #d1d5db',
                        borderRadius: '8px',
                        backgroundColor: paymentInfo.paymentMethod === method.value ? '#eff6ff' : 'white',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Card Payment Form */}
                {paymentInfo.paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        Card Number *
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.cardNumber ? '2px solid #dc2626' : '1px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none'
                        }}
                      />
                      {errors.cardNumber && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.cardNumber}</span>}
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: errors.cardName ? '2px solid #dc2626' : '1px solid #d1d5db',
                          borderRadius: '8px',
                          outline: 'none'
                        }}
                      />
                      {errors.cardName && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.cardName}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.expiryDate ? '2px solid #dc2626' : '1px solid #d1d5db',
                            borderRadius: '8px',
                            outline: 'none'
                          }}
                        />
                        {errors.expiryDate && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.expiryDate}</span>}
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                          CVV *
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="4"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: errors.cvv ? '2px solid #dc2626' : '1px solid #d1d5db',
                            borderRadius: '8px',
                            outline: 'none'
                          }}
                        />
                        {errors.cvv && <span style={{ color: '#dc2626', fontSize: '14px' }}>{errors.cvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentInfo.paymentMethod === 'paypal' && (
                  <div style={{
                    padding: '24px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ marginBottom: '16px' }}>You will be redirected to PayPal to complete your purchase.</p>
                    <button style={{
                      padding: '12px 32px',
                      backgroundColor: '#0070ba',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}>
                      Continue with PayPal
                    </button>
                  </div>
                )}

                {paymentInfo.paymentMethod === 'cash' && (
                  <div style={{
                    padding: '24px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #86efac'
                  }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>💵 Cash on Delivery</h4>
                    <p>Pay with cash when your order is delivered to your doorstep.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                  Review Your Order
                </h3>

                {/* Shipping Info Review */}
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Shipping Address</h4>
                  <p style={{ margin: 0, lineHeight: '1.6' }}>
                    {shippingInfo.fullName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                    {shippingInfo.country}<br />
                    {shippingInfo.phone}
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      marginTop: '8px',
                      color: '#2563eb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Edit
                  </button>
                </div>

                {/* Payment Method Review */}
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Payment Method</h4>
                  <p style={{ margin: 0 }}>
                    {paymentInfo.paymentMethod === 'card' && '💳 Credit Card ending in ' + paymentInfo.cardNumber.slice(-4)}
                    {paymentInfo.paymentMethod === 'paypal' && '🅿️ PayPal'}
                    {paymentInfo.paymentMethod === 'cash' && '💵 Cash on Delivery'}
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      marginTop: '8px',
                      color: '#2563eb',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Edit
                  </button>
                </div>

                {/* Order Items */}
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Order Items</h4>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <img src={item.image} alt={item.name} style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }} />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ margin: 0, fontWeight: '600' }}>{item.name}</h5>
                        <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '14px' }}>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#2563eb' }}>
                        R{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div style={{
            width: '320px',
            borderLeft: '1px solid #e5e7eb',
            padding: '24px',
            backgroundColor: '#f9fafb',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax (15%)</span>
                <span>R{tax.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '2px solid #d1d5db',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                <span>Total</span>
                <span style={{ color: '#2563eb' }}>R{total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 100 && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                💡 Add R{(100 - subtotal).toFixed(2)} more for free shipping!
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  style={{
                    padding: '12px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Continue to {step === 1 ? 'Payment' : 'Review'}
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    padding: '12px',
                    backgroundColor: loading ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              )}

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;