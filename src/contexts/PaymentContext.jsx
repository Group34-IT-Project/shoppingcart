import React, { createContext } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const mockPaymentMethods = [];
  
  const value = {
    savePaymentMethod: async () => ({ id: 1, last4: '4242' }),
    getPaymentMethods: () => mockPaymentMethods,
    deletePaymentMethod: () => {}
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

// Remove usePayment from this file and place it in PaymentHook.js