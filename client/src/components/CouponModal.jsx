import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Calendar,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
} from 'lucide-react';

export const CouponModal = () => {
  const { activeModalCoupon, setActiveModalCoupon, handleCopyCode, handleVote } = useCoupons();
  const [copied, setCopied] = useState(false);

  if (!activeModalCoupon) return null;

  const coupon = activeModalCoupon;

  const onCopy = async () => {
    await handleCopyCode(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenStore = () => {
    const url = coupon.affiliateUrl || 'https://www.google.com';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setActiveModalCoupon(null)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveModalCoupon(null)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header: Store Logo & Discount */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#1e293b',
              border: '1px solid var(--border-subtle)',
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
              style={{
                fontSize: '0.85rem',
                color: '#34D399',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {coupon.storeName} Discount
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F8FAFC' }}>
              {coupon.discount}
            </h2>
          </div>
        </div>

        {/* Coupon Title & Description */}
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#F8FAFC',
            lineHeight: 1.4,
            marginBottom: '0.65rem',
          }}
        >
          {coupon.title}
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            lineHeight: 1.5,
          }}
        >
          {coupon.description}
        </p>

        {/* Code Box with One-Click Copy */}
        {coupon.code ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.45rem',
              }}
            >
              Copy and apply this promo code at checkout
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#0B0F19',
                border: '2px dashed #10B981',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 1rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#34D399',
                  letterSpacing: '0.1em',
                }}
              >
                {coupon.code}
              </span>
              <button
                onClick={onCopy}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: '8px' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              color: '#34D399',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={18} />
            <span>Direct Deal — No Promo Code Required. Discount is applied on merchant page.</span>
          </div>
        )}

        {/* Go to Merchant Store Button */}
        <button
          onClick={handleOpenStore}
          className="btn btn-secondary"
          style={{
            width: '100%',
            marginBottom: '1.5rem',
            justifyContent: 'center',
            fontSize: '1rem',
            padding: '0.75rem',
          }}
        >
          <span>Continue to {coupon.storeName}</span>
          <ExternalLink size={16} />
        </button>

        {/* Details & Terms Grid */}
        <div
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontSize: '0.825rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={14} color="#6366F1" />
            <span>
              Expires:{' '}
              <strong style={{ color: '#F8FAFC' }}>
                {coupon.expiryDate
                  ? new Date(coupon.expiryDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Limited time'}
              </strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <FileText size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              Terms: {coupon.terms || 'Valid for qualifying orders at checkout. Exclusions apply.'}
            </span>
          </div>
        </div>

        {/* Feedback Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Did this coupon work for your order?
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleVote(coupon._id, 'up')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.65rem' }}
            >
              <ThumbsUp size={14} color="#10B981" />
              <span>Yes ({coupon.upvotes || 0})</span>
            </button>
            <button
              onClick={() => handleVote(coupon._id, 'down')}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.65rem' }}
            >
              <ThumbsDown size={14} color="#F43F5E" />
              <span>No ({coupon.downvotes || 0})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
