/**
 * Loader — versatile loading component
 *
 * Variants:
 *   "spinner"  — ink rotating arc  (default)
 *   "dots"     — three bouncing dots
 *   "skeleton" — shimmer placeholder blocks
 *   "page"     — full‑page centred spinner
 *   "inline"   — tiny inline spinner for buttons
 */
export default function Loader({ variant = 'spinner', text = '', size = 'md', className = '' }) {
  if (variant === 'page') {
    return (
      <div className={`loader-page ${className}`}>
        <div className="loader-page__inner">
          <div className="loader-spinner loader-spinner--lg" />
          {text && <p className="loader-page__text">{text}</p>}
        </div>

        <style>{`
          .loader-page {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--paper);
            z-index: 9998;
          }
          .loader-page__inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
          .loader-page__text {
            font-family: var(--ff-display);
            font-size: 1rem;
            font-style: italic;
            color: var(--muted);
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`loader-dots ${className}`}>
        <span />
        <span />
        <span />

        <style>{`
          .loader-dots {
            display: inline-flex;
            align-items: center;
            gap: 5px;
          }
          .loader-dots span {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--ink-muted);
            animation: loader-bounce 1.2s ease-in-out infinite;
          }
          .loader-dots span:nth-child(2) { animation-delay: 0.2s; }
          .loader-dots span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes loader-bounce {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
            40%            { transform: scale(1);   opacity: 1;   }
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className={`loader-skeleton-wrap ${className}`}>
        {/* Simulated post card skeleton */}
        <div className="loader-skeleton-card">
          <div className="skeleton" style={{ height: '200px', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="skeleton" style={{ height: '12px', width: '30%' }} />
            <div className="skeleton" style={{ height: '20px', width: '85%' }} />
            <div className="skeleton" style={{ height: '20px', width: '65%' }} />
            <div className="skeleton" style={{ height: '14px', width: '90%' }} />
            <div className="skeleton" style={{ height: '14px', width: '70%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="skeleton" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                <div className="skeleton" style={{ width: '80px', height: '12px' }} />
              </div>
              <div className="skeleton" style={{ width: '60px', height: '12px' }} />
            </div>
          </div>
        </div>

        <style>{`
          .loader-skeleton-wrap {}
          .loader-skeleton-card {
            background: var(--paper-cool);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <span className={`loader-inline ${className}`}>
        <style>{`
          .loader-inline {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 2px solid currentColor;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.65s linear infinite;
          }
        `}</style>
      </span>
    );
  }

  // Default: spinner
  const sizeMap = { sm: 24, md: 36, lg: 52 };
  const px = sizeMap[size] || sizeMap.md;

  return (
    <div className={`loader-wrap loader-wrap--${size} ${className}`}>
      <div
        className="loader-spinner"
        style={{ width: px, height: px }}
      />
      {text && <p className="loader-text">{text}</p>}

      <style>{`
        .loader-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          padding: 1rem;
        }
        .loader-spinner {
          border-radius: 50%;
          border: 2px solid var(--border-mid);
          border-top-color: var(--ink);
          animation: spin 0.75s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
        }
        .loader-spinner--lg {
          width: 52px;
          height: 52px;
          border-width: 3px;
          border-top-color: var(--accent);
        }
        .loader-text {
          font-size: 0.84375rem;
          color: var(--muted);
          font-style: italic;
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/**
 * SkeletonGrid — renders N skeleton cards in a responsive grid
 */
export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <Loader key={i} variant="skeleton" />
      ))}

      <style>{`
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
}

/**
 * ContentLoader — inline section loader (spinner + message)
 */
export function ContentLoader({ text = 'Loading…', height = '240px' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height,
      }}
    >
      <Loader variant="spinner" text={text} size="md" />
    </div>
  );
}