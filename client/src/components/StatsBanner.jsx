import React from 'react';
import { useCoupons } from '../context/CouponContext';
import { Tag, Store, DollarSign, ShieldCheck, Flame } from 'lucide-react';

export const StatsBanner = () => {
  const { stats, totalCount } = useCoupons();

  const statItems = [
    {
      icon: Tag,
      value: totalCount || stats.totalCoupons || '30+',
      label: 'Active Promo Deals',
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
      icon: Store,
      value: stats.totalStores || '12',
      label: 'Verified Stores',
      color: '#6366F1',
      bg: 'rgba(99, 102, 241, 0.1)',
    },
    {
      icon: DollarSign,
      value: `$${(stats.estimatedSavings || 148500).toLocaleString()}`,
      label: 'Community Savings',
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: ShieldCheck,
      value: `${stats.verifiedRate || 98}%`,
      label: 'Success Verification',
      color: '#06B6D4',
      bg: 'rgba(6, 182, 214, 0.1)',
    },
  ];

  return (
    <section style={{ padding: '1rem 0 2rem 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: item.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color={item.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
