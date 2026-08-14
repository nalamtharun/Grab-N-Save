import React from 'react';
import { useCoupons } from '../context/CouponContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  ExternalLink,
  Sparkles,
  Scissors,
  Flag,
  Trash2,
} from 'lucide-react';

export const CouponCard = ({ coupon }) => {
  const {
    toggleFavorite,
    isFavorite,
    handleCopyCode,
    handleVote,
    setActiveModalCoupon,
    setSelectedStore,
    setReportModalCoupon,
  } = useCoupons();

  const { isAdmin } = useAuth();
  const favorited = isFavorite(coupon._id);

  // Calculate days left until expiration
  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;
    const diff = new Date(expiryDate).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysLeft = getDaysLeft(coupon.expiryDate);

  // Calculate community success percentage
  const totalVotes = (coupon.upvotes || 0) + (coupon.downvotes || 0);
  const successPercentage =
    totalVotes > 0
      ? Math.round(((coupon.upvotes || 0) / totalVotes) * 100)
      : 96;

  const handleActionClick = () => {
    if (coupon.code) {
      handleCopyCode(coupon);
    }
    setActiveModalCoupon(coupon);
  };

  return (
    <div className="coupon-card">
      {/* Top Header: Store Info, Report/Delete & Bookmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '0.65rem',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            onClick={() => setSelectedStore(coupon.storeName)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#1e293b',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <img
              src={coupon.storeLogo}
              alt={coupon.storeName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=128&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          <div>
            <div
              onClick={() => setSelectedStore(coupon.storeName)}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.925rem',
                color: '#F8FAFC',
                cursor: 'pointer',
                lineHeight: 1.2,
              }}
            >
              {coupon.storeName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {coupon.categoryName}
            </div>
          </div>
        </div>

        {/* Action Buttons: Report/Delete & Bookmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {/* Report / Remove Button */}
          <button
            onClick={() => setReportModalCoupon(coupon)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isAdmin ? '#FB7185' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            title={isAdmin ? 'Delete / Manage Coupon (Admin)' : 'Report Invalid / Fake Coupon'}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isAdmin ? '#F43F5E' : '#F59E0B';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isAdmin ? '#FB7185' : 'var(--text-muted)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {isAdmin ? <Trash2 size={15} /> : <Flag size={15} />}
          </button>

          {/* Favorite Bookmark Button */}
          <button
            onClick={() => toggleFavorite(coupon)}
            style={{
              background: favorited ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              border: 'none',
              color: favorited ? '#10B981' : 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.3rem',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)',
            }}
            title={favorited ? 'Remove from Saved' : 'Save to Favorites'}
          >
            <Bookmark size={15} fill={favorited ? '#10B981' : 'none'} />
          </button>
        </div>
      </div>

      {/* Badges Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.35rem',
          marginBottom: '0.55rem',
        }}
      >
        {coupon.isVerified && (
          <span className="badge badge-verified" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
            <CheckCircle size={10} />
            Verified
          </span>
        )}

        {coupon.isExclusive && (
          <span className="badge badge-exclusive" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
            <Sparkles size={10} />
            Exclusive
          </span>
        )}

        {daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
          <span className="badge badge-expiring" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
            <Clock size={10} />
            {daysLeft}d left
          </span>
        )}
      </div>

      {/* Discount Highlight & Title */}
      <div style={{ marginBottom: '0.65rem' }}>
        <div
          className="coupon-discount-box"
          style={{
            marginBottom: '0.45rem',
            padding: '0.35rem 0.65rem',
            fontSize: '1.05rem',
          }}
        >
          {coupon.discount}
        </div>
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#F8FAFC',
            lineHeight: 1.3,
            marginBottom: '0.3rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {coupon.title}
        </h3>
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {coupon.description}
        </p>
      </div>

      {/* Success Rate Bar */}
      <div style={{ marginTop: 'auto', marginBottom: '0.65rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '0.25rem',
          }}
        >
          <span style={{ color: successPercentage > 85 ? '#34D399' : '#F59E0B' }}>
            {successPercentage}% Success
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            {(coupon.usedCount || 0).toLocaleString()} uses
          </span>
        </div>
        <div
          style={{
            height: '3px',
            width: '100%',
            backgroundColor: '#1e293b',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${successPercentage}%`,
              backgroundColor: successPercentage > 85 ? '#10B981' : '#F59E0B',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>

      {/* Action Area: Code Reveal / Deal Activation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {coupon.code ? (
          <button
            onClick={handleActionClick}
            className="btn btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.85rem',
              fontSize: '0.875rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Scissors size={14} />
              <span>Get Code</span>
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.15rem 0.45rem',
                borderRadius: '5px',
                fontSize: '0.775rem',
                letterSpacing: '0.05em',
              }}
            >
              {coupon.code.slice(0, 4)}••••
            </span>
          </button>
        ) : (
          <button
            onClick={handleActionClick}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.5rem 0.85rem', fontSize: '0.875rem' }}
          >
            <span>Activate Deal</span>
            <ExternalLink size={14} />
          </button>
        )}

        {/* Reliability Feedback Voting */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.2rem',
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Did this deal work?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <button
              onClick={() => handleVote(coupon._id, 'up')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.72rem',
              }}
              title="Yes, it worked!"
            >
              <ThumbsUp size={12} color="#10B981" />
              <span>{coupon.upvotes || 0}</span>
            </button>
            <button
              onClick={() => handleVote(coupon._id, 'down')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.72rem',
              }}
              title="No, it failed"
            >
              <ThumbsDown size={12} color="#F43F5E" />
              <span>{coupon.downvotes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
