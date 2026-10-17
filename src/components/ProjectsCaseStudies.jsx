import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, ExternalLink, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { resolveAssetUrl } from '../utils';

export default function ProjectsCaseStudies() {
  return (
    <section id="projects" style={{ padding: '80px 0', position: 'relative' }}>
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
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Briefcase size={15} />
            Enterprise Engagements
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Production <span className="text-gradient-cyan">Client Case Studies</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Real-world systems, cloud migrations, API gateway architectures, and automated infrastructure engineered for Fortune 500 and high-growth enterprise clients.
          </p>
        </div>

        {/* Client Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {portfolioData.clientProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* Header with Client Logo & Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div
                    style={{
                      height: '42px',
                      maxWidth: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <img
                      src={resolveAssetUrl(project.logo)}
                      alt={project.client}
                      style={{ maxHeight: '28px', maxWidth: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  Client: <strong style={{ color: '#fff' }}>{project.client}</strong> • {project.category}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.35, color: '#f8fafc' }}>
                  {project.projectTitle}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  {project.description}
                </p>

                {/* Impact callout */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderLeft: '3px solid #10b981',
                    padding: '8px 12px',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.82rem',
                    color: '#a7f3d0',
                    marginBottom: '18px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ⚡ {project.impact}
                </div>

                {/* Tech stack pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer link */}
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    fontSize: '0.82rem',
                    padding: '6px 12px',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  Visit Client Portal
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
