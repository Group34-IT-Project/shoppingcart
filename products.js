import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Test route - product doorbell
router.get('/test', (req, res) => {
  res.json({ message: 'Product door is working! 🎁' });
});

// Add new product - like adding a new toy to the toy box
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      vendorId: req.body.vendorId
    });
    
    const savedProduct = await newProduct.save();
    res.json({ message: 'New toy added to box! 🎁', product: savedProduct });
  } catch (error) {
    res.json({ message: 'Oops! Could not add toy 😢', error: error.message });
  }
});

export default router;