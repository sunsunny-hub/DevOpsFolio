import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Layers, Cloud, Box, FileCode, GitBranch, Activity } from 'lucide-react';

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...portfolioData.skillCategories.map((c) => c.name)];

  const filteredCategories =
    selectedCategory === 'All'
      ? portfolioData.skillCategories
      : portfolioData.skillCategories.filter((c) => c.name === selectedCategory);

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Cloud & Infrastructure':
        return <Cloud size={18} color="#38bdf8" />;
      case 'Containers & Orchestration':
        return <Box size={18} color="#06b6d4" />;
      case 'IaC & Automation':
        return <FileCode size={18} color="#a855f7" />;
      case 'CI/CD & DevSecOps':
        return <GitBranch size={18} color="#10b981" />;
      case 'Observability & Databases':
        return <Activity size={18} color="#f59e0b" />;
      default:
        return <Layers size={18} color="#38bdf8" />;
    }
  };

  return (
    <section id="skills" style={{ padding: '80px 0', position: 'relative' }}>
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
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            <Layers size={15} />
            Technical Stack & Competencies
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Enterprise <span className="text-gradient-cyan">Skill Matrix</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Comprehensive toolkit spanning multi-cloud platforms, immutable containers, declarative infrastructure, DevSecOps pipelines, and production telemetry.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: isSelected ? '#fff' : '#94a3b8',
                  boxShadow: isSelected ? '0 0 15px rgba(6, 182, 212, 0.3)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="glass-panel"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {getCategoryIcon(category.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                    {category.name}
                  </h3>
                  <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)' }}>
                    {category.skills.length} core tools
                  </span>
                </div>
              </div>

              {/* Skills list with proficiency meters */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                      <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{skill.name}</span>
                      <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        {skill.level}%
                      </span>
                    </div>
                    {/* Meter bar */}
                    <div
                      style={{
                        height: '6px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, #0284c7 0%, #06b6d4 100%)',
                          borderRadius: '9999px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
