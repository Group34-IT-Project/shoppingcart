// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const Product = require('./models/Product');
const User = require('./models/User');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// User routes
app.get('/api/users', async (req, res) => {
  try {
    // For now, return mock data - in production this would query MongoDB
    const mockUsers = [
      {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        type: 'customer',
        cart: [],
        orders: []
      }
    ];
    res.json(mockUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    // Convert MongoDB _id to id for frontend compatibility
    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      supplierId: product.supplierId,
      rating: product.rating,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new product
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    const savedProduct = await product.save();

    const formattedProduct = {
      id: savedProduct._id.toString(),
      name: savedProduct.name,
      price: savedProduct.price,
      category: savedProduct.category,
      stock: savedProduct.stock,
      image: savedProduct.image,
      supplierId: savedProduct.supplierId,
      rating: savedProduct.rating,
      description: savedProduct.description,
      createdAt: savedProduct.createdAt,
      updatedAt: savedProduct.updatedAt
    };

    res.status(201).json(formattedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const formattedProduct = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      supplierId: product.supplierId,
      rating: product.rating,
      description: product.description,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password: '***' }); // Don't log password in production

    // Mock authentication - in production this would validate against database
    if (email === 'demo@example.com' && password === 'password') {
      const user = {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        type: 'customer',
        cart: [],
        orders: []
      };
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const userData = req.body;
    // Mock registration - in production this would save to database
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      cart: [],
      orders: []
    };
    res.json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

console.log("Server is starting...");

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
