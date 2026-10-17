import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Shield, Cloud, Server, ExternalLink, ArrowRight, Play, Pause, CheckCircle, Code, Copy, Check, Sparkles } from 'lucide-react';

const TAGLINE_ITEMS = [
  'Triple-Cloud Certified (AWS • Azure • GCP)',
  'Zero-Downtime CI/CD Pipeline Architect',
  'Automated Terraform Infrastructure as Code',
  'DevSecOps Compliance & Vulnerability Gating',
  'Kubernetes & Cloud-Native Containerization',
];

const DEMO_COMMANDS = [
  {
    cmd: 'terraform plan -out=tfplan',
    output: `Terraform Execution Plan:
  # module.vpc.aws_vpc.prod will be created (10.0.0.0/16)
  # module.k8s.aws_eks_cluster.core will be created (Kubernetes v1.30)
  # module.security.waf_shield.rules will be configured
Plan: 18 to add, 0 to change, 0 to destroy.
State lock acquired in DynamoDB [ap-south-1]. Ready for apply.`,
  },
  {
    cmd: 'trivy image --severity HIGH,CRITICAL suraj/cloud-api:latest',
    output: `Scanning 184 OS & library dependencies...
✓ OS Vulnerabilities: 0 Critical, 0 High
✓ Secret Leak Detection: Clean (No tokens found)
✓ DevSecOps Quality Gate: PASSED (Release Approved)`,
  },
  {
    cmd: 'kubectl rollout status deployment/platform-api -n prod',
    output: `Waiting for deployment "platform-api" rollout to finish: 1 of 5 updated replicas are available...
Waiting for deployment "platform-api" rollout to finish: 3 of 5 updated replicas are available...
✓ deployment "platform-api" successfully rolled out [5/5 replicas healthy]`,
  },
  {
    cmd: 'curl -I https://iam-surajsinghthakur.netlify.app/health',
    output: `HTTP/2 200 OK
server: Netlify Serverless Edge
x-cluster-status: 100% operational | 46 microservices active
x-response-time: 14ms (Global CDN Edge Cache HIT)`,
  },
];

