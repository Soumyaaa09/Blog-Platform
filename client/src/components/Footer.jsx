import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    setEmail('');
    toast.success('You\'re on the list!');
  };

  const year = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: 'Explore', to: '/blogs' },
      { label: 'Write', to: '/create' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
    Company: [
      { label: 'About', to: '/about' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
    Connect: [
      { label: 'Twitter', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'RSS Feed', href: '#' },
    ],
  };

  const categories = ['Technology', 'Design', 'Culture', 'Science', 'Travel', 'Art'];

  return (
    <footer className="footer">
      {/* Top strip */}
      <div className="footer__stripe" />

      <div className="container">
        {/* Newsletter band */}
        <div className="footer__newsletter animate-fade-up">
          <div className="footer__newsletter-content">
            <p className="subheading">Weekly Digest</p>
            <h2 className="footer__newsletter-title">
              Stories worth reading,<br />
              <em>curated for you</em>
            </h2>
          </div>
          <form
            className="footer__newsletter-form"
            onSubmit={handleSubscribe}
          >
            {subscribed ? (
              <div className="footer__subscribed">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                You're subscribed!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer__newsletter-input"
                />
                <button type="submit" className="btn btn-accent">
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* Main footer grid */}
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">✦</span>
              <span>Inkwell</span>
            </Link>
            <p className="footer__tagline">
              A home for ideas worth sharing. Write, discover, and connect with curious minds.
            </p>
            <div className="footer__social">
              {[
                { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { label: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
                { label: 'RSS', path: 'M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16' + ' M4.5 20.5 A.5.5 0 0 1 5 20 .5.5 0 0 1 5.5 20.5 .5.5 0 0 1 5 21 .5.5 0 0 1 4.5 20.5z' },
              ].map(({ label, path }) => (
                <a key={label} href="#" className="footer__social-link" aria-label={label}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {links.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="footer__link">{label}</Link>
                    ) : (
                      <a href={href} className="footer__link" target="_blank" rel="noopener noreferrer">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categories row */}
        <div className="footer__categories">
          <span className="subheading" style={{ marginRight: '1rem' }}>Topics</span>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat.toLowerCase()}`}
              className="footer__category-tag"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="caption">
            © {year} Inkwell. Crafted with care for writers everywhere.
          </p>
          <div className="footer__bottom-ornament">
            <span className="footer__dot" />
            <span className="footer__dot" />
            <span className="footer__dot" />
          </div>
          <p className="caption">
            Built with React & Supabase
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--ink);
          color: var(--paper);
          padding-top: 0;
          margin-top: 6rem;
          position: relative;
        }
        .footer__stripe {
          height: 4px;
          background: linear-gradient(90deg, var(--accent), var(--gold), var(--teal), var(--accent));
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }

        /* Newsletter */
        .footer__newsletter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 3.5rem 0;
          border-bottom: 1px solid rgba(245,240,232,0.1);
          flex-wrap: wrap;
        }
        .footer__newsletter .subheading { color: var(--accent); }
        .footer__newsletter-title {
          font-family: var(--ff-display);
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700;
          line-height: 1.2;
          color: var(--paper);
          margin-top: 0.375rem;
        }
        .footer__newsletter-title em {
          font-style: italic;
          color: var(--gold);
        }
        .footer__newsletter-form {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .footer__newsletter-input {
          padding: 0.7rem 1.1rem;
          background: rgba(245,240,232,0.08);
          border: 1.5px solid rgba(245,240,232,0.15);
          border-radius: var(--radius);
          color: var(--paper);
          font-family: var(--ff-body);
          font-size: 0.9rem;
          min-width: 240px;
          outline: none;
          transition: all var(--transition);
        }
        .footer__newsletter-input:focus {
          background: rgba(245,240,232,0.12);
          border-color: rgba(245,240,232,0.35);
        }
        .footer__newsletter-input::placeholder { color: rgba(245,240,232,0.4); }
        .footer__subscribed {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gold);
          font-weight: 500;
        }

        /* Grid */
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          padding: 3rem 0 2rem;
        }

        /* Brand */
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--ff-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--paper);
          margin-bottom: 1rem;
        }
        .footer__logo-mark { color: var(--accent); }
        .footer__tagline {
          font-size: 0.875rem;
          color: rgba(245,240,232,0.55);
          line-height: 1.7;
          max-width: 260px;
          margin-bottom: 1.5rem;
        }
        .footer__social {
          display: flex;
          gap: 0.5rem;
        }
        .footer__social-link {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(245,240,232,0.08);
          border: 1px solid rgba(245,240,232,0.12);
          border-radius: 50%;
          color: rgba(245,240,232,0.6);
          transition: all var(--transition);
        }
        .footer__social-link:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Columns */
        .footer__col-title {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.45);
          margin-bottom: 1.25rem;
        }
        .footer__col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer__link {
          font-size: 0.875rem;
          color: rgba(245,240,232,0.6);
          transition: color var(--transition);
          position: relative;
          padding-left: 0;
        }
        .footer__link::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 1px;
          background: var(--accent);
          vertical-align: middle;
          margin-right: 0;
          transition: all var(--transition);
        }
        .footer__link:hover { color: var(--paper); }
        .footer__link:hover::before { width: 12px; margin-right: 6px; }

        /* Categories */
        .footer__categories {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(245,240,232,0.08);
          border-bottom: 1px solid rgba(245,240,232,0.08);
        }
        .footer__category-tag {
          font-size: 0.78rem;
          padding: 0.3rem 0.75rem;
          border: 1px solid rgba(245,240,232,0.15);
          border-radius: 999px;
          color: rgba(245,240,232,0.55);
          transition: all var(--transition);
        }
        .footer__category-tag:hover {
          border-color: var(--accent);
          color: var(--paper);
          background: rgba(200,73,10,0.15);
        }

        /* Bottom */
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0 2rem;
          color: rgba(245,240,232,0.35);
        }
        .footer__bottom-ornament {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }
        .footer__dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(245,240,232,0.25);
        }

        @media (max-width: 900px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer__brand { grid-column: 1 / -1; }
          .footer__newsletter { flex-direction: column; align-items: flex-start; }
          .footer__newsletter-input { min-width: 200px; }
        }
        @media (max-width: 540px) {
          .footer__grid { grid-template-columns: 1fr; }
          .footer__bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
}