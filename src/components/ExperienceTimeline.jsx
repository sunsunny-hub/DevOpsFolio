import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Building2, Calendar, MapPin, CheckCircle2, GraduationCap } from 'lucide-react';
import { resolveAssetUrl } from '../utils';

export default function ExperienceTimeline() {
  return (
    <section id="experience" style={{ padding: '80px 0', position: 'relative' }}>
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
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#c084fc',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Building2 size={15} />
            Career History & Education
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Work <span className="text-gradient-cyan">Experience & Journey</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Chronological progression from Linux systems administration to multi-cloud enterprise platform engineering.
          </p>
        </div>

        {/* Timeline Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px', margin: '0 auto' }}>
          {portfolioData.experience.map((exp, index) => (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: '30px',
                borderLeft: exp.featured ? '4px solid #06b6d4' : '1px solid var(--border-glass)',
                position: 'relative',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <img
                      src={resolveAssetUrl(exp.logo)}
                      alt={exp.company}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: 600 }}>
                      {exp.company}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Calendar size={13} color="#06b6d4" />
                    {exp.period}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px', lineHeight: 1.6 }}>
                {exp.summary}
              </p>

              {/* Bullet Points */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    <CheckCircle2 size={16} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.2)',
                      color: '#67e8f9',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Education Card */}
          <div
            className="glass-panel"
            style={{
              padding: '28px',
              borderTop: '2px solid #a855f7',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(168, 85, 247, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                }}
              >
                <GraduationCap size={22} color="#c084fc" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                  {portfolioData.education[0].degree}
                </h3>
                <div style={{ color: '#c084fc', fontSize: '0.9rem' }}>
                  {portfolioData.education[0].institution} • {portfolioData.education[0].period} (CGPA {portfolioData.education[0].score})
                </div>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: '58px' }}>
              {portfolioData.education[0].details.map((item, dIdx) => (
                <li key={dIdx} style={{ fontSize: '0.86rem', color: '#94a3b8' }}>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
