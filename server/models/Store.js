const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Store name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'General',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Store', StoreSchema);
