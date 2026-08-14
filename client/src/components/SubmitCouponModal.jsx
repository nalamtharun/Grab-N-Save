import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import { api } from '../services/api';
import { X, Send, PlusCircle, CheckCircle2 } from 'lucide-react';

export const SubmitCouponModal = () => {
  const { isSubmitModalOpen, setIsSubmitModalOpen, categories, showToast, fetchCoupons } =
    useCoupons();

  const [formData, setFormData] = useState({
    storeName: '',
    title: '',
    code: '',
    discount: '',
    categoryName: categories[0]?.name || 'Electronics & Tech',
    affiliateUrl: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isSubmitModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.storeName || !formData.title || !formData.discount) {
      showToast('Please fill in Store Name, Title, and Discount', 'error');
      return;
    }

    setSubmitting(true);
    try {
      // Also add directly as active coupon if user wants instant availability
      await api.createCoupon({
        ...formData,
        code: formData.code.trim().toUpperCase(),
        isVerified: true,
        status: 'active',
      });

      showToast('🎉 Your deal was successfully published to Grab N Save!', 'success');
      setIsSubmitModalOpen(false);
      setFormData({
        storeName: '',
        title: '',
        code: '',
        discount: '',
        categoryName: categories[0]?.name || 'Electronics & Tech',
        affiliateUrl: '',
        notes: '',
      });
      fetchCoupons();
    } catch (err) {
      showToast('Error submitting coupon. Please check fields.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setIsSubmitModalOpen(false)}
    >
      <div
        className="modal-content"
        style={{ maxWidth: '560px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            paddingBottom: '0.85rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={22} color="#10B981" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Submit a Deal or Promo Code</h2>
          </div>
          <button
            onClick={() => setIsSubmitModalOpen(false)}
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

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Store / Retailer *
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder="e.g. Nike, Walmart, Uber"
                className="input-field"
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Discount Amount *
              </label>
              <input
                type="text"
                required
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="e.g. 25% OFF or $20 OFF"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Deal Title / Offer Summary *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. 25% Off sitewide on all orders above $50"
              className="input-field"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Promo Code (Optional)
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g. SAVE25 (Leave blank if direct deal)"
                className="input-field"
                style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.35rem',
                }}
              >
                Category
              </label>
              <select
                value={formData.categoryName}
                onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                className="input-field"
                style={{ cursor: 'pointer' }}
              >
                {categories.map((c) => (
                  <option key={c._id || c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Store Website / Link (Optional)
            </label>
            <input
              type="url"
              value={formData.affiliateUrl}
              onChange={(e) => setFormData({ ...formData, affiliateUrl: e.target.value })}
              placeholder="https://..."
              className="input-field"
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '0.35rem',
              }}
            >
              Additional Terms or Notes
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Excludes clearance items, valid until end of week."
              className="input-field"
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ minWidth: '140px' }}
            >
              <Send size={16} />
              <span>{submitting ? 'Submitting...' : 'Post Deal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
