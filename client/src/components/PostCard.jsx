import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const CATEGORY_COLORS = {
  technology: 'badge-ink',
  design:     'badge-accent',
  culture:    'badge-gold',
  science:    'badge-teal',
  travel:     'badge-muted',
  art:        'badge-muted',
  default:    'badge-muted',
};

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function readTime(content = '') {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function PostCard({ post, variant = 'default', onLike }) {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [liked, setLiked] = useState(post.user_liked || false);
  const [likeLoading, setLikeLoading] = useState(false);

  const catKey = (post.category || '').toLowerCase();
  const badgeClass = CATEGORY_COLORS[catKey] || CATEGORY_COLORS.default;
  const mins = readTime(post.content);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { toast.error('Sign in to like posts'); return; }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const res = await api.post(`/posts/${post.id}/like`);
      setLiked(res.data.liked);
      setLikeCount(res.data.like_count);
      onLike?.(post.id, res.data.liked, res.data.like_count);
    } catch {
      toast.error('Could not like post');
    } finally {
      setLikeLoading(false);
    }
  };

  if (variant === 'featured') {
    return (
      <article className="postcard postcard--featured">
        <Link to={`/post/${post.id}`} className="postcard__featured-image-wrap">
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className="postcard__featured-image" />
          ) : (
            <div className="postcard__featured-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
          )}
          <div className="postcard__featured-overlay" />
        </Link>
        <div className="postcard__featured-body">
          {post.category && (
            <span className={`badge ${badgeClass}`}>{post.category}</span>
          )}
          <Link to={`/post/${post.id}`}>
            <h2 className="postcard__featured-title">{post.title}</h2>
          </Link>
          {post.excerpt && (
            <p className="postcard__featured-excerpt">{post.excerpt}</p>
          )}
          <div className="postcard__meta">
            <Link to={`/profile/${post.author_id}`} className="postcard__author">
              <div className="postcard__author-avatar">
                {post.author_avatar ? (
                  <img src={post.author_avatar} alt={post.author_name} />
                ) : (
                  <span>{(post.author_name || 'A').charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <span className="postcard__author-name">{post.author_name || 'Anonymous'}</span>
                <span className="postcard__meta-dot">·</span>
                <span className="caption">{formatDate(post.created_at)}</span>
                <span className="postcard__meta-dot">·</span>
                <span className="caption">{mins} min read</span>
              </div>
            </Link>
            <button
              className={`postcard__like ${liked ? 'postcard__like--active' : ''}`}
              onClick={handleLike}
              disabled={likeLoading}
              aria-label="Like post"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="postcard postcard--horizontal">
        <div className="postcard__horizontal-body">
          <div className="postcard__horizontal-top">
            {post.category && (
              <span className={`badge ${badgeClass}`}>{post.category}</span>
            )}
            <span className="caption">{mins} min read</span>
          </div>
          <Link to={`/post/${post.id}`}>
            <h3 className="postcard__horizontal-title">{post.title}</h3>
          </Link>
          {post.excerpt && (
            <p className="postcard__horizontal-excerpt">{post.excerpt}</p>
          )}
          <div className="postcard__meta postcard__meta--sm">
            <Link to={`/profile/${post.author_id}`} className="postcard__author postcard__author--sm">
              <div className="postcard__author-avatar postcard__author-avatar--sm">
                {post.author_avatar ? (
                  <img src={post.author_avatar} alt={post.author_name} />
                ) : (
                  <span>{(post.author_name || 'A').charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="postcard__author-name">{post.author_name || 'Anonymous'}</span>
              <span className="postcard__meta-dot">·</span>
              <span className="caption">{formatDate(post.created_at)}</span>
            </Link>
            <button
              className={`postcard__like ${liked ? 'postcard__like--active' : ''}`}
              onClick={handleLike}
              disabled={likeLoading}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span>{likeCount}</span>
            </button>
          </div>
        </div>
        {post.image_url && (
          <Link to={`/post/${post.id}`} className="postcard__horizontal-image-wrap">
            <img src={post.image_url} alt={post.title} className="postcard__horizontal-image" />
          </Link>
        )}
      </article>
    );
  }

  // Default card
  return (
    <article className="postcard postcard--default card">
      <Link to={`/post/${post.id}`} className="postcard__image-wrap">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="postcard__image" />
        ) : (
          <div className="postcard__image-placeholder">
            <div className="postcard__image-initial">
              {(post.title || 'P').charAt(0)}
            </div>
          </div>
        )}
        {post.category && (
          <span className={`badge ${badgeClass} postcard__category-badge`}>{post.category}</span>
        )}
      </Link>

      <div className="postcard__body">
        <div className="postcard__top">
          <span className="caption">{mins} min read</span>
          <button
            className={`postcard__like ${liked ? 'postcard__like--active' : ''}`}
            onClick={handleLike}
            disabled={likeLoading}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{likeCount}</span>
          </button>
        </div>

        <Link to={`/post/${post.id}`}>
          <h3 className="postcard__title">{post.title}</h3>
        </Link>

        {post.excerpt && (
          <p className="postcard__excerpt">{post.excerpt}</p>
        )}

        <div className="postcard__footer">
          <Link to={`/profile/${post.author_id}`} className="postcard__author postcard__author--sm">
            <div className="postcard__author-avatar postcard__author-avatar--sm">
              {post.author_avatar ? (
                <img src={post.author_avatar} alt={post.author_name} />
              ) : (
                <span>{(post.author_name || 'A').charAt(0).toUpperCase()}</span>
              )}
            </div>
            <span className="postcard__author-name">{post.author_name || 'Anonymous'}</span>
          </Link>
          <span className="caption">{formatDate(post.created_at)}</span>
        </div>
      </div>

      <style>{`
        /* ── PostCard Shared ── */
        .postcard__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          gap: 0.5rem;
        }
        .postcard__meta--sm { margin-top: 0.75rem; }
        .postcard__meta-dot { margin: 0 0.3rem; color: var(--muted); }
        .postcard__author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 0;
        }
        .postcard__author--sm { gap: 0.4rem; }
        .postcard__author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
          overflow: hidden;
        }
        .postcard__author-avatar--sm { width: 24px; height: 24px; font-size: 0.65rem; }
        .postcard__author-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .postcard__author-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--ink-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .postcard__like {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--muted);
          font-size: 0.8rem;
          font-family: var(--ff-body);
          padding: 0.3rem 0.5rem;
          border-radius: var(--radius);
          transition: all var(--transition);
          flex-shrink: 0;
        }
        .postcard__like:hover { color: var(--accent); background: var(--accent-pale); }
        .postcard__like--active { color: var(--accent); }
        .postcard__like:disabled { opacity: 0.6; cursor: default; }

        /* ── Default card ── */
        .postcard--default { cursor: pointer; }
        .postcard__image-wrap {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          display: block;
          background: var(--paper-warm);
        }
        .postcard__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .postcard--default:hover .postcard__image { transform: scale(1.05); }
        .postcard__image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--paper-warm), var(--paper-cool));
        }
        .postcard__image-initial {
          font-family: var(--ff-display);
          font-size: 4rem;
          font-weight: 900;
          color: var(--border-mid);
          text-transform: uppercase;
        }
        .postcard__category-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
        }
        .postcard__body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .postcard__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .postcard__title {
          font-family: var(--ff-display);
          font-size: 1.125rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--ink);
          transition: color var(--transition);
        }
        .postcard__title:hover { color: var(--accent); }
        .postcard__excerpt {
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .postcard__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
          padding-top: 0.875rem;
          border-top: 1px solid var(--border);
        }

        /* ── Featured card ── */
        .postcard--featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--paper-cool);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          transition: all var(--transition);
        }
        .postcard--featured:hover { box-shadow: var(--shadow-xl); transform: translateY(-4px); }
        .postcard__featured-image-wrap {
          position: relative;
          overflow: hidden;
          display: block;
          min-height: 340px;
        }
        .postcard__featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .postcard--featured:hover .postcard__featured-image { transform: scale(1.06); }
        .postcard__featured-placeholder {
          width: 100%;
          height: 100%;
          min-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--paper-warm) 0%, var(--paper-cool) 100%);
        }
        .postcard__featured-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(13,13,13,0.08), transparent);
        }
        .postcard__featured-body {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }
        .postcard__featured-title {
          font-family: var(--ff-display);
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 700;
          line-height: 1.2;
          color: var(--ink);
          transition: color var(--transition);
        }
        .postcard__featured-title:hover { color: var(--accent); }
        .postcard__featured-excerpt {
          font-size: 0.9375rem;
          color: var(--muted);
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Horizontal card ── */
        .postcard--horizontal {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--border);
          align-items: flex-start;
        }
        .postcard--horizontal:last-child { border-bottom: none; }
        .postcard__horizontal-body { flex: 1; min-width: 0; }
        .postcard__horizontal-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .postcard__horizontal-title {
          font-family: var(--ff-display);
          font-size: 1.0625rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--ink);
          transition: color var(--transition);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .postcard__horizontal-title:hover { color: var(--accent); }
        .postcard__horizontal-excerpt {
          font-size: 0.84375rem;
          color: var(--muted);
          line-height: 1.6;
          margin-top: 0.375rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .postcard__horizontal-image-wrap {
          width: 110px;
          height: 80px;
          flex-shrink: 0;
          border-radius: var(--radius);
          overflow: hidden;
          display: block;
          background: var(--paper-warm);
        }
        .postcard__horizontal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .postcard--horizontal:hover .postcard__horizontal-image { transform: scale(1.08); }

        @media (max-width: 768px) {
          .postcard--featured {
            grid-template-columns: 1fr;
          }
          .postcard__featured-image-wrap { min-height: 220px; }
          .postcard__featured-body { padding: 1.5rem; }
        }
      `}</style>
    </article>
  );
}