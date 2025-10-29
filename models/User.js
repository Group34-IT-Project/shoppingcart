const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['customer', 'supplier'],
    default: 'customer'
  },
  cart: [{
    productId: Number,
    quantity: Number
  }],
  orders: [{
    id: Number,
    items: [{
      productId: Number,
      quantity: Number,
      price: Number
    }],
    total: Number,
    status: String,
    createdAt: Date
  }],
  // Supplier-specific fields
  businessName: {
    type: String,
    trim: true
  },
  businessDescription: {
    type: String,
    trim: true
  },
  supplierOrders: [{
    id: Number,
    customerId: Number,
    items: [{
      productId: Number,
      quantity: Number,
      price: Number
    }],
    total: Number,
    status: String,
    createdAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
