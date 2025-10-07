import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const getStockStatus = (stock) => {
    if (stock > 10) return { text: `In Stock`, class: 'in-stock' };
    if (stock > 0) return { text: `Only ${stock} left`, class: 'low-stock' };
    return { text: 'Out of Stock', class: 'out-of-stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="artist">By {product.artist}</p>
        <p className="description">{product.description}</p>
        <p className="price">R{product.price.toFixed(2)}</p>
        
        <div className="stock-status">
          <span className={stockStatus.class}>{stockStatus.text}</span>
        </div>

        <button 
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;