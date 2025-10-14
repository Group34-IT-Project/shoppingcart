import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Order door is working! 🚚' });
});

export default router;