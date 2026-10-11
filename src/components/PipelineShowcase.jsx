import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { GitBranch, Shield, Layers, Server, Activity, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export default function PipelineShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  const stageSnippets = [
    {
      title: "GitHub Actions / Azure DevOps Webhook Trigger",
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

  const currentStage = portfolioData.pipelineSteps[activeStep];
  const currentSnippet = stageSnippets[activeStep];

  return (
    <section id="pipeline" style={{ padding: '80px 0', position: 'relative' }}>
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
            <GitBranch size={15} />
            CI/CD & DevSecOps Architecture
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            Production <span className="text-gradient-cyan">Delivery Lifecycle</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
            Interactive blueprint of how code travels from commit to hardened multi-cloud deployment with automated DevSecOps gates, Terraform IaC, and real-time observability.
          </p>
        </div>

        {/* Pipeline Steps Flow Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '30px',
          }}
        >
          {portfolioData.pipelineSteps.map((step, idx) => {
            const isSelected = idx === activeStep;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className="glass-panel"
                style={{
                  padding: '16px 14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderColor: isSelected ? '#06b6d4' : 'rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(13, 19, 34, 0.6)',
                  boxShadow: isSelected ? '0 0 20px rgba(6, 182, 212, 0.25)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: isSelected ? '#38bdf8' : '#64748b',
                      fontWeight: 700,
                    }}
                  >
                    STAGE {step.step}
                  </span>
                  {isSelected && <span className="pulse-green"></span>}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  {step.name}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {step.tool.split('•')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep Dive Card */}
        <div
          className="glass-panel"
          style={{
            padding: '32px',
            background: '#090e1a',
            border: '1px solid rgba(56, 189, 248, 0.3)',
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
            {/* Left Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span
                  style={{
                    background: 'rgba(6, 182, 212, 0.2)',
                    color: '#22d3ee',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  STAGE {currentStage.step}
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
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentSnippet.highlights.map((item, hIdx) => (
                    <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Code / YAML Spec Preview */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={14} color="#06b6d4" />
                  <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>{currentSnippet.title}</span>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>SPEC FILE</span>
              </div>
              <div style={{ padding: '16px', background: '#070b14', overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', lineHeight: 1.5 }}>
                  {currentSnippet.snippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
