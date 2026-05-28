import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import Loader from './Loader';

function formatDate(dateString) {
  if (!dateString) return '';
  const d = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function CommentItem({ comment, postId, currentUser, onDelete }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  const [showReplies, setShowReplies] = useState(false);
  const textareaRef = useRef(null);
  const isOwner = currentUser?.id === comment.user_id;

  useEffect(() => {
    if (showReply && textareaRef.current) textareaRef.current.focus();
  }, [showReply]);

  const submitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyLoading(true);
    try {
      const res = await api.post(`/posts/${postId}/comments`, {
        content: replyText.trim(),
        parent_id: comment.id,
      });
      setReplies((prev) => [...prev, res.data.comment]);
      setReplyText('');
      setShowReply(false);
      setShowReplies(true);
      toast.success('Reply added!');
    } catch {
      toast.error('Could not post reply');
    } finally {
      setReplyLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${comment.id}`);
      onDelete(comment.id);
      toast.success('Comment deleted');
    } catch {
      toast.error('Could not delete comment');
    }
  };

  return (
    <div className="comment">
      <div className="comment__avatar">
        {comment.author_avatar ? (
          <img src={comment.author_avatar} alt={comment.author_name} />
        ) : (
          <span>{(comment.author_name || 'A').charAt(0).toUpperCase()}</span>
        )}
      </div>
      <div className="comment__body">
        <div className="comment__header">
          <Link to={`/profile/${comment.user_id}`} className="comment__author">
            {comment.author_name || 'Anonymous'}
          </Link>
          <span className="comment__time">{formatDate(comment.created_at)}</span>
        </div>
        <p className="comment__text">{comment.content}</p>
        <div className="comment__actions">
          {currentUser && (
            <button
              className="comment__action-btn"
              onClick={() => setShowReply((v) => !v)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
              </svg>
              Reply
            </button>
          )}
          {replies.length > 0 && (
            <button
              className="comment__action-btn comment__action-btn--toggle"
              onClick={() => setShowReplies((v) => !v)}
            >
              {showReplies ? '▲' : '▼'} {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}
          {isOwner && (
            <button
              className="comment__action-btn comment__action-btn--danger"
              onClick={handleDelete}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              Delete
            </button>
          )}
        </div>

        {/* Reply form */}
        {showReply && (
          <form onSubmit={submitReply} className="comment__reply-form animate-fade-up">
            <textarea
              ref={textareaRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${comment.author_name}…`}
              className="comment__reply-textarea"
              rows={3}
            />
            <div className="comment__reply-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowReply(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={replyLoading || !replyText.trim()}>
                {replyLoading ? 'Posting…' : 'Post Reply'}
              </button>
            </div>
          </form>
        )}

        {/* Nested replies */}
        {showReplies && replies.length > 0 && (
          <div className="comment__replies animate-fade-up">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                postId={postId}
                currentUser={currentUser}
                onDelete={(id) => setReplies((prev) => prev.filter((r) => r.id !== id))}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .comment {
          display: flex;
          gap: 0.875rem;
          padding: 1rem 0;
        }
        .comment__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          flex-shrink: 0;
          overflow: hidden;
          align-self: flex-start;
          margin-top: 2px;
        }
        .comment__avatar img { width: 100%; height: 100%; object-fit: cover; }
        .comment__body { flex: 1; min-width: 0; }
        .comment__header {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 0.375rem;
          flex-wrap: wrap;
        }
        .comment__author {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--ink);
          transition: color var(--transition);
        }
        .comment__author:hover { color: var(--accent); }
        .comment__time {
          font-size: 0.75rem;
          color: var(--muted);
        }
        .comment__text {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--ink-muted);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .comment__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .comment__action-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.78rem;
          font-family: var(--ff-body);
          color: var(--muted);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition);
        }
        .comment__action-btn:hover { color: var(--ink); background: var(--paper-warm); }
        .comment__action-btn--toggle { color: var(--teal); }
        .comment__action-btn--toggle:hover { color: var(--teal); background: rgba(26,107,107,0.08); }
        .comment__action-btn--danger:hover { color: var(--accent); background: var(--accent-pale); }

        .comment__reply-form {
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }
        .comment__reply-textarea {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: var(--paper);
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          font-family: var(--ff-body);
          font-size: 0.875rem;
          color: var(--ink);
          resize: vertical;
          outline: none;
          transition: border-color var(--transition);
        }
        .comment__reply-textarea:focus { border-color: var(--ink-muted); }
        .comment__reply-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        .comment__replies {
          margin-top: 0.875rem;
          padding-left: 1.25rem;
          border-left: 2px solid var(--border);
        }
      `}</style>
    </div>
  );
}

export default function CommentBox({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/posts/${postId}/comments`);
      setComments(res.data.comments || []);
    } catch {
      toast.error('Could not load comments');
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.post(`/posts/${postId}/comments`, {
        content: newComment.trim(),
      });
      setComments((prev) => [res.data.comment, ...prev]);
      setNewComment('');
      toast.success('Comment posted!');
    } catch {
      toast.error('Could not post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const topLevel = comments.filter((c) => !c.parent_id);

  return (
    <section className="commentbox">
      <div className="commentbox__header">
        <h3 className="commentbox__title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Discussion
          {topLevel.length > 0 && (
            <span className="commentbox__count">{topLevel.length}</span>
          )}
        </h3>
      </div>

      {/* Write comment */}
      {user ? (
        <form onSubmit={submitComment} className="commentbox__form animate-fade-up">
          <div className="commentbox__form-top">
            <div className="commentbox__user-avatar">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <span>{user.name?.charAt(0).toUpperCase() || 'Y'}</span>
              )}
            </div>
            <div className="commentbox__form-body">
              <textarea
                ref={textareaRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts…"
                className="commentbox__textarea"
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submitComment(e);
                }}
              />
              <div className="commentbox__form-footer">
                <span className="caption">⌘ + Enter to submit</span>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Posting…
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="commentbox__auth-prompt">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <p>
            <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign in</Link>
            {' '}to join the conversation
          </p>
        </div>
      )}

      {/* Comments list */}
      <div className="commentbox__list">
        {loading ? (
          <div style={{ padding: '2rem 0' }}>
            <Loader text="Loading comments…" />
          </div>
        ) : topLevel.length === 0 ? (
          <div className="commentbox__empty">
            <div className="commentbox__empty-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <p className="commentbox__empty-text">No comments yet.</p>
            <p className="caption">Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="commentbox__comments">
            {topLevel.map((comment, i) => (
              <div
                key={comment.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <CommentItem
                  comment={{
                    ...comment,
                    replies: comments.filter((c) => c.parent_id === comment.id),
                  }}
                  postId={postId}
                  currentUser={user}
                  onDelete={handleDelete}
                />
                {i < topLevel.length - 1 && (
                  <div style={{ height: '1px', background: 'var(--border)' }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .commentbox {
          margin-top: 3rem;
        }
        .commentbox__header {
          margin-bottom: 1.5rem;
        }
        .commentbox__title {
          font-family: var(--ff-display);
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: var(--ink);
        }
        .commentbox__count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 6px;
          background: var(--paper-warm);
          color: var(--muted);
          border-radius: 999px;
          font-family: var(--ff-body);
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* Form */
        .commentbox__form {
          margin-bottom: 2rem;
          padding: 1.25rem;
          background: var(--paper-cool);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          transition: border-color var(--transition);
        }
        .commentbox__form:focus-within {
          border-color: var(--ink-muted);
          box-shadow: 0 0 0 3px rgba(13,13,13,0.05);
        }
        .commentbox__form-top {
          display: flex;
          gap: 0.875rem;
        }
        .commentbox__user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--paper);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          flex-shrink: 0;
          overflow: hidden;
        }
        .commentbox__user-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .commentbox__form-body { flex: 1; min-width: 0; }
        .commentbox__textarea {
          width: 100%;
          background: none;
          border: none;
          outline: none;
          font-family: var(--ff-body);
          font-size: 0.9375rem;
          color: var(--ink);
          line-height: 1.65;
          resize: none;
          padding: 0;
        }
        .commentbox__textarea::placeholder { color: var(--muted); }
        .commentbox__form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        /* Auth prompt */
        .commentbox__auth-prompt {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1.25rem 1.5rem;
          background: var(--paper-cool);
          border: 1.5px dashed var(--border-mid);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
          color: var(--muted);
          font-size: 0.9rem;
        }

        /* Empty */
        .commentbox__empty {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--muted);
        }
        .commentbox__empty-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
        .commentbox__empty-text {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--ink-muted);
          margin-bottom: 0.25rem;
        }
      `}</style>
    </section>
  );
}