export default function Hero({ onOpenResume }) {
  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Initializing cloud session for cluster suraj-prod-01...' },
    { type: 'system', text: 'Connected to AWS ap-south-1 | Azure West-US | GCP asia-south1' },
    { type: 'command', text: 'suraj --summary' },
    {
      type: 'output',
      text: 'Suraj Singh Thakur: DevOps & Multi-Cloud Engineer @ Perficient Inc\nTriple-Cloud Certified: AWS • Azure • GCP | DevSecOps & Terraform Expert',
    },
  ]);
  const [isAutoTyping, setIsAutoTyping] = useState(true);
  const [typingCommandText, setTypingCommandText] = useState('');
  const [copied, setCopied] = useState(false);

  // Tagline typewriter state
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineText, setTaglineText] = useState('');
  const [isDeletingTagline, setIsDeletingTagline] = useState(false);

  const terminalBodyRef = useRef(null);
  const autoTypeTimeoutRef = useRef(null);
  const demoCommandIndexRef = useRef(0);

  // Auto-scroll terminal on new history
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, typingCommandText]);

  // Tagline Typewriter Effect
  useEffect(() => {
    const currentFullText = TAGLINE_ITEMS[taglineIndex];
    let speed = isDeletingTagline ? 35 : 75;

    if (!isDeletingTagline && taglineText === currentFullText) {
      speed = 2200; // Pause at full word
    } else if (isDeletingTagline && taglineText === '') {
      speed = 400; // Pause before typing next word
    }

    const timer = setTimeout(() => {
      if (!isDeletingTagline && taglineText === currentFullText) {
        setIsDeletingTagline(true);
      } else if (isDeletingTagline && taglineText === '') {
        setIsDeletingTagline(false);
        setTaglineIndex((prev) => (prev + 1) % TAGLINE_ITEMS.length);
      } else if (isDeletingTagline) {
        setTaglineText(currentFullText.substring(0, taglineText.length - 1));
      } else {
        setTaglineText(currentFullText.substring(0, taglineText.length + 1));
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [taglineText, isDeletingTagline, taglineIndex]);

  // Terminal Auto-Typing Stream Loop
  useEffect(() => {
    if (!isAutoTyping) {
      setTypingCommandText('');
      return;
    }

    let charIndex = 0;
    const currentDemo = DEMO_COMMANDS[demoCommandIndexRef.current % DEMO_COMMANDS.length];
    const fullCmd = currentDemo.cmd;

    // Step 1: Type the command character by character
    const typeInterval = setInterval(() => {
      if (charIndex <= fullCmd.length) {
        setTypingCommandText(fullCmd.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Step 2: Brief pause before executing
        autoTypeTimeoutRef.current = setTimeout(() => {
          setTerminalHistory((prev) => {
            const nextHistory = [
              ...prev.slice(-8), // Keep last 8 entries clean
              { type: 'command', text: fullCmd },
              { type: 'output', text: currentDemo.output },
            ];
            return nextHistory;
          });
          setTypingCommandText('');
          demoCommandIndexRef.current++;

          // Step 3: Wait 4.5 seconds before typing next demo command
          autoTypeTimeoutRef.current = setTimeout(() => {
            // Triggers next loop cycle via state update
            setIsAutoTyping((curr) => curr);
          }, 4500);
        }, 600);
      }
    }, 65);

    return () => {
      clearInterval(typeInterval);
      if (autoTypeTimeoutRef.current) clearTimeout(autoTypeTimeoutRef.current);
    };
  }, [isAutoTyping, demoCommandIndexRef.current]);

  const quickCommands = [
    'kubectl get certs',
    'terraform plan',
    'cat skills.json',
    'history -clients',
  ];

  const handleCommandExecution = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Pause auto-typing when user manually executes
    setIsAutoTyping(false);
    setTypingCommandText('');

    const lower = trimmed.toLowerCase();
    let response = '';

    if (lower === 'clear' || lower === 'cls') {
      setTerminalHistory([]);
      return;
    } else if (lower.includes('help')) {
      response = `Available commands:
  • kubectl get certs  - View verified AWS, GCP & Azure certifications
  • terraform plan     - Preview infrastructure architecture
  • cat skills.json    - Display core technical proficiencies
  • history -clients   - Inspect enterprise client work (Qualcomm, RK Holdings, Leadiant)
  • status             - Check live Netlify & cloud cluster telemetry
  • autotype on/off    - Toggle terminal command simulator
  • clear              - Reset terminal console`;
    } else if (lower === 'autotype on') {
      setIsAutoTyping(true);
      response = 'Terminal automated command stream resumed.';
    } else if (lower === 'autotype off') {
      setIsAutoTyping(false);
      response = 'Terminal automated command stream paused. Manual mode active.';
    } else if (lower.includes('cert') || lower.includes('kubectl')) {
      response = `GLOBAL CREDENTIALS VERIFIED [7 Active | MS Learn Level 13]:
  1. AWS Certified Solutions Architect (Associate) -> Credly Verified
  2. Google Cloud Associate Cloud Engineer (GCP ACE) -> Credential Verified
  3. Microsoft Certified: Azure Security Engineer (AZ-500) -> MS Learn Verified
  4. Microsoft Certified: Security Operations Analyst (SC-200) -> MS Learn Verified
  5. GitHub Copilot Certified Specialist (2026-2028) -> Active & Online Verifiable
  6. Microsoft Certified: Azure Administrator (AZ-104) -> Credly Verified
  7. Microsoft Certified: Azure Fundamentals (AZ-900) -> MS Learn Verified
  • Microsoft Learn Stats: Level 13 | 251 Badges | 37 Trophies | 351,400+ XP`;
    } else if (lower.includes('terraform') || lower.includes('plan')) {
      response = `Terraform will perform the following actions:
  # module.vpc.aws_vpc.prod will be created
  # module.k8s.aws_eks_cluster.core will be created
  # module.security.devsecops_waf.rules will be configured
  Plan: 18 to add, 0 to change, 0 to destroy.
  Apply complete! Resources: 18 added, 0 changed.`;
    } else if (lower.includes('skill') || lower.includes('json')) {
      response = `{
  "cloud": ["AWS", "Microsoft Azure", "Google Cloud"],
  "iac": ["Terraform", "Ansible", "ARM Templates"],
  "containers": ["Docker", "Kubernetes", "ECR", "ACR"],
  "ci_cd": ["GitHub Actions", "Jenkins", "Azure DevOps"],
  "security": ["DevSecOps", "Okta", "Apigee", "Trivy", "AWS Inspector"]
}`;
    } else if (lower.includes('client') || lower.includes('project')) {
      response = `ENTERPRISE CLIENT ENGAGEMENTS:
  • Qualcomm: Enterprise Okta Workflow Migration & Apigee Hybrid API Gateway
  • Leadiant Biosciences: Regulated AWS Healthcare Infrastructure (Oracle Argus)
  • RK Holdings (Rural King): Greenfield AWS Cloud Architecture via Terraform
  • DLBA: Public Sector Cloud Operations & Modernization
  • Waste Management: Secure Financial Cloud Data Pipelines`;
    } else if (lower.includes('status')) {
      response = `Telemetry: All 46 Microservices Healthy | Latency: 14ms | Region: Global CDN Edge`;
    } else {
      response = `Command executed: "${trimmed}". Type "help" to view interactive commands.`;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'command', text: trimmed },
      { type: 'output', text: response },
    ]);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    handleCommandExecution(terminalInput);
    setTerminalInput('');
  };

  const copyCloneCmd = () => {
    navigator.clipboard.writeText('git clone https://github.com/sunsunny-hub/DevOpsFolio.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-max">
        {/* Top telemetry bar */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            marginBottom: '28px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span className="pulse-green"></span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>{portfolioData.personal.statusText}</span>
          <span style={{ color: 'var(--text-faint)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>{portfolioData.personal.statusRegion}</span>
        </div>

        {/* Hero Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headlines & CTA */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '6px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                color: '#22d3ee',
                fontSize: '0.82rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}
            >
              <Cloud size={14} />
              Triple-Cloud Certified Platform Engineer
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                marginBottom: '14px',
              }}
            >
              Hi, I'm <span className="text-gradient-cyan">{portfolioData.personal.name}</span>
            </h1>

            {/* Dynamic Typewriter Subheading */}
            <div
              style={{
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-heading)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                <span>Specializing in</span>
                <span style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {taglineText}
                </span>
                <span className="typewriter-cursor">|</span>
              </p>
            </div>

            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginBottom: '32px',
                maxWidth: '560px',
                lineHeight: 1.7,
              }}
            >
              DevOps & Multi-Cloud Platform Engineer at{' '}
              <strong style={{ color: '#38bdf8' }}>Perficient Inc</strong>. Architecting resilient multi-cloud infrastructure across{' '}
              <strong style={{ color: '#fff' }}>AWS, Azure, and GCP</strong> with automated zero-downtime{' '}
              <strong style={{ color: '#fff' }}>CI/CD pipelines</strong>, DevSecOps compliance gating, and{' '}
              <strong style={{ color: '#fff' }}>Terraform IaC</strong>.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '36px' }}>
              <a href="#pipeline" className="btn-primary">
                Explore Architecture Pipeline
                <ArrowRight size={16} />
              </a>
              <button onClick={onOpenResume} className="btn-secondary">
                Download Resume
                <ExternalLink size={15} />
              </button>
            </div>

            {/* Quick Git Clone Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#94a3b8',
              }}
            >
              <Code size={14} color="#06b6d4" />
              <span>git clone https://github.com/sunsunny-hub/DevOpsFolio.git</span>
              <button
                onClick={copyCloneCmd}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied ? '#10b981' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Copy repository clone command"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive CLI Emulator with Live Typewriter */}
          <div>
            <div className="terminal-window">
              <div className="terminal-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="terminal-dot" style={{ background: '#ef4444' }}></span>
                  <span className="terminal-dot" style={{ background: '#f59e0b' }}></span>
                  <span className="terminal-dot" style={{ background: '#10b981' }}></span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '6px' }}>
                    suraj@cloud-control-plane:~ (bash)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setIsAutoTyping(!isAutoTyping)}
                    style={{
                      background: isAutoTyping ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${isAutoTyping ? 'rgba(6, 182, 212, 0.35)' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: isAutoTyping ? '#22d3ee' : '#94a3b8',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    title={isAutoTyping ? 'Click to pause auto-typing demo' : 'Click to resume auto-typing demo'}
                  >
                    {isAutoTyping ? <Pause size={10} /> : <Play size={10} />}
                    <span>{isAutoTyping ? 'STREAM: ON' : 'STREAM: PAUSED'}</span>
                  </button>
                </div>
              </div>

              <div
                className="terminal-body"
                ref={terminalBodyRef}
                style={{
                  maxHeight: '340px',
                  overflowY: 'auto',
                }}
              >
                {terminalHistory.map((item, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    {item.type === 'system' && (
                      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                        [sys] {item.text}
                      </div>
                    )}
                    {item.type === 'command' && (
                      <div style={{ color: '#38bdf8', display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ color: '#10b981' }}>➜</span>
                        <span style={{ color: '#06b6d4' }}>~</span>
                        <span>{item.text}</span>
                      </div>
                    )}
                    {item.type === 'output' && (
                      <pre
                        style={{
                          color: '#e2e8f0',
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'inherit',
                          fontSize: '0.82rem',
                          margin: '4px 0 0 16px',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.text}
                      </pre>
                    )}
                  </div>
                ))}

                {/* Active Automated Typewriter Line */}
                {isAutoTyping && typingCommandText && (
                  <div style={{ color: '#38bdf8', display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#10b981' }}>➜</span>
                    <span style={{ color: '#06b6d4' }}>~</span>
                    <span style={{ color: '#67e8f9' }}>{typingCommandText}</span>
                    <span className="terminal-block-cursor">▋</span>
                  </div>
                )}

                {/* Interactive Input Prompt */}
                <form onSubmit={onSubmitForm} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                  <span style={{ color: '#10b981' }}>➜</span>
                  <span style={{ color: '#06b6d4' }}>~</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onFocus={() => setIsAutoTyping(false)}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder={isAutoTyping ? "Click to type your own command (e.g. 'help')..." : "Type 'help', 'kubectl get certs', or 'clear'..."}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.84rem',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'rgba(6, 182, 212, 0.15)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      color: '#22d3ee',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                    }}
                  >
                    Run
                  </button>
                </form>
              </div>

              {/* Quick Command Pills */}
              <div
                style={{
                  background: '#0d1322',
                  padding: '10px 16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Quick:</span>
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommandExecution(cmd)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      color: '#94a3b8',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#38bdf8';
                      e.target.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#94a3b8';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                    }}
                  >
                    $ {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Metrics Grid */}
        <div
          style={{
            marginTop: '60px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '18px',
          }}
        >
          {portfolioData.metrics.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', textTransform: 'uppercase' }}>
                  {item.highlight}
                </span>
                <span className="pulse-green"></span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          display: inline-block;
          color: #06b6d4;
          font-weight: 700;
          animation: cursorBlink 0.8s infinite;
          margin-left: 2px;
        }
        .terminal-block-cursor {
          display: inline-block;
          color: #22d3ee;
          animation: cursorBlink 0.6s infinite;
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
}
