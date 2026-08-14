const API_BASE = '/api';

export const api = {
  // Coupons
  async getCoupons(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    const res = await fetch(`${API_BASE}/coupons?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch coupons');
    return res.json();
  },

  async getCouponById(id) {
    const res = await fetch(`${API_BASE}/coupons/${id}`);
    if (!res.ok) throw new Error('Failed to fetch coupon details');
    return res.json();
  },

  async createCoupon(data) {
    const res = await fetch(`${API_BASE}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create coupon');
    return res.json();
  },

  async updateCoupon(id, data) {
    const res = await fetch(`${API_BASE}/coupons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update coupon');
    return res.json();
  },

  async deleteCoupon(id) {
    const res = await fetch(`${API_BASE}/coupons/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete coupon');
    return res.json();
  },

  async voteCoupon(id, type) {
    const res = await fetch(`${API_BASE}/coupons/${id}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    if (!res.ok) throw new Error('Failed to record vote');
    return res.json();
  },

  async copyCoupon(id) {
    const res = await fetch(`${API_BASE}/coupons/${id}/copy`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to record copy action');
    return res.json();
  },

  // Stores
  async getStores() {
    const res = await fetch(`${API_BASE}/stores`);
    if (!res.ok) throw new Error('Failed to fetch stores');
    return res.json();
  },

  async getStoreBySlug(slug) {
    const res = await fetch(`${API_BASE}/stores/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch store details');
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch platform stats');
    return res.json();
  },

  // Submissions
  async submitDeal(data) {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to submit deal');
    return res.json();
  },

  async getSubmissions() {
    const res = await fetch(`${API_BASE}/submissions`);
    if (!res.ok) throw new Error('Failed to fetch submissions');
    return res.json();
  },
};
