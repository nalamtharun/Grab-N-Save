const storeService = require('../data/storeService');

// @desc    Get all stores with offer count
// @route   GET /api/stores
exports.getStores = async (req, res) => {
  try {
    const stores = await storeService.getStores();
    const allCoupons = (await storeService.getCoupons({ limit: 1000 })).coupons;

    const enrichedStores = stores.map((store) => {
      const activeDeals = allCoupons.filter(
        (c) => c.storeName.toLowerCase() === store.name.toLowerCase()
      ).length;
      return {
        ...store.toObject ? store.toObject() : store,
        activeDeals,
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedStores.length,
      data: enrichedStores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stores',
      error: error.message,
    });
  }
};

// @desc    Get store by slug with active coupons
// @route   GET /api/stores/:slug
exports.getStoreBySlug = async (req, res) => {
  try {
    const store = await storeService.getStoreBySlug(req.params.slug);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found',
      });
    }

    const { coupons } = await storeService.getCoupons({
      store: store.name,
      limit: 100,
    });

    res.status(200).json({
      success: true,
      data: {
        store,
        coupons,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch store details',
      error: error.message,
    });
  }
};
