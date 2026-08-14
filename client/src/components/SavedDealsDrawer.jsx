import React from 'react';
import { useCoupons } from '../context/CouponContext';
import { Bookmark, X, Trash2, Copy, ExternalLink, Scissors } from 'lucide-react';

export const SavedDealsDrawer = () => {
  const {
    favorites,
    toggleFavorite,
    isSavedDrawerOpen,
    setIsSavedDrawerOpen,
    handleCopyCode,
    setActiveModalCoupon,
  } = useCoupons();

  if (!isSavedDrawerOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsSavedDrawerOpen(false)}
      style={{ justifyContent: 'flex-end', padding: 0 }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: '#0F172A',
          borderLeft: '1px solid var(--border-strong)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bookmark size={20} color="#10B981" fill="#10B981" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Saved Coupons</h2>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                padding: '0.15rem 0.5rem',
                borderRadius: '9999px',
              }}
            >
              {favorites.length}
            </span>
          </div>

          <button
            onClick={() => setIsSavedDrawerOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Saved List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingRight: '0.25rem',
          }}
        >
          {favorites.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60%',
                textAlign: 'center',
                color: 'var(--text-muted)',
              }}
            >
              <Bookmark size={48} strokeWidth={1.5} style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.1rem', color: '#E2E8F0', marginBottom: '0.35rem' }}>
                No Saved Coupons Yet
              </h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '240px' }}>
                Click the bookmark icon on any deal card to save it for quick access!
              </p>
            </div>
          ) : (
            favorites.map((coupon) => (
              <div
                key={coupon._id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 700 }}>
                      {coupon.storeName}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
                      {coupon.discount}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(coupon)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                    }}
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {coupon.title}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {coupon.code ? (
                    <button
                      onClick={() => handleCopyCode(coupon)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <Copy size={13} />
                      <span>Copy {coupon.code}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveModalCoupon(coupon);
                        setIsSavedDrawerOpen(false);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <ExternalLink size={13} />
                      <span>View Deal</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </div>
  );
};
