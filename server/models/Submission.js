const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, 'Store name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Deal title is required'],
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      default: '',
    },
    discount: {
      type: String,
      required: [true, 'Discount details are required'],
      trim: true,
    },
    categoryName: {
      type: String,
      default: 'General',
    },
    affiliateUrl: {
      type: String,
      default: '',
    },
    expiryDate: {
      type: Date,
    },
    submittedBy: {
      type: String,
      default: 'Community User',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Submission', SubmissionSchema);
