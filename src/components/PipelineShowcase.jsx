import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GitBranch, Shield, Layers, Server, Activity, CheckCircle2, ChevronRight, Terminal, Play, Pause, RefreshCw, Cpu, Check } from 'lucide-react';

export default function PipelineShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  const stageSnippets = [
    {
      title: "GitHub Actions / Azure DevOps Webhook Trigger",
      stageTag: "COMMIT & PR GATE",
      runnerTime: "0.14s",
      snippet: `name: "DevSecOps Multi-Cloud Delivery"
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

concurrency:
  group: \${{ github.ref }}
  cancel-in-progress: true`,
      highlights: [
        "Automated PR validation with branch protection rules",
        "Deterministic pipeline triggers on tag release",
        "Ephemeral runner provisioning with least-privilege IAM roles"
      ]
    },
    {
      title: "DevSecOps Vulnerability Gating & SAST",
      stageTag: "VULNERABILITY SCAN",
      runnerTime: "0.48s",
      snippet: `- name: Run Trivy Vulnerability Scanner
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs,image'
    severity: 'CRITICAL,HIGH'
    exit-code: '1' # Blocks build on critical CVEs

- name: SonarQube Code Quality Gate
  uses: sonarsource/sonarqube-scan-action@master`,
      highlights: [
        "Blocks builds containing CRITICAL CVE vulnerabilities",
        "Automated secret scanning preventing credential leakage",
        "Python AWS Lambda ingestion of AWS Inspector reports to S3"
      ]
    },
    {
      title: "Multi-Stage Docker Build & Secure Image Signing",
      stageTag: "CONTAINER BUILD",
      runnerTime: "0.52s",
      snippet: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s CMD curl -f http://localhost/ || exit 1`,
      highlights: [
        "Minimal attack surface with distroless/alpine runtimes",
        "Docker layer caching for sub-minute container builds",
        "Automated push to AWS ECR & Azure Container Registry"
      ]
    },
    {
      title: "Terraform IaC Plan & Apply with State Locking",
      stageTag: "IAC PROVISIONING",
      runnerTime: "0.65s",
      snippet: `terraform {
  backend "s3" {
    bucket         = "suraj-tfstate-prod"
    key            = "multi-cloud/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-state-lock"
  }
}

module "enterprise_vpc" {
  source = "./modules/vpc"
  cidr   = "10.0.0.0/16"
  enable_nat_gateway = true
}`,
      highlights: [
        "Remote DynamoDB state locking preventing concurrent writes",
        "Automated speculative plan validation on Pull Requests",
        "Modular VPC, Security Group, and IAM role provisioning"
      ]
    },
    {
      title: "Zero-Downtime Multi-Cloud Deployment",
      stageTag: "K8S ROLLOUT",
      runnerTime: "0.38s",
      snippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-service-prod
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    spec:
      containers:
      - name: app
        image: 73718143.dkr.ecr.ap-south-1.amazonaws.com/app:v2.0`,
      highlights: [
        "Rolling zero-downtime updates across Kubernetes pods",
        "Automated health probes (readiness and liveness endpoints)",
        "Instant automatic rollback on failed health check status"
      ]
    },
    {
      title: "Prometheus & Grafana Observability Telemetry",
      stageTag: "LIVE OBSERVABILITY",
      runnerTime: "0.22s",
      snippet: `scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true`,
      highlights: [
        "Continuous cluster metric scraping and latency tracing",
        "Custom Grafana alerting for SLO/SLA violations",
        "AWS CloudWatch and Azure Monitor unified telemetry"
      ]
    }
  ];

  // Auto-play / Cycle through pipeline stages
  useEffect(() => {
    if (!isPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % portfolioData.pipelineSteps.length);
    }, 4200);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setIsPlaying(false); // Pause on manual inspection
  };

  const currentStage = portfolioData.pipelineSteps[activeStep];
  const currentSnippet = stageSnippets[activeStep];

  return (
    <section id="pipeline" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container-max">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
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
            <GitBranch size={15} />
            CI/CD & DevSecOps Architecture
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Production <span className="text-gradient-cyan">Delivery Lifecycle</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '660px', margin: '0 auto 20px', fontSize: '1rem', lineHeight: 1.6 }}>
            Interactive blueprint of how infrastructure code travels from commit to hardened multi-cloud deployment with automated DevSecOps gates, Terraform IaC, and real-time observability.
          </p>

          {/* Flow Control Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-green"></span>
              <span style={{ color: '#4ade80', fontWeight: 600 }}>LIVE PIPELINE STREAM</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: 'none',
                border: 'none',
                color: isPlaying ? '#38bdf8' : '#94a3b8',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'Auto-Cycle: Active' : 'Auto-Cycle: Paused'}</span>
            </button>
          </div>
        </div>

        {/* Continuous Glowing Pipeline Conduit Bar */}
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          {/* Animated Neon Light Beam */}
          <div className="pipeline-conduit-track">
            <div
              className="pipeline-conduit-pulse"
              style={{
                left: `${(activeStep / (portfolioData.pipelineSteps.length - 1)) * 96}%`,
              }}
            />
          </div>

          {/* Pipeline Steps Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {portfolioData.pipelineSteps.map((step, idx) => {
              const isSelected = idx === activeStep;
              const isPassed = idx < activeStep;
              return (
                <button
                  key={step.step}
                  onClick={() => handleStepClick(idx)}
                  className={`glass-panel pipeline-step-card ${isSelected ? 'step-active' : ''}`}
                  style={{
                    padding: '16px 14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    borderColor: isSelected ? '#06b6d4' : isPassed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.18) 0%, rgba(15, 23, 42, 0.9) 100%)'
                      : 'rgba(13, 19, 34, 0.7)',
                    boxShadow: isSelected ? '0 0 25px rgba(6, 182, 212, 0.3), inset 0 0 15px rgba(6, 182, 212, 0.1)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Progress Beam for Active Step */}
                  {isSelected && <div className="step-active-indicator" />}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: isSelected ? '#38bdf8' : isPassed ? '#10b981' : '#64748b',
                        fontWeight: 700,
                      }}
                    >
                      STAGE {step.step}
                    </span>
                    {isSelected ? (
                      <span className="pulse-cyan"></span>
                    ) : isPassed ? (
                      <Check size={13} color="#10b981" />
                    ) : (
                      <span style={{ fontSize: '0.65rem', color: '#475569', fontFamily: 'var(--font-mono)' }}>WAIT</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {step.name}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: isSelected ? '#67e8f9' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {step.tool.split('•')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Deep Dive Card */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            background: '#090e1a',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.1)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            {/* Left Info Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: '#22d3ee',
                    border: '1px solid rgba(6, 182, 212, 0.35)',
                    padding: '2px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  STAGE {currentStage.step} • {currentSnippet.stageTag}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{currentStage.tool}</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>
                {currentStage.name}
              </h3>

              <p style={{ color: 'var(--text-muted)', marginBottom: '22px', fontSize: '0.98rem', lineHeight: 1.6 }}>
                {currentStage.desc}
              </p>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', marginBottom: '10px', textTransform: 'uppercase' }}>
                  Engineering Safeguards & Standards:
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentSnippet.highlights.map((item, hIdx) => (
                    <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Code / YAML Spec Preview with Runner Telemetry */}
            <div className="terminal-window" style={{ border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <div className="terminal-header" style={{ background: '#0a1020' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={14} color="#06b6d4" />
                  <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>{currentSnippet.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#4ade80',
                      padding: '1px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    RUN: {currentSnippet.runnerTime}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>SPEC</span>
                </div>
              </div>
              <div style={{ padding: '18px', background: '#050811', overflowX: 'auto', position: 'relative' }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', lineHeight: 1.55 }}>
                  {currentSnippet.snippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Pipeline Conduit Track */
        .pipeline-conduit-track {
          position: absolute;
          top: 50%;
          left: 20px;
          right: 20px;
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 9999px;
          transform: translateY(-50%);
          z-index: 1;
        }

        .pipeline-conduit-pulse {
          position: absolute;
          top: -3px;
          width: 30px;
          height: 9px;
          background: radial-gradient(circle, #38bdf8 0%, #06b6d4 50%, transparent 100%);
          box-shadow: 0 0 14px #38bdf8, 0 0 25px #06b6d4;
          border-radius: 9999px;
          transition: left 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pipeline-step-card:hover {
          transform: translateY(-3px);
          border-color: rgba(56, 189, 248, 0.4) !important;
        }

        .step-active {
          transform: translateY(-2px);
        }

        .step-active-indicator {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4, #38bdf8, #2dd4bf);
          box-shadow: 0 0 10px #06b6d4;
          animation: glowTrack 2s linear infinite;
        }

        @keyframes glowTrack {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .pulse-cyan {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #22d3ee;
          box-shadow: 0 0 10px #22d3ee;
          animation: pulseCyanRing 1.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }

        @keyframes pulseCyanRing {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 211, 238, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); }
        }
      `}</style>
    </section>
  );
}
