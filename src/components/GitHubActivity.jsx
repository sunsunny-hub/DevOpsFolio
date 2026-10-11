import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GitFork, Star, ExternalLink, Code2, GitBranch } from 'lucide-react';

export default function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackRepos = [
    {
      name: 'DevOpsFolio',
      description: 'Production DevOps & Multi-Cloud portfolio platform showcasing CI/CD architectures and enterprise case studies.',
      language: 'React / Vite',
      stargazers_count: 5,
      forks_count: 2,
      html_url: 'https://github.com/sunsunny-hub/DevOpsFolio',
    },
    {
      name: 'house-price-predictor',
      description: 'Machine Learning app for MLOps automated pipeline deployment created with School of DevOps.',
      language: 'Python',
      stargazers_count: 3,
      forks_count: 1,
      html_url: 'https://github.com/sunsunny-hub/house-price-predictor',
    },
    {
      name: 'Chatbot-UIv2',
      description: 'Full-featured enterprise conversational chatbot frontend with containerized DevSecOps integration.',
      language: 'TypeScript',
      stargazers_count: 2,
      forks_count: 1,
      html_url: 'https://github.com/sunsunny-hub/Chatbot-UIv2',
    },
    {
      name: 'learning-python-3980343',
      description: 'Automation and utility scripts for cloud infrastructure management.',
      language: 'Python',
      stargazers_count: 1,
      forks_count: 0,
      html_url: 'https://github.com/sunsunny-hub/learning-python-3980343',
    },
    {
      name: 'cognitive-services-quickstart-code',
      description: 'Cloud cognitive service architectures and integration samples.',
      language: 'Python / Bash',
      stargazers_count: 1,
      forks_count: 0,
      html_url: 'https://github.com/sunsunny-hub/cognitive-services-quickstart-code',
    },
    {
      name: 'helloUiPath-sample',
      description: 'RPA workflow integration and automated trigger testing.',
      language: 'Shell',
      stargazers_count: 1,
      forks_count: 0,
      html_url: 'https://github.com/sunsunny-hub/helloUiPath-sample',
    },
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/sunsunny-hub/repos?sort=updated&per_page=6')
      .then((res) => {
        if (!res.ok) throw new Error('Network error or rate limit');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((r) => ({
            name: r.name,
            description: r.description || 'DevOps infrastructure automation and configuration repository.',
            language: r.language || 'Config / Shell',
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            html_url: r.html_url,
          }));
          setRepos(formatted);
        } else {
          setRepos(fallbackRepos);
        }
        setLoading(false);
      })
      .catch(() => {
        setRepos(fallbackRepos);
        setLoading(false);
      });
  }, []);

  return (
    <section id="github" style={{ padding: '80px 0', position: 'relative' }}>
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
            <GitBranch size={15} />
            Open Source & Repositories
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Live <span className="text-gradient-cyan">GitHub Activity</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Real-time feed connected to @sunsunny-hub GitHub profile with recent open-source repositories, IaC boilerplates, and automation scripts.
          </p>
        </div>

        {/* Repositories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code2 size={18} color="#06b6d4" />
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink size={15} color="#64748b" />
                </div>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
                  {repo.description}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '14px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94a3b8',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}></span>
                  {repo.language}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={13} color="#f59e0b" />
                    {repo.stargazers_count}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitFork size={13} color="#38bdf8" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Profile CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit Full GitHub Profile (@sunsunny-hub)
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
