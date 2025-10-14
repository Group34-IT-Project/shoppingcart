import express from 'express';

const router = express.Router();

// Test route - product doorbell
router.get('/test', (req, res) => {
  res.json({ message: 'Product door is working! 🎁' });
});

// Add new product - like adding a new toy to the toy box (mock response)
router.post('/add', async (req, res) => {
  try {
    const mockProduct = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      vendorId: req.body.vendorId,
      createdAt: new Date()
    };

    res.json({ message: 'New toy added to box! 🎁', product: mockProduct });
  } catch (error) {
    res.json({ message: 'Oops! Could not add toy 😢', error: error.message });
  }
});

export default router;
