const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Coupon title is required'],
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      default: '', // blank if it's a direct deal / no code needed
    },
    discount: {
      type: String,
      required: [true, 'Discount amount/percentage is required'],
      trim: true,
    },
    discountValue: {
      type: Number,
      default: 0, // Numerical value for sorting (e.g. 50 for 50%, 20 for $20)
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed', 'free_shipping', 'bogo', 'cashback'],
      default: 'percentage',
    },
    description: {
      type: String,
      default: '',
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: [true, 'Store reference is required'],
    },
    storeName: {
      type: String,
      required: true,
    },
    storeLogo: {
      type: String,
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
    },
    categoryName: {
      type: String,
      required: true,
    },
    affiliateUrl: {
      type: String,
      default: '',
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isExclusive: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    terms: {
      type: String,
      default: 'Valid for a limited time. Exclusions may apply at checkout.',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    reportCount: {
      type: Number,
      default: 0,
    },
    reports: [
      {
        reason: String,
        details: String,
        reportedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'expired', 'pending', 'rejected', 'flagged'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
CouponSchema.index({
  title: 'text',
  description: 'text',
  code: 'text',
  storeName: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Coupon', CouponSchema);
