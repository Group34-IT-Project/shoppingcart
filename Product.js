import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  imageUrl: String,
  stockQuantity: { type: Number, default: 0 },
  vendorId: { type: String, required: true }
});

export default mongoose.model('Product', productSchema);