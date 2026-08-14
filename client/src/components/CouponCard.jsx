import React from 'react';
import { useCoupons } from '../context/CouponContext';
import {
  CheckCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  ExternalLink,
  Copy,
  Sparkles,
  Scissors,
} from 'lucide-react';

export const CouponCard = ({ coupon }) => {
  const {
    toggleFavorite,
    isFavorite,
    handleCopyCode,
    handleVote,
    setActiveModalCoupon,
    setSelectedStore,
  } = useCoupons();

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
      {/* Top Header: Store Info & Bookmark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            onClick={() => setSelectedStore(coupon.storeName)}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '10px',
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
                fontSize: '1rem',
                color: '#F8FAFC',
                cursor: 'pointer',
                lineHeight: 1.2,
              }}
            >
              {coupon.storeName}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {coupon.categoryName}
            </div>
          </div>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={() => toggleFavorite(coupon)}
          style={{
            background: favorited ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            border: 'none',
            color: favorited ? '#10B981' : 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.4rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}
          title={favorited ? 'Remove from Saved' : 'Save to Favorites'}
        >
          <Bookmark size={18} fill={favorited ? '#10B981' : 'none'} />
        </button>
      </div>

      {/* Badges Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.85rem',
        }}
      >
        {coupon.isVerified && (
          <span className="badge badge-verified">
            <CheckCircle size={11} />
            Verified
          </span>
        )}

        {coupon.isExclusive && (
          <span className="badge badge-exclusive">
            <Sparkles size={11} />
            Exclusive
          </span>
        )}

        {daysLeft !== null && daysLeft <= 7 && daysLeft > 0 && (
          <span className="badge badge-expiring">
            <Clock size={11} />
            {daysLeft}d left
          </span>
        )}
      </div>

      {/* Discount Highlight & Title */}
      <div style={{ marginBottom: '1rem' }}>
        <div className="coupon-discount-box" style={{ marginBottom: '0.75rem' }}>
          {coupon.discount}
        </div>
        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: '#F8FAFC',
            lineHeight: 1.4,
            marginBottom: '0.5rem',
          }}
        >
          {coupon.title}
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
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
      <div style={{ marginTop: 'auto', marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '0.35rem',
          }}
        >
          <span style={{ color: successPercentage > 85 ? '#34D399' : '#F59E0B' }}>
            {successPercentage}% Working Success
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            {(coupon.usedCount || 0).toLocaleString()} uses
          </span>
        </div>
        <div
          style={{
            height: '4px',
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {coupon.code ? (
          <button
            onClick={handleActionClick}
            className="btn btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1rem',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Scissors size={16} />
              <span>Get Code</span>
            </span>
            <span
              style={{
                fontFamily: 'monospace',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
                fontSize: '0.825rem',
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
            style={{ width: '100%' }}
          >
            <span>Activate Deal</span>
            <ExternalLink size={15} />
          </button>
        )}

        {/* Reliability Feedback Voting */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.35rem',
          }}
        >
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Did this deal work?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => handleVote(coupon._id, 'up')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
              }}
              title="Yes, it worked!"
            >
              <ThumbsUp size={13} color="#10B981" />
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
                gap: '0.25rem',
                fontSize: '0.75rem',
              }}
              title="No, it failed"
            >
              <ThumbsDown size={13} color="#F43F5E" />
              <span>{coupon.downvotes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
