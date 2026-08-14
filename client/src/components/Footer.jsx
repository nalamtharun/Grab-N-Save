import React from 'react';
import { Tag, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        marginTop: '4rem',
        borderTop: '1px solid var(--border-subtle)',
        background: '#080C14',
        padding: '3rem 0 2rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #10B981, #6366F1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Tag size={16} color="#FFFFFF" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#F8FAFC' }}>
                Grab N Save
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              The modern coupon aggregation & deal discovery platform connecting savvy shoppers with verified discount codes and exclusive vouchers.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#34D399', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>
              <ShieldCheck size={14} />
              <span>Full-Stack MERN Architecture</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Popular Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><a href="#deals" style={{ transition: 'color 0.15s' }}>Electronics & Computing</a></li>
              <li><a href="#deals" style={{ transition: 'color 0.15s' }}>Fashion & Streetwear</a></li>
              <li><a href="#deals" style={{ transition: 'color 0.15s' }}>Food & Restaurant Delivery</a></li>
              <li><a href="#deals" style={{ transition: 'color 0.15s' }}>Gaming & Digital Entertainment</a></li>
            </ul>
          </div>

          {/* Top Retailers */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Featured Retailers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li><a href="#stores">Amazon Promo Codes</a></li>
              <li><a href="#stores">Nike Sneaker Discounts</a></li>
              <li><a href="#stores">Apple Student Deals</a></li>
              <li><a href="#stores">Uber Eats Vouchers</a></li>
            </ul>
          </div>

          {/* About Minor Project */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Minor Project Highlights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={14} color="#10B981" />
                <span>MongoDB Search Aggregations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#6366F1" />
                <span>React Dynamic Filter Pipeline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="#06B6D4" />
                <span>Express RESTful API Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Grab N Save Platform. All trademarks belong to their respective owners.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Engineered with MERN Stack for high performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
