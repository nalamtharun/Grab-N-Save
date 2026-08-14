import React from 'react';
import { useCoupons } from './context/CouponContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBanner } from './components/StatsBanner';
import { CategoryBar } from './components/CategoryBar';
import { StoreGrid } from './components/StoreGrid';
import { FilterSidebar } from './components/FilterSidebar';
import { CouponCard } from './components/CouponCard';
import { CouponModal } from './components/CouponModal';
import { SubmitCouponModal } from './components/SubmitCouponModal';
import { AdminPanel } from './components/AdminPanel';
import { SavedDealsDrawer } from './components/SavedDealsDrawer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  SearchX,
  RotateCcw,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';

export const App = () => {
  const {
    coupons,
    loading,
    totalCount,
    page,
    setPage,
    totalPages,
    selectedCategory,
    selectedStore,
    searchQuery,
    resetFilters,
  } = useCoupons();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Global Modals & Drawers */}
      <AuthModal />
      <CouponModal />
      <SubmitCouponModal />
      <AdminPanel />
      <SavedDealsDrawer />

      {/* Header & Navigation */}
      <Navbar />

      {/* Hero with Live Search */}
      <HeroSection />

      {/* Key Metric Tickers */}
      <StatsBanner />

      {/* Category Pills Carousel */}
      <CategoryBar />

      {/* Store Showcase */}
      <StoreGrid />

      {/* Main Deals Feed & Filter Section */}
      <main id="deals" style={{ padding: '2rem 0 4rem 0', flex: 1 }}>
        <div className="container">
          {/* Section Heading & Filter Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <Flame size={24} color="#F59E0B" />
                <span>
                  {selectedStore !== 'all'
                    ? `${selectedStore} Coupons & Deals`
                    : selectedCategory !== 'all'
                      ? `${selectedCategory} Deals`
                      : searchQuery
                        ? `Results for "${searchQuery}"`
                        : 'Trending Promo Codes & Deals'}
                </span>
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Showing {totalCount} verified deals ready to redeem
              </p>
            </div>
          </div>

          {/* 2-Column Responsive Layout (Sidebar + Deals Grid) */}
          <div className="deals-layout">

            {/* Left Filter Sidebar */}
            <div className="sidebar-container">
              <FilterSidebar />
            </div>

            {/* Right Coupons Grid Container */}
            <div style={{ flex: 1 }}>
              {loading ? (
                /* Skeleton Loader Grid */
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="glass-card"
                      style={{ padding: '1.15rem', height: '220px' }}
                    >
                      <div className="skeleton" style={{ height: '32px', width: '45%', marginBottom: '0.65rem' }} />
                      <div className="skeleton" style={{ height: '22px', width: '70%', marginBottom: '0.5rem' }} />
                      <div className="skeleton" style={{ height: '44px', width: '100%', marginBottom: '1rem' }} />
                      <div className="skeleton" style={{ height: '34px', width: '100%' }} />
                    </div>
                  ))}
                </div>
              ) : coupons.length === 0 ? (
                /* Empty Results State */
                <div
                  className="glass-card"
                  style={{
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(244, 63, 94, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <SearchX size={32} color="#F43F5E" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    No Coupons Found
                  </h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      maxWidth: '400px',
                      fontSize: '0.9rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    We couldn't find any active deals matching your current search or filter combination.
                  </p>
                  <button onClick={resetFilters} className="btn btn-primary">
                    <RotateCcw size={16} />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                /* Live Coupons Grid */
                <>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem',
                    }}
                  >
                    {coupons.map((coupon) => (
                      <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                  </div>

                  {/* Enhanced Pagination Controls (6 items per page) */}
                  {totalPages > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginTop: '1.5rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          background: 'var(--bg-surface)',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {/* Prev Button */}
                        <button
                          onClick={() => {
                            setPage((p) => Math.max(p - 1, 1));
                            document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          disabled={page === 1}
                          className="btn btn-secondary btn-sm"
                          style={{
                            opacity: page === 1 ? 0.35 : 1,
                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                            padding: '0.35rem 0.65rem',
                          }}
                          aria-label="Previous Page"
                        >
                          <ChevronLeft size={16} />
                          <span>Prev</span>
                        </button>

                        {/* Page Number Pills */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          {[...Array(totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            const isActive = page === pageNum;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => {
                                  setPage(pageNum);
                                  document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  border: isActive ? '1px solid #10B981' : '1px solid transparent',
                                  background: isActive
                                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                    : 'transparent',
                                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                                  fontWeight: 700,
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() => {
                            setPage((p) => Math.min(p + 1, totalPages));
                            document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          disabled={page === totalPages}
                          className="btn btn-secondary btn-sm"
                          style={{
                            opacity: page === totalPages ? 0.35 : 1,
                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                            padding: '0.35rem 0.65rem',
                          }}
                          aria-label="Next Page"
                        >
                          <span>Next</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                        Showing page {page} of {totalPages} (6 deals per page)
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Responsive Styles for Deals Layout */}
      <style>{`
        .deals-layout {
          display: flex;
          gap: 1.75rem;
          align-items: flex-start;
        }
        .sidebar-container {
          width: 280px;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .deals-layout {
            flex-direction: column;
          }
          .sidebar-container {
            width: 100%;
            position: static;
          }
        }
      `}</style>
    </div>
  );
};
