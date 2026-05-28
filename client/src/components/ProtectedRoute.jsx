import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader variant="page" text="Checking credentials…" />;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
}

/**
 * GuestRoute — redirects authenticated users away from auth pages
 */
export function GuestRoute({ children, redirectTo = '/dashboard' }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader variant="page" text="One moment…" />;
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

/**
 * RouteGuard — shows an inline "sign in" prompt instead of redirecting
 */
export function RouteGuard({ children, message = 'You need to sign in to access this page.' }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader variant="spinner" text="Verifying session…" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="route-guard">
        <div className="route-guard__card animate-scale-in">
          <div className="route-guard__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="route-guard__title">Members Only</h2>
          <p className="route-guard__message">{message}</p>
          <div className="route-guard__actions">
            <a href={`/login?redirect=${encodeURIComponent(location.pathname)}`} className="btn btn-primary btn-lg">
              Sign in
            </a>
            <a href="/register" className="btn btn-outline btn-lg">
              Create account
            </a>
          </div>
          <p className="route-guard__footer caption">
            It's free and takes less than a minute.
          </p>
        </div>

        <style>{`
          .route-guard {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .route-guard__card {
            text-align: center;
            max-width: 420px;
            width: 100%;
            padding: 3rem 2.5rem;
            background: var(--paper-cool);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
          }
          .route-guard__icon {
            width: 64px;
            height: 64px;
            background: var(--paper-warm);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--muted);
          }
          .route-guard__title {
            font-family: var(--ff-display);
            font-size: 1.625rem;
            font-weight: 700;
            color: var(--ink);
            margin-bottom: 0.75rem;
          }
          .route-guard__message {
            font-size: 0.9375rem;
            color: var(--muted);
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .route-guard__actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .route-guard__actions .btn {
            justify-content: center;
          }
          .route-guard__footer {
            margin-top: 1.25rem;
          }
        `}</style>
      </div>
    );
  }

  return children;
}