import React from 'react';
import { useCoupons } from '../context/CouponContext';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';

export const StoreGrid = () => {
  const { stores, selectedStore, setSelectedStore, setSelectedCategory } = useCoupons();

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

  return (
    <section id="stores" style={{ padding: '2rem 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={22} color="#10B981" />
              Featured Stores & Retailers
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Top partnered brands offering exclusive discounts
            </p>
          </div>
          {selectedStore !== 'all' && (
            <button
              onClick={() => setSelectedStore('all')}
              className="btn btn-ghost btn-sm"
            >
              Clear Store Filter ({selectedStore})
            </button>
          )}
        </div>

        {/* Store Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {stores.map((store) => {
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
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'var(--shadow-sm)',
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
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '0.75rem',
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
                      e.target.src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=128&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {store.name}
                </h3>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    color: '#F59E0B',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Star size={12} fill="#F59E0B" />
                  <span>{store.rating || '4.8'}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{store.category}</span>
                </div>

                <div
                  style={{
                    marginTop: 'auto',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isSelected ? '#10B981' : '#34D399',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '0.2rem 0.6rem',
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
      </div>
    </section>
  );
};
