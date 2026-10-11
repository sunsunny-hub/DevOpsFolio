import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, FileText, Download, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '520px',
          width: '100%',
          background: '#0a0f1d',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22d3ee',
              border: '1px solid rgba(6, 182, 212, 0.3)',
            }}
          >
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
              Engineering Resume & CV
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              Suraj Singh Thakur • DevOps Engineer
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
          Access the current resume or request an updated 2026 copy directly tailored to your organization's multi-cloud & platform engineering requirements.
        </p>

        {/* Options Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {/* Primary View Drive Resume */}
          <a
            href={portfolioData.personal.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ justifyContent: 'center', padding: '12px' }}
          >
            <Download size={16} />
            View / Download Online Resume
            <ExternalLink size={14} />
          </a>

          {/* Request Updated Resume via Email */}
          <a
            href={`mailto:${portfolioData.personal.email}?subject=Requesting%20Updated%20DevOps%20Resume%20-%20Suraj%20Singh%20Thakur&body=Hi%20Suraj,%0A%0AWe%20reviewed%20your%20portfolio%20and%20would%20like%20to%20request%20your%20latest%20updated%20resume%20for%20an%20opportunity.%0A%0AThanks!`}
            className="btn-secondary"
            style={{ justifyContent: 'center', padding: '12px' }}
          >
            <Mail size={16} color="#06b6d4" />
            Request Latest 2026 PDF by Email
          </a>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ShieldCheck size={16} color="#10b981" />
          <span>Security Clearance & NDA Compliant Enterprise Profiles</span>
        </div>
      </div>
    </div>
  );
}
