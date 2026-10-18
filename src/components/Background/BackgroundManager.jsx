import React, { useState } from 'react';
import AuroraGlow from './AuroraGlow';
import BackgroundCanvas from './BackgroundCanvas';
import { Activity, Eye, EyeOff, Sparkles } from 'lucide-react';

/**
 * BackgroundManager
 * Coordinates all visual background layers:
 * 1. Deep Cyber Grid overlay
 * 2. Multi-color fluid Aurora Orbs
 * 3. Interactive Cloud Topology Canvas with data packets
 * 4. Ambient Telemetry status badge & control toggle
 */
export default function BackgroundManager() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className="background-system-root" aria-hidden="false">
      {/* Dynamic Cyber Grid Overlay */}
      <div className="cyber-grid-overlay" />

      {/* Fluid GPU-accelerated Aurora Mesh */}
      {animationsEnabled && <AuroraGlow />}

      {/* Interactive Topology & Data Packets Canvas */}
      {animationsEnabled && <BackgroundCanvas />}

      {/* Ambient Telemetry Badge & Quick Toggle */}
      <div 
        className="telemetry-badge-container"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className="telemetry-badge glass-panel">
          <div className="telemetry-indicator">
            <span className={animationsEnabled ? "pulse-green" : "pulse-dim"} />
            <span className="telemetry-label font-mono">
              {animationsEnabled ? "MESH: ONLINE" : "MESH: PAUSED"}
            </span>
          </div>

          <button
            type="button"
            className="telemetry-toggle-btn"
            onClick={() => setAnimationsEnabled((prev) => !prev)}
            title={animationsEnabled ? "Pause background animation" : "Enable background animation"}
            aria-label="Toggle background animation"
          >
            {animationsEnabled ? (
              <EyeOff size={13} className="text-slate-400 hover:text-cyan-400" />
            ) : (
              <Eye size={13} className="text-slate-400 hover:text-cyan-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
