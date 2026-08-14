const { categoriesData, storesData, couponsData } = require('./seedData');
const Category = require('../models/Category');
const Store = require('../models/Store');
const Coupon = require('../models/Coupon');
const Submission = require('../models/Submission');
const { getIsConnected } = require('../config/db');

// In-memory runtime storage
let memoryCategories = [];
let memoryStores = [];
let memoryCoupons = [];
let memorySubmissions = [];

function initializeMemoryStore() {
  memoryCategories = categoriesData.map((cat, idx) => ({
    _id: `cat_${idx + 1}`,
    ...cat,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  memoryStores = storesData.map((store, idx) => ({
    _id: `store_${idx + 1}`,
    ...store,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  memoryCoupons = couponsData.map((c, idx) => {
    const storeObj = memoryStores.find((s) => s.slug === c.storeSlug) || memoryStores[0];
    const catObj = memoryCategories.find((cat) => cat.slug === c.categorySlug) || memoryCategories[0];
    return {
      _id: `coupon_${idx + 1}`,
      title: c.title,
      code: c.code,
      discount: c.discount,
      discountValue: c.discountValue,
      discountType: c.discountType,
      description: c.description,
      store: storeObj._id,
      storeName: storeObj.name,
      storeLogo: storeObj.logo,
      category: catObj._id,
      categoryName: catObj.name,
      affiliateUrl: c.affiliateUrl || storeObj.website,
      expiryDate: c.expiryDate,
      isVerified: c.isVerified,
      isExclusive: c.isExclusive,
      isFeatured: c.isFeatured,
      upvotes: c.upvotes || 0,
      downvotes: c.downvotes || 0,
      usedCount: c.usedCount || 0,
      terms: c.terms,
      tags: c.tags || [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  memorySubmissions = [];
}

// Initial call
initializeMemoryStore();

const storeService = {
  // CATEGORIES
  async getCategories() {
    if (getIsConnected()) {
      try {
        const count = await Category.countDocuments();
        if (count === 0) {
          await this.seedMongo();
        }
        return await Category.find().sort({ name: 1 });
      } catch (err) {
        console.warn('Falling back to memoryCategories:', err.message);
      }
    }
    return memoryCategories;
  },

  async getCategoryBySlug(slug) {
    if (getIsConnected()) {
      try {
        return await Category.findOne({ slug });
      } catch (err) {}
    }
    return memoryCategories.find((c) => c.slug === slug);
  },

  // STORES
  async getStores() {
    if (getIsConnected()) {
      try {
        return await Store.find().sort({ featured: -1, name: 1 });
      } catch (err) {}
    }
    return memoryStores;
  },

  async getStoreBySlug(slug) {
    if (getIsConnected()) {
      try {
        return await Store.findOne({ slug });
      } catch (err) {}
    }
    return memoryStores.find((s) => s.slug === slug);
  },

  // COUPONS
  async getCoupons({
    search = '',
    category = '',
    store = '',
    discountType = '',
    verifiedOnly = false,
    featuredOnly = false,
    sort = 'trending',
    page = 1,
    limit = 12,
  }) {
    if (getIsConnected()) {
      try {
        const query = { status: 'active' };

        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { code: { $regex: search, $options: 'i' } },
            { storeName: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } },
          ];
        }

        if (category && category !== 'all') {
          query.categoryName = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        if (store && store !== 'all') {
          query.storeName = { $regex: new RegExp(`^${store}$`, 'i') };
        }

        if (discountType && discountType !== 'all') {
          query.discountType = discountType;
        }

        if (verifiedOnly === 'true' || verifiedOnly === true) {
          query.isVerified = true;
        }

        if (featuredOnly === 'true' || featuredOnly === true) {
          query.isFeatured = true;
        }

        let sortOption = { upvotes: -1, createdAt: -1 };
        if (sort === 'discount') sortOption = { discountValue: -1 };
        if (sort === 'expiring') sortOption = { expiryDate: 1 };
        if (sort === 'newest') sortOption = { createdAt: -1 };
        if (sort === 'popular') sortOption = { usedCount: -1 };

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Coupon.countDocuments(query);
        const coupons = await Coupon.find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(Number(limit));

        return {
          coupons,
          total,
          page: Number(page),
          totalPages: Math.ceil(total / Number(limit)) || 1,
        };
      } catch (err) {
        console.warn('MongoDB query error, falling back to memory:', err.message);
      }
    }

    // Memory Store implementation
    let results = memoryCoupons.filter((c) => c.status === 'active');

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.storeName.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      results = results.filter(
        (c) => c.categoryName.toLowerCase() === category.toLowerCase()
      );
    }

    if (store && store !== 'all') {
      results = results.filter(
        (c) => c.storeName.toLowerCase() === store.toLowerCase()
      );
    }

    if (discountType && discountType !== 'all') {
      results = results.filter((c) => c.discountType === discountType);
    }

    if (verifiedOnly === 'true' || verifiedOnly === true) {
      results = results.filter((c) => c.isVerified);
    }

    if (featuredOnly === 'true' || featuredOnly === true) {
      results = results.filter((c) => c.isFeatured);
    }

    if (sort === 'discount') {
      results.sort((a, b) => (b.discountValue || 0) - (a.discountValue || 0));
    } else if (sort === 'expiring') {
      results.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    } else if (sort === 'newest') {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'popular') {
      results.sort((a, b) => (b.usedCount || 0) - (a.usedCount || 0));
    } else {
      // trending
      results.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const total = results.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = results.slice(startIndex, startIndex + limitNum);

    return {
      coupons: paginated,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    };
  },

  async getCouponById(id) {
    if (getIsConnected()) {
      try {
        return await Coupon.findById(id);
      } catch (err) {}
    }
    return memoryCoupons.find((c) => c._id.toString() === id.toString());
  },

  async createCoupon(data) {
    if (getIsConnected()) {
      try {
        const newCoupon = new Coupon(data);
        return await newCoupon.save();
      } catch (err) {
        console.warn('MongoDB create error, saving in memory:', err.message);
      }
    }

    const newCoupon = {
      _id: `coupon_${Date.now()}`,
      ...data,
      upvotes: data.upvotes || 0,
      downvotes: data.downvotes || 0,
      usedCount: data.usedCount || 0,
      isVerified: data.isVerified !== undefined ? data.isVerified : true,
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryCoupons.unshift(newCoupon);
    return newCoupon;
  },

  async updateCoupon(id, updates) {
    if (getIsConnected()) {
      try {
        return await Coupon.findByIdAndUpdate(id, updates, { new: true });
      } catch (err) {}
    }

    const index = memoryCoupons.findIndex((c) => c._id.toString() === id.toString());
    if (index !== -1) {
      memoryCoupons[index] = {
        ...memoryCoupons[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return memoryCoupons[index];
    }
    return null;
  },

  async deleteCoupon(id) {
    if (getIsConnected()) {
      try {
        return await Coupon.findByIdAndDelete(id);
      } catch (err) {}
    }

    const index = memoryCoupons.findIndex((c) => c._id.toString() === id.toString());
    if (index !== -1) {
      const removed = memoryCoupons.splice(index, 1);
      return removed[0];
    }
    return null;
  },

  async voteCoupon(id, type) {
    if (getIsConnected()) {
      try {
        const update = type === 'up' ? { $inc: { upvotes: 1 } } : { $inc: { downvotes: 1 } };
        return await Coupon.findByIdAndUpdate(id, update, { new: true });
      } catch (err) {}
    }

    const coupon = memoryCoupons.find((c) => c._id.toString() === id.toString());
    if (coupon) {
      if (type === 'up') coupon.upvotes += 1;
      else coupon.downvotes += 1;
      return coupon;
    }
    return null;
  },

  async copyCoupon(id) {
    if (getIsConnected()) {
      try {
        return await Coupon.findByIdAndUpdate(
          id,
          { $inc: { usedCount: 1 } },
          { new: true }
        );
      } catch (err) {}
    }

    const coupon = memoryCoupons.find((c) => c._id.toString() === id.toString());
    if (coupon) {
      coupon.usedCount += 1;
      return coupon;
    }
    return null;
  },

  // SUBMISSIONS
  async createSubmission(subData) {
    if (getIsConnected()) {
      try {
        const newSub = new Submission(subData);
        return await newSub.save();
      } catch (err) {}
    }

    const newSub = {
      _id: `sub_${Date.now()}`,
      ...subData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    memorySubmissions.unshift(newSub);
    return newSub;
  },

  async getSubmissions() {
    if (getIsConnected()) {
      try {
        return await Submission.find().sort({ createdAt: -1 });
      } catch (err) {}
    }
    return memorySubmissions;
  },

  // STATS
  async getStats() {
    let totalCoupons = memoryCoupons.length;
    let totalStores = memoryStores.length;
    let totalUses = memoryCoupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
    let verifiedCount = memoryCoupons.filter((c) => c.isVerified).length;

    if (getIsConnected()) {
      try {
        totalCoupons = await Coupon.countDocuments({ status: 'active' });
        totalStores = await Store.countDocuments();
        const usageAgg = await Coupon.aggregate([
          { $group: { _id: null, totalUsed: { $sum: '$usedCount' } } },
        ]);
        if (usageAgg.length > 0) totalUses = usageAgg[0].totalUsed;
        verifiedCount = await Coupon.countDocuments({ isVerified: true, status: 'active' });
      } catch (err) {}
    }

    const estimatedSavings = totalUses * 24.5; // Average $24.50 saved per coupon used

    return {
      totalCoupons,
      totalStores,
      totalUses,
      verifiedCount,
      verifiedRate: totalCoupons ? Math.round((verifiedCount / totalCoupons) * 100) : 98,
      estimatedSavings: Math.round(estimatedSavings),
      todaySavings: Math.round(estimatedSavings * 0.08),
    };
  },

  // SEED MONGOOSE DB
  async seedMongo() {
    try {
      await Category.deleteMany({});
      await Store.deleteMany({});
      await Coupon.deleteMany({});

      const insertedCategories = await Category.insertMany(categoriesData);
      const insertedStores = await Store.insertMany(storesData);

      const couponsToInsert = couponsData.map((c) => {
        const storeObj =
          insertedStores.find((s) => s.slug === c.storeSlug) || insertedStores[0];
        const catObj =
          insertedCategories.find((cat) => cat.slug === c.categorySlug) ||
          insertedCategories[0];

        return {
          title: c.title,
          code: c.code,
          discount: c.discount,
          discountValue: c.discountValue,
          discountType: c.discountType,
          description: c.description,
          store: storeObj._id,
          storeName: storeObj.name,
          storeLogo: storeObj.logo,
          category: catObj._id,
          categoryName: catObj.name,
          affiliateUrl: c.affiliateUrl || storeObj.website,
          expiryDate: c.expiryDate,
          isVerified: c.isVerified,
          isExclusive: c.isExclusive,
          isFeatured: c.isFeatured,
          upvotes: c.upvotes || 0,
          downvotes: c.downvotes || 0,
          usedCount: c.usedCount || 0,
          terms: c.terms,
          tags: c.tags || [],
          status: 'active',
        };
      });

      await Coupon.insertMany(couponsToInsert);
      console.log('✅ MongoDB successfully populated with rich seed data.');
      return true;
    } catch (error) {
      console.error('❌ Error seeding MongoDB:', error);
      return false;
    }
  },
};

module.exports = storeService;
