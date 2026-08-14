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
                    gap: '1.25rem',
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="glass-card"
                      style={{ padding: '1.5rem', height: '280px' }}
                    >
                      <div className="skeleton" style={{ height: '40px', width: '40%', marginBottom: '1rem' }} />
                      <div className="skeleton" style={{ height: '28px', width: '70%', marginBottom: '0.75rem' }} />
                      <div className="skeleton" style={{ height: '60px', width: '100%', marginBottom: '1.5rem' }} />
                      <div className="skeleton" style={{ height: '42px', width: '100%' }} />
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
                      gap: '1.25rem',
                      marginBottom: '2.5rem',
                    }}
                  >
                    {coupons.map((coupon) => (
                      <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        marginTop: '2rem',
                      }}
                    >
                      <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="btn btn-secondary btn-sm"
                        style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                      >
                        <ChevronLeft size={16} />
                        <span>Previous</span>
                      </button>

                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        Page <strong style={{ color: '#F8FAFC' }}>{page}</strong> of {totalPages}
                      </span>

                      <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="btn btn-secondary btn-sm"
                        style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                      >
                        <span>Next</span>
                        <ChevronRight size={16} />
                      </button>
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
