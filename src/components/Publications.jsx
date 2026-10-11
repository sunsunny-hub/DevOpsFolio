import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { BookOpen, ExternalLink, Calendar, Sparkles } from 'lucide-react';

export default function Publications() {
  return (
    <section id="blogs" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container-max">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#22d3ee',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <BookOpen size={15} />
            Published Tech Articles
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Technical <span className="text-gradient-cyan">Publications & Blogs</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            In-depth architectural guides and tutorials published on Perficient Tech Blog exploring modern DevSecOps, generative AI deployments, Terraform automation, and cloud IoT.
          </p>
        </div>

        {/* Blogs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {portfolioData.publications.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
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
                      padding: '2px 8px',
                      borderRadius: '4px',
                      color: '#94a3b8',
                    }}
                  >
                    {article.publisher}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    lineHeight: 1.35,
                    color: '#fff',
                    transition: 'color 0.2s',
                  }}
                  className="article-title"
                >
                  {article.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                  {article.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {article.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(6, 182, 212, 0.06)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        color: '#67e8f9',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#38bdf8',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Read Full Article</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .glass-panel:hover .article-title {
          color: #38bdf8 !important;
        }
      `}</style>
    </section>
  );
}
