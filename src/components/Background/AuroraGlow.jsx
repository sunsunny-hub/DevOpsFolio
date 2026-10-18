import React from 'react';

/**
 * AuroraGlow
 * Renders multi-layered, GPU-accelerated organic ambient orbs that slowly morph
 * and drift across the viewport, giving a living cloud/cyber aesthetic.
 */
export default function AuroraGlow() {
  return (
    <div className="aurora-container" aria-hidden="true">
      {/* Orb 1: Primary Cyan Cloud */}
      <div className="aurora-orb aurora-orb-1" />

      {/* Orb 2: Electric Azure / Indigo Cluster */}
      <div className="aurora-orb aurora-orb-2" />

      {/* Orb 3: Cyber Violet DevOps Shield */}
      <div className="aurora-orb aurora-orb-3" />

      {/* Orb 4: Emerald Health / Pipeline Glow */}
      <div className="aurora-orb aurora-orb-4" />

      {/* Subtle top spotlight */}
      <div className="aurora-spotlight" />
    </div>
  );
}
