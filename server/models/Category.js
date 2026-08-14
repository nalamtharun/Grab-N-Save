const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
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
    icon: {
      type: String,
      default: 'Tag',
    },
    description: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#10B981',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Category', CategorySchema);
