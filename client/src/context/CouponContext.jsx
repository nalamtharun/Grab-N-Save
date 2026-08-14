import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

const CouponContext = createContext();

export const CouponProvider = ({ children }) => {
  // Coupon state
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Metadata
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalCoupons: 0,
    totalStores: 0,
    totalUses: 0,
    verifiedRate: 98,
    estimatedSavings: 0,
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedDiscountType, setSelectedDiscountType] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('trending');

  // Favorites (LocalStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('gns_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Drawers
  const [activeModalCoupon, setActiveModalCoupon] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gns_favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Load initial stores, categories & platform stats
  const loadInitialData = useCallback(async () => {
    try {
      const [storesRes, catsRes, statsRes] = await Promise.all([
        api.getStores(),
        api.getCategories(),
        api.getStats(),
      ]);
      if (storesRes.success) setStores(storesRes.data);
      if (catsRes.success) setCategories(catsRes.data);
      if (statsRes.success) setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching initial metadata:', err);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Fetch Coupons with current filters
  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getCoupons({
        search: searchQuery,
        category: selectedCategory,
        store: selectedStore,
        discountType: selectedDiscountType,
        verifiedOnly,
        sort: sortBy,
        page,
        limit: 12,
      });

      if (res.success) {
        setCoupons(res.data);
        setTotalCount(res.total);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      showToast('Could not load deals. Retrying...', 'error');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedStore, selectedDiscountType, verifiedOnly, sortBy, page, showToast]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStore('all');
    setSelectedDiscountType('all');
    setVerifiedOnly(false);
    setSortBy('trending');
    setPage(1);
  }, []);

  // Bookmark / Favorite toggle
  const toggleFavorite = useCallback((coupon) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c._id === coupon._id);
      if (exists) {
        showToast(`Removed "${coupon.storeName}" coupon from saved deals`, 'info');
        return prev.filter((c) => c._id !== coupon._id);
      } else {
        showToast(`Saved "${coupon.storeName}" coupon to your list!`, 'success');
        return [coupon, ...prev];
      }
    });
  }, [showToast]);

  const isFavorite = useCallback(
    (couponId) => favorites.some((c) => c._id === couponId),
    [favorites]
  );

  // Trigger celebratory confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#10b981', '#34d399', '#6366f1', '#fbbf24', '#ffffff'],
      });
    } catch (e) {}
  }, []);

  // Copy code handler with counter & celebration
  const handleCopyCode = useCallback(async (coupon) => {
    if (!coupon) return;
    const textToCopy = coupon.code || coupon.affiliateUrl || window.location.href;

    try {
      await navigator.clipboard.writeText(textToCopy);
      triggerConfetti();
      showToast(`Promo code "${coupon.code || 'DEAL'}" copied to clipboard!`, 'success');
      
      // Update backend usage counter
      api.copyCoupon(coupon._id).catch(() => {});

      // Increment local count
      setCoupons((prev) =>
        prev.map((c) =>
          c._id === coupon._id ? { ...c, usedCount: (c.usedCount || 0) + 1 } : c
        )
      );
    } catch (err) {
      showToast('Could not copy code. Please copy manually.', 'error');
    }
  }, [showToast, triggerConfetti]);

  // Vote handler
  const handleVote = useCallback(async (couponId, type) => {
    try {
      const res = await api.voteCoupon(couponId, type);
      if (res.success) {
        setCoupons((prev) =>
          prev.map((c) =>
            c._id === couponId
              ? { ...c, upvotes: res.data.upvotes, downvotes: res.data.downvotes }
              : c
          )
        );
        showToast(
          type === 'up' ? 'Thanks! Marked as working 🎉' : 'Feedback noted: reported expired/invalid',
          'info'
        );
      }
    } catch (err) {
      showToast('Could not submit vote.', 'error');
    }
  }, [showToast]);

  return (
    <CouponContext.Provider
      value={{
        coupons,
        loading,
        totalCount,
        page,
        setPage,
        totalPages,
        stores,
        categories,
        stats,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStore,
        setSelectedStore,
        selectedDiscountType,
        setSelectedDiscountType,
        verifiedOnly,
        setVerifiedOnly,
        sortBy,
        setSortBy,
        resetFilters,
        favorites,
        toggleFavorite,
        isFavorite,
        activeModalCoupon,
        setActiveModalCoupon,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        isAdminOpen,
        setIsAdminOpen,
        toasts,
        showToast,
        removeToast,
        handleCopyCode,
        handleVote,
        fetchCoupons,
        loadInitialData,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupons = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupons must be used within a CouponProvider');
  }
  return context;
};
