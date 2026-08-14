# Grab N Save — Coupon & Deal Aggregation Platform (MERN Stack)

**Grab N Save** is a modern, high-performance **Full-Stack Coupon and Promo Code Aggregation Platform** engineered with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It provides instant deal discovery, interactive coupon clipping with haptic/confetti feedback, reliability vote tracking, multi-dimensional search & filtering, store directories, community submissions, and an admin management portal.

---

## 📌 Minor Project Overview & Key Highlights

- **Dynamic Reactive Frontend**: Built with React, Vite, Lucide Icons, and custom CSS design system using glassmorphism, responsive grids, and micro-animations.
- **Robust REST API Services**: Structured Express.js backend with controllers, modular routes, rate limiting, and centralized error handling.
- **Intelligent Search & Filter Pipeline**: Multi-factor filtering across brands, categories, discount types (% off, $ off, free shipping, BOGO), verified status, and sorting algorithms (trending, highest discount, expiring soonest).
- **Database & Data Resilience**: MongoDB schemas with Mongoose ODM, indexing on query fields, and built-in graceful hybrid fallback support ensuring zero downtime.
- **Engagement & Crowdsourcing**: Real-time coupon reliability voting ("Did it work?"), coupon code copy tracking, user bookmarking with `localStorage` persistence, and community deal submissions.

---

## 🏗️ System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React + Vite Client                             │
│  - Live Instant Search Bar         - Multi-Faceted Filter Sidebar      │
│  - Interactive Coupon Cards        - Code Reveal Modal + Confetti      │
│  - Saved Deals Drawer (Bookmarks)  - Admin Deal Manager Portal         │
│  - Community Deal Submission Form  - Category & Store Hub Showcase     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / RESTful Requests (JSON)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Express.js REST API                            │
│  - /api/coupons     (Search, Filter, Sort, Pagination, CRUD)           │
│  - /api/coupons/:id/vote & /copy (Reliability feedback & metrics)      │
│  - /api/stores      (Stores catalog + active coupon counter)           │
│  - /api/categories  (Categories + deal count summary)                  │
│  - /api/stats       (Community savings & verification metrics)         │
│  - /api/submissions (User-submitted promo submissions)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Mongoose Queries & Aggregations
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        MongoDB Database Layer                          │
│  Collections:                                                          │
│  • coupons      (title, code, discount, store, category, votes, tags)  │
│  • stores       (name, slug, logo, website, rating, category)          │
│  • categories   (name, slug, icon, color, description)                 │
│  • submissions  (storeName, title, code, discount, submitter, status)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema & Data Models

### 1. Coupon Model (`coupons`)
```javascript
{
  title: String,             // Deal headline (e.g., "40% Off Select Nike Air Max")
  code: String,              // Promo code or blank if direct deal
  discount: String,          // Display discount (e.g., "40% OFF")
  discountValue: Number,     // Numeric discount for sorting
  discountType: String,      // ['percentage', 'fixed', 'free_shipping', 'bogo']
  description: String,       // Summary of deal terms
  storeName: String,         // Store/Brand name (e.g., "Nike")
  storeLogo: String,         // High-res logo URL
  categoryName: String,      // Category name (e.g., "Fashion & Apparel")
  affiliateUrl: String,      // Direct checkout/store URL
  expiryDate: Date,          // Expiration timestamp
  isVerified: Boolean,       // Staff verified indicator
  isExclusive: Boolean,      // Exclusive Grab N Save partnership
  upvotes: Number,           // Community positive success votes
  downvotes: Number,         // Community negative votes
  usedCount: Number,         // Total times coupon copied/clicked
  terms: String,             // Terms & restrictions
  tags: [String],            // Searchable tags
  status: String             // ['active', 'expired', 'pending']
}
```

### 2. Store Model (`stores`)
```javascript
{
  name: String,
  slug: String,
  logo: String,
  website: String,
  description: String,
  category: String,
  featured: Boolean,
  rating: Number
}
```

### 3. Category Model (`categories`)
```javascript
{
  name: String,
  slug: String,
  icon: String,
  description: String,
  color: String
}
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- *(Optional)* **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI. *(Note: If MongoDB is offline, Grab N Save automatically operates in resilient in-memory mode with full functionality!)*

### Installation & Setup

1. **Clone or Navigate to the Project Root**:
   ```bash
   cd grad-n-save
   ```

2. **Install All Dependencies (Root, Server, and Client)**:
   ```bash
   npm run install:all
   ```
   *Or install individually:*
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. **(Optional) Seed MongoDB with Demo Data**:
   ```bash
   npm run seed
   ```

4. **Launch the Full Application (Both Backend & Frontend)**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   - Frontend Application: [http://localhost:5173](http://localhost:5173)
   - Backend REST API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 REST API Reference

| Method | Endpoint | Description | Query / Body Params |
|--------|----------|-------------|---------------------|
| `GET` | `/api/coupons` | Fetch coupons with filtering & pagination | `search`, `category`, `store`, `discountType`, `verifiedOnly`, `sort`, `page`, `limit` |
| `GET` | `/api/coupons/:id` | Fetch single coupon details | `id` (Param) |
| `POST` | `/api/coupons` | Create new verified coupon (Admin) | `title`, `storeName`, `discount`, `code`, etc. |
| `PUT` | `/api/coupons/:id` | Update existing coupon details | `isVerified`, `discount`, `title`, etc. |
| `DELETE` | `/api/coupons/:id` | Delete a coupon | `id` (Param) |
| `POST` | `/api/coupons/:id/vote` | Vote on coupon reliability | `{ type: "up" \| "down" }` |
| `POST` | `/api/coupons/:id/copy` | Track copy action counter | None |
| `GET` | `/api/stores` | Fetch all partnered stores with deal counts | None |
| `GET` | `/api/stores/:slug` | Fetch store detail & active coupons | `slug` (Param) |
| `GET` | `/api/categories` | Fetch categories with deal breakdown | None |
| `GET` | `/api/stats` | Fetch aggregate community metrics | None |
| `POST` | `/api/submissions` | Submit a community-discovered deal | `storeName`, `title`, `discount`, `code`, `categoryName` |

---

## 💻 Tech Stack Summary

- **Frontend**: React 18, Vite 5, Lucide React (Icons), Canvas Confetti, Custom Modern CSS Glassmorphism Design System.
- **Backend**: Node.js, Express.js, Mongoose ODM, CORS, Morgan, Dotenv.
- **Database**: MongoDB with text indexing and aggregation pipelines.
- **Tooling**: Concurrently, Nodemon, NPM Workspaces.

---

## 🎓 Minor Project Presentation Points

1. **Why MERN Stack?**
   - Single language (JavaScript/JSX) across the entire stack simplifies state management and schema alignment.
   - Non-blocking I/O in Node.js paired with MongoDB's document model enables rapid reads for high-traffic coupon discovery.
2. **Key Innovations in Grab N Save**:
   - **Community-driven verification**: Real-time upvote/downvote ratio displays actual coupon validity percentage.
   - **Zero Friction Redemption**: Interactive modal with one-click code copy and simultaneous merchant redirect.
   - **Instant Multi-Filter Pipeline**: Debounced live search combined with store, category, and discount type filters.
   - **Bookmarking Engine**: Persistent saved deals drawer syncing with browser storage.
3. **Resilience Engineering**:
   - Hybrid connection layer ensures demo environments run smoothly regardless of local MongoDB daemon state.
