import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Send, Linkedin, Github, Check, Copy, MessageSquare, Terminal } from 'lucide-react';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formData }),
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error('Netlify form submission error', error);
        // Fallback open mail client
        window.location.href = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
      });
  };

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
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
            <Mail size={15} />
            Transmission Channel
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Have a DevOps challenge, cloud modernization project, or inquiry? Send a direct dispatch below or reach out directly.
          </p>
        </div>

        {/* Contact Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            maxWidth: '1050px',
            margin: '0 auto',
          }}
        >
          {/* Left Column: Direct Links & Status */}
          <div className="glass-panel" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="pulse-green"></span>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 600 }}>
                  INBOX ACTIVE & MONITORED
                </span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                Let's discuss architecture or collaboration
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '28px' }}>
                Whether you're looking for enterprise cloud consulting, automated CI/CD pipeline modernization, or DevSecOps implementation, I'm always eager to connect.
              </p>

              {/* Direct Email Card */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={20} color="#06b6d4" />
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      DIRECT EMAIL
                    </div>
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      style={{ color: '#fff', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none' }}
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  {copiedEmail ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Social Channels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.76rem', color: '#64748b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Professional Channels:
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={portfolioData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.84rem' }}
                  >
                    <Linkedin size={16} color="#0077b5" />
                    LinkedIn
                  </a>
                  <a
                    href={portfolioData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.84rem' }}
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Timezone badge */}
            <div
              style={{
                marginTop: '30px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: '16px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-faint)',
              }}
            >
              Location: {portfolioData.personal.location} • Timezone: IST (UTC+5:30)
            </div>
          </div>

          {/* Right Column: Netlify Serverless Form */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <Check size={32} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px', color: '#fff' }}>
                  Transmission Dispatched!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '24px' }}>
                  Thank you for reaching out. Your message has been routed to Suraj's inbox. Expect a response shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-secondary"
                  style={{ margin: '0 auto' }}
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      marginBottom: '6px',
                    }}
                  >
                    IDENTIFIER / NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Engineering Lead"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      marginBottom: '6px',
                    }}
                  >
                    RETURN ADDRESS / EMAIL *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      marginBottom: '6px',
                    }}
                  >
                    SUBJECT / PROJECT TYPE *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Cloud Migration / DevSecOps Consulting"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      marginBottom: '6px',
                    }}
                  >
                    PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements or inquiry..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    marginTop: '8px',
                  }}
                >
                  <Send size={16} />
                  Transmit Message (Netlify Serverless)
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
