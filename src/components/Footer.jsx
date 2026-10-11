import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(56, 189, 248, 0.12)',
        background: '#050810',
        padding: '50px 0 30px 0',
        position: 'relative',
      }}
    >
      <div className="container-max">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Terminal size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                {portfolioData.personal.name}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {portfolioData.personal.title}
              </div>
            </div>
          </div>

          {/* Socials & Top Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              title="Send Direct Email"
            >
              <Mail size={18} />
            </a>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{ padding: '8px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
              title="Return to top"
            >
              <ArrowUp size={15} />
              <span>Top</span>
            </button>
          </div>
        </div>

        {/* Telemetry Footer Info */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.76rem',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            Built with React 18 & Vite • Deployed on Netlify Edge CDN • Zero-Downtime Pipeline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-green"></span>
            <span>Cluster Status: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
