import React from 'react';
import { useCoupons } from '../context/CouponContext';
import {
  Laptop,
  Shirt,
  UtensilsCrossed,
  Plane,
  Gamepad2,
  Sparkles,
  Home,
  GraduationCap,
  LayoutGrid,
} from 'lucide-react';

const iconMap = {
  Laptop: Laptop,
  Shirt: Shirt,
  UtensilsCrossed: UtensilsCrossed,
  Plane: Plane,
  Gamepad2: Gamepad2,
  Sparkles: Sparkles,
  Home: Home,
  GraduationCap: GraduationCap,
};

export const CategoryBar = () => {
  const { categories, selectedCategory, setSelectedCategory } = useCoupons();

  const handleSelect = (catName) => {
    setSelectedCategory(catName);
    const dealsEl = document.getElementById('deals');
    if (dealsEl) dealsEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" style={{ padding: '1.5rem 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Explore by Category</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Filter discounts by shopping domain
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.825rem' }}
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Scrollable / Responsive Category Cards */}
        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            scrollbarWidth: 'thin',
          }}
        >
          {/* All Categories Pill */}
          <button
            onClick={() => handleSelect('all')}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.75rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              background:
                selectedCategory === 'all'
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(99, 102, 241, 0.15))'
                  : 'var(--bg-surface)',
              border:
                selectedCategory === 'all'
                  ? '1px solid #10B981'
                  : '1px solid var(--border-subtle)',
              color: selectedCategory === 'all' ? '#34D399' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all var(--transition-fast)',
              boxShadow: selectedCategory === 'all' ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none',
            }}
          >
            <LayoutGrid size={18} />
            <span>All Deals</span>
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Laptop;
            const isSelected =
              selectedCategory.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat._id || cat.slug}
                onClick={() => handleSelect(cat.name)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.75rem 1.15rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(99, 102, 241, 0.15))'
                    : 'var(--bg-surface)',
                  border: isSelected
                    ? '1px solid #10B981'
                    : '1px solid var(--border-subtle)',
                  color: isSelected ? '#34D399' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected ? '0 0 15px rgba(16, 185, 129, 0.2)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.color = '#F8FAFC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <Icon size={18} color={isSelected ? '#10B981' : cat.color || '#94A3B8'} />
                <span>{cat.name}</span>
                {cat.dealCount !== undefined && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    {cat.dealCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
