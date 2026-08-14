import React, { useState, useRef, useEffect } from 'react';
import { useCoupons } from '../context/CouponContext';
import { useAuth } from '../context/AuthContext';
import {
  Tag,
  Bookmark,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from 'lucide-react';

export const Navbar = () => {
  const {
    favorites,
    setIsSavedDrawerOpen,
    setIsSubmitModalOpen,
    isAdminOpen,
    setIsAdminOpen,
    setSearchQuery,
    setSelectedCategory,
    setSelectedStore,
    showToast,
  } = useCoupons();

  const {
    user,
    isAuthenticated,
    isAdmin,
    openLogin,
    openRegister,
    logout,
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setSelectedCategory('all');
    setSelectedStore('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    showToast('👋 You have been logged out successfully', 'info');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(11, 15, 25, 0.88)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Saved Deals Drawer Trigger */}
            <button
              onClick={() => setIsSavedDrawerOpen(true)}
              className="btn btn-secondary btn-sm"
              title="View Bookmarked Coupons"
              style={{ position: 'relative' }}
            >
              <Bookmark size={15} color={favorites.length > 0 ? '#10B981' : '#94A3B8'} />
              <span style={{ display: 'none' }} className="desktop-inline">Saved</span>
              {favorites.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#10B981',
                    color: '#0B0F19',
                    fontSize: '0.68rem',
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
              <PlusCircle size={15} />
              <span style={{ display: 'none' }} className="desktop-inline">Submit Deal</span>
            </button>

            {/* AUTHENTICATION STATE */}
            {!isAuthenticated ? (
              /* Logged Out State: Show Log In & Sign Up buttons */
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={openLogin}
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#E2E8F0' }}
                >
                  <LogIn size={15} />
                  <span>Log In</span>
                </button>
                <button
                  onClick={openRegister}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <UserPlus size={15} />
                  <span style={{ display: 'none' }} className="desktop-inline">Sign Up</span>
                </button>
              </div>
            ) : (
              /* Logged In State: User Profile Avatar & Dropdown Menu */
              <div style={{ position: 'relative' }} ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '9999px',
                    padding: '0.3rem 0.65rem 0.3rem 0.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    color: '#F8FAFC',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10B981, #6366F1)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getInitials(user?.name)}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="#94A3B8" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '240px',
                      background: '#131b2e',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                      padding: '0.75rem',
                      zIndex: 1000,
                      animation: 'fadeIn 0.15s ease-out',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    {/* User Header */}
                    <div style={{ padding: '0.5rem 0.5rem 0.65rem 0.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#F8FAFC' }}>
                        {user?.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user?.email}
                      </div>
                      <div style={{ marginTop: '0.4rem' }}>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            background: isAdmin ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                            color: isAdmin ? '#818CF8' : '#34D399',
                            border: `1px solid ${isAdmin ? 'rgba(99, 102, 241, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                            textTransform: 'uppercase',
                          }}
                        >
                          {isAdmin ? '🛡️ Admin' : '✨ Member'}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        setIsSavedDrawerOpen(true);
                        setProfileDropdownOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'flex-start', width: '100%', fontSize: '0.825rem' }}
                    >
                      <Bookmark size={15} color="#10B981" />
                      <span>My Saved Deals ({favorites.length})</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          setIsAdminOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="btn btn-ghost btn-sm"
                        style={{ justifyContent: 'flex-start', width: '100%', fontSize: '0.825rem' }}
                      >
                        <ShieldCheck size={15} color="#6366F1" />
                        <span>Admin Deal Manager</span>
                      </button>
                    )}

                    <button
                      onClick={handleLogout}
                      className="btn btn-ghost btn-sm"
                      style={{
                        justifyContent: 'flex-start',
                        width: '100%',
                        fontSize: '0.825rem',
                        color: '#FB7185',
                        borderTop: '1px solid var(--border-subtle)',
                        marginTop: '0.25rem',
                        paddingTop: '0.5rem',
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

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

            {!isAuthenticated ? (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    openLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    openRegister();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.85rem', color: '#34D399', marginBottom: '0.5rem' }}>
                  Signed in as <strong>{user?.name}</strong>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', color: '#FB7185' }}
                >
                  Sign Out
                </button>
              </div>
            )}
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
