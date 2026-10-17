import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { resolveAssetUrl } from '../utils';
import { BookOpen, ExternalLink, Calendar, Sparkles, CheckCircle2, ArrowUpRight, Rss } from 'lucide-react';

function normalizeTitle(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function Publications() {
  const [articles, setArticles] = useState(portfolioData.publications || []);
  const [isSynced, setIsSynced] = useState(false);
  const [syncedCount, setSyncedCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchUrl = resolveAssetUrl('perficient_blogs.json');

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((remoteBlogs) => {
        if (!isMounted || !Array.isArray(remoteBlogs) || remoteBlogs.length === 0) return;

        // Remote articles from the RSS feed are the newest and live-synced
        const seen = new Set();
        const merged = [];

        // 1. Add remote articles first
        remoteBlogs.forEach((blog) => {
          const key = normalizeTitle(blog.title);
          seen.add(key);
          merged.push({
            ...blog,
            isAutomated: true
          });
        });

        // 2. Append any existing portfolioData publications not in the feed (preserving history)
        (portfolioData.publications || []).forEach((pub) => {
          const key = normalizeTitle(pub.title);
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(pub);
          }
        });

        setArticles(merged);
        setIsSynced(true);
        setSyncedCount(remoteBlogs.length);
      })
      .catch((err) => {
        // Fallback silently to static portfolioData
        console.warn('Could not load perficient_blogs.json, falling back to static publications:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="blogs" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container-max">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#22d3ee',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '14px',
            }}
          >
            <BookOpen size={15} />
            Published Tech Articles
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Technical <span className="text-gradient-cyan">Publications & Blogs</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 20px', fontSize: '1rem', lineHeight: 1.6 }}>
            In-depth architectural guides, engineering blueprints, and tutorials published on the Perficient Tech Blog exploring modern DevSecOps, generative AI workflows, Terraform automation, and Azure cloud infrastructure.
          </p>

          {/* Sync Status & Author Link Banner */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.84rem',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: isSynced ? '#4ade80' : '#38bdf8',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isSynced ? '#22c55e' : '#38bdf8',
                  boxShadow: isSynced ? '0 0 10px #22c55e' : '0 0 10px #38bdf8',
                  display: 'inline-block',
                }}
                className={isSynced ? 'live-pulse' : ''}
              />
              {isSynced ? `Live Synced with Perficient (${syncedCount} Posts)` : 'Automated Sync Enabled'}
            </span>

            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>

            <a
              href="https://blogs.perficient.com/author/surajthakur/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: '#67e8f9',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                transition: 'color 0.2s',
              }}
              className="perficient-author-link"
            >
              <span>View Perficient Author Archive</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Blogs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '26px',
          }}
        >
          {articles.map((article, index) => (
            <a
              key={article.url || index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel blog-card"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.65)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div>
                {/* Cover Image Header (if present) */}
                {article.coverImage ? (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '190px',
                      overflow: 'hidden',
                      background: 'rgba(2, 6, 23, 0.8)',
                    }}
                  >
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      className="blog-cover-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        border: '1px solid rgba(6, 182, 212, 0.4)',
                        color: '#67e8f9',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Sparkles size={11} />
                      {article.isAutomated ? 'Perficient Post' : 'Featured Blog'}
                    </div>
                  </div>
                ) : null}

                {/* Content Padding */}
                <div style={{ padding: '24px 26px 16px' }}>
                  {/* Meta: Date & Publisher */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#38bdf8',
                      }}
                    >
                      <Calendar size={13} />
                      {article.date}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        color: '#94a3b8',
                      }}
                    >
                      {article.publisher || 'Perficient Tech Blog'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      marginBottom: '12px',
                      lineHeight: 1.4,
                      color: '#fff',
                      transition: 'color 0.2s',
                    }}
                    className="article-title"
                  >
                    {article.title}
                  </h3>

                  {/* Description / Excerpt */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      marginBottom: '20px',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {article.description}
                  </p>

                  {/* Tags */}
                  {Array.isArray(article.tags) && article.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                      {article.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '0.72rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(6, 182, 212, 0.08)',
                            border: '1px solid rgba(6, 182, 212, 0.25)',
                            color: '#67e8f9',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer CTA */}
              <div
                style={{
                  padding: '16px 26px 22px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#38bdf8',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Read Full Article</span>
                <ExternalLink size={14} className="article-arrow" style={{ transition: 'transform 0.2s' }} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .blog-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.4), 0 0 25px rgba(6, 182, 212, 0.15);
        }
        .blog-card:hover .blog-cover-img {
          transform: scale(1.05);
        }
        .blog-card:hover .article-title {
          color: #38bdf8 !important;
        }
        .blog-card:hover .article-arrow {
          transform: translate(3px, -3px);
        }
        .perficient-author-link:hover {
          color: #38bdf8 !important;
          text-decoration: underline;
        }
        @keyframes livePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }
        .live-pulse {
          animation: livePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
