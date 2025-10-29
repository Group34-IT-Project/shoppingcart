import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

// Create the context
const ProductContext = createContext();

// Product Provider Component
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Try to load from API first
        const apiProducts = await apiService.getProducts();
        console.log('Loaded products from API:', apiProducts.length);
        setProducts(apiProducts);
      } catch (error) {
        console.error('Failed to load products from API:', error);
        // Fallback to empty array instead of demo data
        // This ensures we don't mask API issues
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Add a new product
  const addProduct = async (productData, supplierId) => {
    try {
      const newProduct = {
        ...productData,
        supplierId: supplierId,
        stock: parseInt(productData.stock),
        price: parseFloat(productData.price),
        rating: 0,
        image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
      };

      const savedProduct = await apiService.createProduct(newProduct);
      const updatedProducts = [...products, savedProduct];
      setProducts(updatedProducts);

      return savedProduct;
    } catch (error) {
      console.error('Failed to add product:', error);
      // Fallback to local state if API fails
      const fallbackProduct = {
        ...productData,
        id: Date.now(),
        supplierId: supplierId,
        stock: parseInt(productData.stock),
        price: parseFloat(productData.price),
        rating: 0,
        image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
      };
      const updatedProducts = [...products, fallbackProduct];
      setProducts(updatedProducts);
      return fallbackProduct;
    }
  };

  // Update an existing product
  const updateProduct = async (productId, updates) => {
    try {
      const updatedProduct = await apiService.updateProduct(productId, updates);
      const updatedProducts = products.map(product =>
        product.id === productId ? updatedProduct : product
      );
      setProducts(updatedProducts);
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      // Fallback to local state if API fails
      const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      );
      setProducts(updatedProducts);
      return updatedProducts.find(p => p.id === productId);
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      await apiService.deleteProduct(productId);
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Failed to delete product:', error);
      // Fallback to local state if API fails
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
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
