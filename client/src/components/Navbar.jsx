import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import {
  Tag,
  Bookmark,
  PlusCircle,
  ShieldCheck,
  Search,
  Sparkles,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';

export const Navbar = () => {
  const {
    favorites,
    setIsSavedDrawerOpen,
    setIsSubmitModalOpen,
    isAdminOpen,
    setIsAdminOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStore,
  } = useCoupons();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSelectedCategory('all');
    setSelectedStore('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(11, 15, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ padding: '0.85rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Brand Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10B981, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
              }}
            >
              <Tag size={20} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(90deg, #FFFFFF, #E2E8F0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Grab N Save
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    WebkitTextFillColor: '#34D399',
                  }}
                >
                  MERN
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0, lineHeight: 1 }}>
                Coupon Aggregation Platform
              </p>
            </div>
          </a>

          {/* Center Quick Links (Desktop) */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.75rem',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
            className="desktop-nav"
          >
            <a
              href="#deals"
              style={{ color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Sparkles size={16} color="#10B981" />
              Verified Deals
            </a>
            <a
              href="#stores"
              style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ShoppingBag size={16} />
              Top Stores
            </a>
            <a
              href="#categories"
              style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Categories
            </a>
          </nav>

          {/* Right Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Saved Deals Drawer Trigger */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="btn btn-secondary btn-sm"
              title="View Bookmarked Coupons"
              style={{ position: 'relative' }}
            >
              <Bookmark size={16} color={favorites.length > 0 ? '#10B981' : '#94A3B8'} />
              <span style={{ display: 'none' }} className="desktop-inline">Saved</span>
              {favorites.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#10B981',
                    color: '#0B0F19',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Submit Coupon CTA */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="btn btn-outline-primary btn-sm"
            >
              <PlusCircle size={16} />
              <span>Submit Deal</span>
            </button>

            {/* Admin Dashboard Toggle */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className={`btn btn-sm ${isAdminOpen ? 'btn-primary' : 'btn-secondary'}`}
              title="Admin Deal Manager"
            >
              <ShieldCheck size={16} />
              <span style={{ display: 'none' }} className="desktop-inline">
                {isAdminOpen ? 'Close Admin' : 'Admin'}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-secondary btn-sm mobile-only"
              style={{ display: 'none', padding: '0.45rem' }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              paddingTop: '1rem',
              marginTop: '0.75rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <a
              href="#deals"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#F8FAFC', padding: '0.5rem 0' }}
            >
              🔥 Verified Deals
            </a>
            <a
              href="#stores"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#94A3B8', padding: '0.5rem 0' }}
            >
              🏬 Top Stores
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#94A3B8', padding: '0.5rem 0' }}
            >
              📂 Categories
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-inline { display: inline !important; }
          .mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
