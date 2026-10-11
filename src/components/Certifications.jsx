import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, ExternalLink, ShieldCheck, Trophy, Sparkles, BookOpen } from 'lucide-react';

export default function Certifications() {
  const ms = portfolioData.microsoftLearn;

  return (
    <section id="certifications" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container-max">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 14px',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#f59e0b',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Award size={15} />
            7x Global Cloud & Security Credentials
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Multi-Cloud <span className="text-gradient-multi">Global Certifications</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '1rem' }}>
            Official credentials earned across AWS, Google Cloud, Microsoft Azure, SecOps (SC-200), and AI DevOps (GitHub Copilot), verifying hands-on architecture, perimeter security, and cloud governance.
          </p>
        </div>

        {/* Microsoft Learn Official Gamification & Achievement Highlight Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '24px 30px',
            marginBottom: '40px',
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(13, 19, 34, 0.8) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              }}
            >
              <Trophy size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                  Microsoft Learn Verified Profile
                </span>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  surajsingh-5992
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
                Top-tier technical achievement on Microsoft Learn platform with continuous skills validation.
              </p>
            </div>
          </div>

          {/* Gamification Stats */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '0 10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>
                Level {ms.level}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                {ms.xp}
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ textAlign: 'center', padding: '0 10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>
                {ms.badges}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                Badges Earned
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ textAlign: 'center', padding: '0 10px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>
                {ms.trophies}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                Trophies
              </div>
            </div>

            <a
              href={ms.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 16px', marginLeft: '10px' }}
            >
              Inspect Learn Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Certifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '24px',
          }}
        >
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top edge accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: cert.accentColor || '#38bdf8',
                }}
              />

              <div>
                {/* Header with Badge Image and Verified Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <img
                      src={cert.badgeImg}
                      alt={cert.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      <ShieldCheck size={13} />
                      Verified
                    </span>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      {cert.status || 'Active'}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  {cert.issuer} • {cert.level}
                </div>

                <h3 style={{ fontSize: '1.22rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3 }}>
                  {cert.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: '0.74rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#cbd5e1',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential Verification Button */}
              <div>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.84rem',
                    padding: '8px 14px',
                  }}
                >
                  Verify Official Credential
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
