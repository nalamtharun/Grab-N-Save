import React, { useState } from 'react';
import { useCoupons } from '../context/CouponContext';
import { api } from '../services/api';
import {
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminPanel = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    coupons,
    categories,
    stores,
    showToast,
    fetchCoupons,
  } = useCoupons();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    storeName: 'Amazon',
    code: '',
    discount: '',
    discountType: 'percentage',
    categoryName: 'Electronics & Tech',
    affiliateUrl: '',
    description: '',
    isVerified: true,
    isExclusive: false,
    terms: 'Valid for a limited time at checkout.',
  });

  if (!isAdminOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const selectedStoreObj = stores.find((s) => s.name === formData.storeName);
      const res = await api.createCoupon({
        ...formData,
        code: formData.code.trim().toUpperCase(),
        storeLogo: selectedStoreObj?.logo || '',
      });

      if (res.success) {
        showToast('Deal created by Admin successfully', 'success');
        setIsAdding(false);
        setFormData({
          title: '',
          storeName: 'Amazon',
          code: '',
          discount: '',
          discountType: 'percentage',
          categoryName: 'Electronics & Tech',
          affiliateUrl: '',
          description: '',
          isVerified: true,
          isExclusive: false,
          terms: 'Valid for a limited time at checkout.',
        });
        fetchCoupons();
      }
    } catch (err) {
      showToast('Error creating coupon: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await api.deleteCoupon(id);
        if (res.success) {
          showToast('Coupon deleted', 'info');
          fetchCoupons();
        }
      } catch (err) {
        showToast('Failed to delete coupon', 'error');
      }
    }
  };

  const handleToggleVerified = async (coupon) => {
    try {
      const res = await api.updateCoupon(coupon._id, {
        isVerified: !coupon.isVerified,
      });
      if (res.success) {
        showToast(
          `Coupon marked as ${!coupon.isVerified ? 'Verified' : 'Unverified'}`,
          'success'
        );
        fetchCoupons();
      }
    } catch (err) {
      showToast('Failed to update verification status', 'error');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAdminOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '960px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}
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
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} color="#10B981" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Admin Coupon Manager</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Manage catalog, verify promo codes, edit discount rates & delete expired deals
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className={`btn btn-sm ${isAdding ? 'btn-secondary' : 'btn-primary'}`}
            >
              <Plus size={16} />
              <span>{isAdding ? 'Cancel Add' : 'Add New Coupon'}</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
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
        </div>

        {/* Add New Coupon Subform */}
        {isAdding && (
          <form
            onSubmit={handleCreate}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#34D399' }}>
              Create New Verified Coupon
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Store *
                </label>
                <select
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="input-field"
                >
                  {stores.map((s) => (
                    <option key={s._id || s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Category *
                </label>
                <select
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  className="input-field"
                >
                  {categories.map((c) => (
                    <option key={c._id || c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Discount Display *
                </label>
                <input
                  type="text"
                  required
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  placeholder="e.g. 50% OFF"
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  Promo Code (Optional)
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. SAVE50"
                  className="input-field"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Deal Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 50% Off all running shoes and gym apparel"
                className="input-field"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Full promotion summary"
                className="input-field"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <Save size={16} />
                <span>Save Coupon to Database</span>
              </button>
            </div>
          </form>
        )}

        {/* Coupons List Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Store</th>
                <th style={{ padding: '0.75rem' }}>Deal / Title</th>
                <th style={{ padding: '0.75rem' }}>Code</th>
                <th style={{ padding: '0.75rem' }}>Discount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr
                  key={coupon._id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <td style={{ padding: '0.75rem', fontWeight: 600, color: '#F8FAFC' }}>
                    {coupon.storeName}
                  </td>
                  <td style={{ padding: '0.75rem', maxWidth: '280px' }}>
                    <div style={{ color: '#E2E8F0', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {coupon.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {coupon.categoryName}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#34D399' }}>
                    {coupon.code || '— (Deal)'}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#F8FAFC' }}>
                    {coupon.discount}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => handleToggleVerified(coupon)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: coupon.isVerified ? '#34D399' : '#F43F5E',
                      }}
                      title="Click to toggle verified"
                    >
                      {coupon.isVerified ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      <span>{coupon.isVerified ? 'Verified' : 'Unverified'}</span>
                    </button>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(coupon._id, coupon.title)}
                      style={{
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.25)',
                        color: '#F43F5E',
                        borderRadius: '6px',
                        padding: '0.35rem 0.6rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
