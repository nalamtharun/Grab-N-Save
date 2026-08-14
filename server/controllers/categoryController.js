const storeService = require('../data/storeService');

// @desc    Get all categories with coupon count
// @route   GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await storeService.getCategories();
    const allCoupons = (await storeService.getCoupons({ limit: 1000 })).coupons;

    const enrichedCategories = categories.map((cat) => {
      const dealCount = allCoupons.filter(
        (c) => c.categoryName.toLowerCase() === cat.name.toLowerCase()
      ).length;
      return {
        ...cat.toObject ? cat.toObject() : cat,
        dealCount,
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedCategories.length,
      data: enrichedCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};
