import React, { useState, useEffect } from 'react';

const InventoryView = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Load sample inventory
    const sampleInventory = [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        stock: 15,
        category: "electronics"
      },
      {
        id: 2,
        name: "Organic Cotton T-Shirt",
        price: 24.99,
        stock: 8,
        category: "clothing"
      }
    ];
    setInventory(sampleInventory);
  }, []);

  return (
    <div className="inventory-view">
      <div className="inventory-header">
        <h2>📊 My Inventory</h2>
        <button className="add-product-btn">
          + Add New Product
        </button>
      </div>

      <div className="inventory-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{inventory.length}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p className="low-stock-count">0</p>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <p className="out-of-stock-count">0</p>
        </div>
      </div>

      <div className="inventory-list">
        <h3>Your Products</h3>
        {inventory.length === 0 ? (
          <p className="no-products">No products in inventory. Add your first product!</p>
        ) : (
          <div className="inventory-items">
            {inventory.map(product => (
              <div key={product.id} className="inventory-item">
                <div className="item-details">
                  <h4>{product.name}</h4>
                  <p className="category">Category: {product.category}</p>
                  <p className="price">R{product.price.toFixed(2)}</p>
                  <div className="stock-info">
                    <span className="stock-badge in-stock">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
                <div className="item-actions">
                  <button className="edit-btn">
                    Edit
                  </button>
                  <button className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryView;