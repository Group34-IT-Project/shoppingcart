import express from 'express';

const router = express.Router();

// Test route - like a doorbell
router.get('/test', (req, res) => {
  res.json({ message: 'User door is working! 🚪' });
});

export default router;