import React from 'react';
import ProductCard from './ProductCard';

const MarketplaceView = ({ setCartItems }) => {
  const sampleProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      artist: "TechGadgets Inc",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      category: "electronics",
      stock: 15,
      description: "High-quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 24.99,
      artist: "EcoWear Fashion",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      category: "clothing",
      stock: 8,
      description: "Comfortable organic cotton t-shirt in various colors"
    },
    {
      id: 3,
      name: "Stainless Steel Water Bottle",
      price: 29.99,
      artist: "HydroLife",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
      category: "lifestyle",
      stock: 20,
      description: "Keep your drinks hot or cold for hours"
    }
  ];

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert('Sorry, this item is out of stock!');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert(`Only ${product.stock} items available in stock!`);
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="marketplace-view">
      <div className="products-grid">
        <h2>🛍️ Group34 Marketplace</h2>
        <p className="marketplace-subtitle">Discover amazing products from our sellers</p>
        <div className="products">
          {sampleProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceView;