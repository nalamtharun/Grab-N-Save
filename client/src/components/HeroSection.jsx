import React, { useRef } from 'react';
import { useCoupons } from '../context/CouponContext';
import { Search, X, Sparkles, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export const HeroSection = () => {
  const { searchQuery, setSearchQuery, setSelectedCategory, setSelectedStore } = useCoupons();
  const searchInputRef = useRef(null);

  const trendingTags = [
    { label: 'Nike 40% Off', store: 'Nike' },
    { label: 'Amazon Prime', store: 'Amazon' },
    { label: 'Uber Eats $15', store: 'Uber Eats' },
    { label: 'Free Shipping', query: 'Free Shipping' },
    { label: 'Gaming & Steam', category: 'Gaming & Entertainment' },
    { label: 'Student Deals', query: 'Student' },
  ];

  const handleTagClick = (tag) => {
    if (tag.store) {
      setSelectedStore(tag.store);
      setSelectedCategory('all');
    } else if (tag.category) {
      setSelectedCategory(tag.category);
      setSelectedStore('all');
    } else if (tag.query) {
      setSearchQuery(tag.query);
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '3.5rem 0 2.5rem 0',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient background lights */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.08) 60%, transparent 80%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Live Pill Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.35rem 0.95rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '9999px',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            color: '#34D399',
            fontWeight: 600,
          }}
        >
          <span className="live-dot" />
          <span>Real-Time Aggregation • Verified 100% Working Promo Codes</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: '850px',
            margin: '0 auto 1.25rem auto',
            letterSpacing: '-0.03em',
          }}
        >
          Find the Best Verified <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6366F1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Coupons & Promo Codes
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6,
          }}
        >
          Never pay full price again. Discover community-tested discount vouchers,
          exclusive promo codes, and instant deals on your favorite stores.
        </p>

        {/* Search Bar Container */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 1.5rem auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.5rem 0.65rem 0.5rem 1.25rem',
              boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.6), 0 0 25px -4px rgba(16, 185, 129, 0.2)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Search size={22} color="#10B981" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stores, brands, codes (e.g. 'Nike', 'Prime', 'Free Shipping')..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-body)',
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  display: 'flex',
                  marginRight: '0.25rem',
                }}
                title="Clear Search"
              >
                <X size={18} />
              </button>
            )}

            <button
              onClick={() => {
                const dealsEl = document.getElementById('deals');
                if (dealsEl) dealsEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary"
              style={{ borderRadius: '12px', padding: '0.65rem 1.25rem' }}
            >
              <span>Explore Deals</span>
            </button>
          </div>
        </div>

        {/* Trending Tags Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.825rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginRight: '0.25rem',
            }}
          >
            <TrendingUp size={14} color="#F59E0B" />
            Trending:
          </span>

          {trendingTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleTagClick(tag)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                borderRadius: '9999px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.color = '#10B981';
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              {tag.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
