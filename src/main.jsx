import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { SupplierProvider } from './contexts/SupplierContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <SupplierProvider>
            <App />
          </SupplierProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
)
