import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { CouponProvider } from './context/CouponContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CouponProvider>
        <App />
      </CouponProvider>
    </AuthProvider>
  </React.StrictMode>
);
