const storeService = require('../data/storeService');

// @desc    Get aggregate platform metrics & discoverability stats
// @route   GET /api/stats
exports.getStats = async (req, res) => {
  try {
    const stats = await storeService.getStats();
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch platform stats',
      error: error.message,
    });
  }
};
