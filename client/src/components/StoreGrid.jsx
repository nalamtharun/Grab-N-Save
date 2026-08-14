import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import { ShoppingBag, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const StoreGrid = () => {
  const { stores, selectedStore, setSelectedStore, setSelectedCategory } = useCoupons();
  const [currentPage, setCurrentPage] = useState(0);

  const CARDS_PER_PAGE = 4;
  const totalPages = Math.ceil(stores.length / CARDS_PER_PAGE) || 1;

  // Handle boundary navigation
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handleStoreClick = (storeName) => {
    if (selectedStore.toLowerCase() === storeName.toLowerCase()) {
      setSelectedStore('all');
    } else {
      setSelectedStore(storeName);
      setSelectedCategory('all');
      const dealsEl = document.getElementById('deals');
      if (dealsEl) dealsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Slice visible 4 stores
  const visibleStores = stores.slice(
    currentPage * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <section id="stores" style={{ padding: '1.75rem 0' }}>
      <div className="container">
        {/* Section Header with Left / Right Navigation Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ShoppingBag size={20} color="#10B981" />
              Featured Stores & Retailers
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Top partnered brands offering exclusive discounts
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {selectedStore !== 'all' && (
              <button
                onClick={() => setSelectedStore('all')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.8rem' }}
              >
                Clear Store Filter ({selectedStore})
              </button>
            )}

            {/* Carousel Page Counter & Navigation Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-surface)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  padding: '0 0.25rem',
                }}
              >
                {currentPage + 1} / {totalPages}
              </span>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: '0.35rem',
                  borderRadius: '6px',
                  opacity: currentPage === 0 ? 0.35 : 1,
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                }}
                title="Previous 4 Stores"
                aria-label="Previous Stores"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
                className="btn btn-secondary btn-sm"
                style={{
                  padding: '0.35rem',
                  borderRadius: '6px',
                  opacity: currentPage >= totalPages - 1 ? 0.35 : 1,
                  cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer',
                }}
                title="Next 4 Stores"
                aria-label="Next Stores"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stores Grid View */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {visibleStores.map((store) => {
            const isSelected =
              selectedStore.toLowerCase() === store.name.toLowerCase();

            return (
              <div
                key={store._id || store.slug}
                onClick={() => handleStoreClick(store.name)}
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.12))'
                    : 'var(--bg-card)',
                  border: isSelected
                    ? '1.5px solid #10B981'
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected
                    ? '0 0 20px rgba(16, 185, 129, 0.2)'
                    : 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '0.65rem',
                    backgroundColor: '#1E293B',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={store.logo}
                    alt={store.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=128&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '0.925rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.2rem',
                  }}
                >
                  {store.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.725rem',
                    color: '#F59E0B',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Star size={11} fill="#F59E0B" />
                  <span>{store.rating || '4.8'}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{store.category}</span>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    fontSize: '0.725rem',
                    fontWeight: 700,
                    color: isSelected ? '#10B981' : '#34D399',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.18rem 0.55rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span>{store.activeDeals || '3+'} Deals</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '1rem',
            }}
          >
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                style={{
                  width: currentPage === idx ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  backgroundColor:
                    currentPage === idx ? '#10B981' : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                }}
                title={`Page ${idx + 1}`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
