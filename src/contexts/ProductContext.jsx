import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ProductContext = createContext();

// Product Provider Component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Load products from memory on component mount
  useEffect(() => {
    // Initial demo products with images
    const demoProducts = [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        category: 'Electronics',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        supplierId: 1,
        rating: 4.5,
        description: 'High-quality wireless headphones with noise cancellation'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        category: 'Electronics',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        supplierId: 1,
        rating: 4.8,
        description: 'Feature-rich smartwatch with health monitoring'
      },
      {
        id: 3,
        name: 'Designer Sunglasses',
        price: 149.99,
        category: 'Fashion',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        supplierId: 1,
        rating: 4.3,
        description: 'Stylish sunglasses with UV protection'
      },
      {
        id: 4,
        name: 'Leather Backpack',
        price: 89.99,
        category: 'Fashion',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        supplierId: 1,
        rating: 4.6,
        description: 'Durable leather backpack for everyday use'
      },
      {
        id: 5,
        name: 'Running Shoes',
        price: 129.99,
        category: 'Sports',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        supplierId: 1,
        rating: 4.7,
        description: 'Comfortable running shoes for athletes'
      },
      {
        id: 6,
        name: 'Coffee Maker',
        price: 79.99,
        category: 'Home & Living',
        stock: 0,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
        supplierId: 1,
        rating: 4.4,
        description: 'Automatic coffee maker for perfect brews'
      }
    ];
    setProducts(demoProducts);
  }, []);

  // Add a new product
  const addProduct = (productData, supplierId) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      supplierId: supplierId,
      stock: parseInt(productData.stock),
      price: parseFloat(productData.price),
      rating: 0,
      image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);

    return newProduct;
  };

  // Update an existing product
  const updateProduct = (productId, updates) => {
    const updatedProducts = products.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
  };

  // Delete a product
  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  // Context value
  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct
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
