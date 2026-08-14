import React from 'react';
import { useCoupons } from '../context/CouponContext';
import {
  SlidersHorizontal,
  RotateCcw,
  CheckCircle,
  Percent,
  DollarSign,
  Truck,
  Gift,
  ArrowUpDown,
} from 'lucide-react';

export const FilterSidebar = () => {
  const {
    categories,
    stores,
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
    totalCount,
  } = useCoupons();

  const discountTypes = [
    { id: 'all', label: 'All Types', icon: null },
    { id: 'percentage', label: 'Percentage % Off', icon: Percent },
    { id: 'fixed', label: 'Fixed Dollar $ Off', icon: DollarSign },
    { id: 'free_shipping', label: 'Free Shipping', icon: Truck },
    { id: 'bogo', label: 'BOGO / Freebies', icon: Gift },
  ];

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedStore !== 'all' ||
    selectedDiscountType !== 'all' ||
    verifiedOnly;

  return (
    <aside
      className="glass-card"
      style={{
        padding: '1.5rem',
        height: 'fit-content',
        position: 'sticky',
        top: '5.5rem',
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          paddingBottom: '0.85rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={18} color="#10B981" />
          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: '#F8FAFC' }}>
            Filter Deals
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#34D399',
              fontSize: '0.775rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>

      {/* Sort By Option */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.825rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginBottom: '0.6rem',
          }}
        >
          <ArrowUpDown size={14} color="#6366F1" />
          Sort Order
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input-field"
          style={{
            cursor: 'pointer',
            padding: '0.6rem 0.85rem',
            fontSize: '0.9rem',
          }}
        >
          <option value="trending">🔥 Trending (Most Upvoted)</option>
          <option value="discount">💰 Highest Discount Value</option>
          <option value="expiring">⏳ Expiring Soonest</option>
          <option value="popular">👥 Most Popular (Redemptions)</option>
          <option value="newest">✨ Newly Added</option>
        </select>
      </div>

      {/* Verified Only Toggle */}
      <div
        style={{
          marginBottom: '1.5rem',
          background: 'var(--bg-surface)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={16} color="#10B981" />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F8FAFC' }}>
              Verified Only
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              100% Tested by Team
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          style={{
            width: '18px',
            height: '18px',
            accentColor: '#10B981',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Discount Type Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.825rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginBottom: '0.6rem',
          }}
        >
          Discount Type
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {discountTypes.map((dt) => {
            const isSelected = selectedDiscountType === dt.id;
            const Icon = dt.icon;

            return (
              <button
                key={dt.id}
                onClick={() => setSelectedDiscountType(dt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                  border: isSelected ? '1px solid #10B981' : '1px solid transparent',
                  color: isSelected ? '#34D399' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {Icon && <Icon size={14} />}
                <span>{dt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Dropdown Filter */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.825rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginBottom: '0.6rem',
          }}
        >
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field"
          style={{ cursor: 'pointer', fontSize: '0.875rem' }}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c._id || c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Store Filter */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: '0.825rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--text-secondary)',
            marginBottom: '0.6rem',
          }}
        >
          Store / Brand
        </label>
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="input-field"
          style={{ cursor: 'pointer', fontSize: '0.875rem' }}
        >
          <option value="all">All Stores</option>
          {stores.map((s) => (
            <option key={s._id || s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};
