const storeService = require('../data/storeService');

// @desc    Get all coupons with search, filters, sorting & pagination
// @route   GET /api/coupons
exports.getCoupons = async (req, res) => {
  try {
    const {
      search,
      category,
      store,
      discountType,
      verifiedOnly,
      featuredOnly,
      sort,
      page,
      limit,
    } = req.query;

    const data = await storeService.getCoupons({
      search,
      category,
      store,
      discountType,
      verifiedOnly,
      featuredOnly,
      sort,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      count: data.coupons.length,
      total: data.total,
      page: data.page,
      totalPages: data.totalPages,
      data: data.coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving coupons',
      error: error.message,
    });
  }
};

// @desc    Get single coupon by ID
// @route   GET /api/coupons/:id
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await storeService.getCouponById(req.params.id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching coupon details',
      error: error.message,
    });
  }
};

// @desc    Create new coupon (Admin / Verified User)
// @route   POST /api/coupons
exports.createCoupon = async (req, res) => {
  try {
    const {
      title,
      code,
      discount,
      discountValue,
      discountType,
      description,
      storeName,
      storeLogo,
      categoryName,
      affiliateUrl,
      expiryDate,
      isVerified,
      isExclusive,
      isFeatured,
      terms,
      tags,
    } = req.body;

    if (!title || !discount || !storeName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, discount, and store name',
      });
    }

    const newCoupon = await storeService.createCoupon({
      title,
      code: code ? code.trim().toUpperCase() : '',
      discount,
      discountValue: Number(discountValue) || 0,
      discountType: discountType || 'percentage',
      description: description || '',
      storeName,
      storeLogo:
        storeLogo ||
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=128&auto=format&fit=crop&q=80',
      categoryName: categoryName || 'General',
      affiliateUrl: affiliateUrl || '',
      expiryDate: expiryDate ? new Date(expiryDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isVerified: isVerified !== undefined ? isVerified : true,
      isExclusive: !!isExclusive,
      isFeatured: !!isFeatured,
      terms: terms || 'Valid for a limited time at checkout.',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t) => t.trim()) : [storeName]),
    });

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: newCoupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create coupon',
      error: error.message,
    });
  }
};

// @desc    Update existing coupon
// @route   PUT /api/coupons/:id
exports.updateCoupon = async (req, res) => {
  try {
    const updated = await storeService.updateCoupon(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update coupon',
      error: error.message,
    });
  }
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
exports.deleteCoupon = async (req, res) => {
  try {
    const deleted = await storeService.deleteCoupon(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully',
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete coupon',
      error: error.message,
    });
  }
};

// @desc    Vote on coupon reliability (upvote / downvote)
// @route   POST /api/coupons/:id/vote
exports.voteCoupon = async (req, res) => {
  try {
    const { type } = req.body; // 'up' or 'down'
    if (!['up', 'down'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Vote type must be "up" or "down"',
      });
    }

    const updated = await storeService.voteCoupon(req.params.id, type);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `Vote recorded (${type})`,
      data: {
        upvotes: updated.upvotes,
        downvotes: updated.downvotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record vote',
      error: error.message,
    });
  }
};

// @desc    Track coupon copy action
// @route   POST /api/coupons/:id/copy
exports.copyCoupon = async (req, res) => {
  try {
    const updated = await storeService.copyCoupon(req.params.id);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Coupon copy recorded',
      data: {
        usedCount: updated.usedCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record copy count',
      error: error.message,
    });
  }
};

// @desc    Report / Flag invalid, duplicate, or fraudulent coupon
// @route   POST /api/coupons/:id/report
exports.reportCoupon = async (req, res) => {
  try {
    const { reason, details } = req.body;
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a report reason',
      });
    }

    const result = await storeService.reportCoupon(req.params.id, reason, details);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }

    res.status(200).json({
      success: true,
      message:
        result.status === 'flagged' || result.status === 'expired'
          ? 'Coupon has been flagged and removed from active deals.'
          : 'Thank you! Your report has been submitted for review.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit coupon report',
      error: error.message,
    });
  }
};
