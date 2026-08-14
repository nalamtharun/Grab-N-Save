import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import { useAuth } from '../context/AuthContext';
import {
  X,
  AlertTriangle,
  Trash2,
  Flag,
  Clock,
  Copy,
  ShieldAlert,
  Link2Off,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const ReportCouponModal = () => {
  const {
    reportModalCoupon,
    setReportModalCoupon,
    deleteCoupon,
    reportCoupon,
  } = useCoupons();

  const { isAdmin } = useAuth();

  const [selectedReason, setSelectedReason] = useState('Expired / Not Valid');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!reportModalCoupon) return null;

  const reasons = [
    {
      id: 'Expired / Not Valid',
      label: 'Expired / Deal No Longer Valid',
      desc: 'The code or promo has expired and fails at store checkout',
      icon: Clock,
      color: '#F59E0B',
    },
    {
      id: 'Duplicate',
      label: 'Duplicate Deal',
      desc: 'This exact coupon code or offer is already listed',
      icon: Copy,
      color: '#6366F1',
    },
    {
      id: 'Fraudulent / Fake',
      label: 'Fraudulent / Fake Offer',
      desc: 'Misleading discount, suspicious link, or scam attempt',
      icon: ShieldAlert,
      color: '#F43F5E',
    },
    {
      id: 'Broken Link / Code',
      label: 'Broken Link / Incorrect Code',
      desc: 'Link is dead or the revealed code does not match description',
      icon: Link2Off,
      color: '#EC4899',
    },
    {
      id: 'Other',
      label: 'Other Issue',
      desc: 'Any other problem with this coupon listing',
      icon: HelpCircle,
      color: '#94A3B8',
    },
  ];

  const handleReport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await reportCoupon(reportModalCoupon._id, selectedReason, details);
      setReportModalCoupon(null);
      setDetails('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePermanent = async () => {
    setIsSubmitting(true);
    try {
      await deleteCoupon(reportModalCoupon._id);
      setReportModalCoupon(null);
      setDetails('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setReportModalCoupon(null)}>
      <div
        className="modal-content"
        style={{ maxWidth: '480px', padding: '1.75rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setReportModalCoupon(null)}
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

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: isAdmin ? 'rgba(244, 63, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${isAdmin ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            }}
          >
            {isAdmin ? (
              <Trash2 size={20} color="#F43F5E" />
            ) : (
              <Flag size={20} color="#F59E0B" />
            )}
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
              {isAdmin ? 'Manage / Remove Coupon' : 'Report Invalid Coupon'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Help keep Grab N Save deals verified and accurate
            </p>
          </div>
        </div>

        {/* Target Coupon Summary Card */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#1E293B',
              border: '1px solid var(--border-subtle)',
              flexShrink: 0,
            }}
          >
            <img
              src={reportModalCoupon.storeLogo}
              alt={reportModalCoupon.storeName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=128&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>
              {reportModalCoupon.storeName} • {reportModalCoupon.discount}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#F8FAFC',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {reportModalCoupon.title}
            </div>
          </div>
        </div>

        {/* Admin Direct Action Callout */}
        {isAdmin && (
          <div
            style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#FB7185' }}>
                🛡️ Admin Quick Delete
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Permanently delete this coupon immediately from the database.
              </div>
            </div>
            <button
              onClick={handleDeletePermanent}
              disabled={isSubmitting}
              className="btn btn-secondary btn-sm"
              style={{
                background: 'rgba(244, 63, 94, 0.2)',
                borderColor: 'rgba(244, 63, 94, 0.4)',
                color: '#FB7185',
                flexShrink: 0,
              }}
            >
              <Trash2 size={14} />
              <span>Delete Now</span>
            </button>
          </div>
        )}

        {/* Report Reason Selection */}
        <form onSubmit={handleReport}>
          <label
            style={{
              display: 'block',
              fontSize: '0.825rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.65rem',
            }}
          >
            Select Reason for Removal / Flagging *
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {reasons.map((r) => {
              const isSelected = selectedReason === r.id;
              const IconComponent = r.icon;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReason(r.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected
                      ? `1.5px solid ${r.color}`
                      : '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: `rgba(255, 255, 255, 0.05)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent size={15} color={r.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: isSelected ? '#F8FAFC' : 'var(--text-primary)',
                      }}
                    >
                      {r.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {r.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: isSelected ? `5px solid ${r.color}` : '1.5px solid var(--border-strong)',
                      backgroundColor: isSelected ? '#FFF' : 'transparent',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Optional Details */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Additional Notes / Proof (Optional)
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. Code failed on checkout on Nike.com or expired yesterday..."
              className="input-field"
              rows={2}
              style={{ resize: 'none', fontSize: '0.825rem' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setReportModalCoupon(null)}
              className="btn btn-secondary btn-sm"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                borderColor: '#F59E0B',
              }}
            >
              <Flag size={14} />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Report / Flag'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
