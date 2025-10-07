import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ProductContext = createContext();

// Product Provider Component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('shopEasy_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initial demo products
      const demoProducts = [
        {
          id: 1,
          name: 'Wireless Headphones',
          price: 99.99,
          category: 'Electronics',
          stock: 15,
          image: '',
          supplierId: 1,
          description: 'High-quality wireless headphones with noise cancellation'
        },
        {
          id: 2,
          name: 'Smart Watch',
          price: 199.99,
          category: 'Electronics',
          stock: 8,
          image: '',
          supplierId: 1,
          description: 'Feature-rich smartwatch with health monitoring'
        }
      ];
      setProducts(demoProducts);
      localStorage.setItem('shopEasy_products', JSON.stringify(demoProducts));
    }
  }, []);

  // Add a new product
  const addProduct = (productData, supplierId) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      supplierId: supplierId,
      stock: parseInt(productData.stock),
      price: parseFloat(productData.price)
    };
    
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('shopEasy_products', JSON.stringify(updatedProducts));
    
    return newProduct;
  };

  // Update an existing product
  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('shopEasy_products', JSON.stringify(updatedProducts));
  };

  // Context value
  const value = {
    products,
    addProduct,
    updateProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the product context
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}