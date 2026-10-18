import React, { useEffect, useRef } from 'react';

/**
 * BackgroundCanvas
 * High-performance HTML5 Canvas rendering a dynamic distributed Cloud Node Topology
 * with proximity lines, streaming data packets, and interactive mouse gravity fields.
 */
export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = window.devicePixelRatio || 1;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Palette: DevOps Multi-Cloud hues
    const NODE_COLORS = [
      { r: 56, g: 189, b: 248 },   // Cyan/Sky (Cloud/AWS)
      { r: 6, g: 182, b: 212 },    // Cyan Dark (Docker/K8s)
      { r: 96, g: 165, b: 250 },   // Azure Blue (Azure/Terraform)
      { r: 168, g: 85, b: 247 },   // Cyber Violet (DevSecOps)
      { r: 52, g: 211, b: 153 },   // Emerald (Passing Health/GCP)
    ];

    const CONNECT_DIST = 135;
    const MOUSE_CONNECT_DIST = 170;
    const MOUSE_REPEL_DIST = 100;

    // Mouse tracker
    const mouse = {
      x: null,
      y: null,
      targetX: null,
      targetY: null,
      active: false,
    };

    // Responsive node count
    const getNodeCount = () => {
      const area = window.innerWidth * window.innerHeight;
      // 1 node per ~22,000 px^2, clamped between 30 and 75
      return Math.max(32, Math.min(75, Math.floor(area / 22000)));
    };

    let nodes = [];
    let packets = [];

    const createNode = (x, y) => {
      const color = NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)];
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.6 + 1.2,
        color,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        isKeyNode: Math.random() > 0.8, // 20% are larger infrastructure hubs
      };
    };

    const initNodes = () => {
      const count = getNodeCount();
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(createNode());
      }
      packets = [];
    };

    // Resize handler with DPR scaling
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initNodes();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse handlers
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = null;
      mouse.targetY = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Spawn packets along active links periodically
    let lastPacketSpawn = 0;
    const maybeSpawnPacket = (now, activeConnections) => {
      if (activeConnections.length === 0) return;
      if (packets.length > 12) return; // Keep capped for performance
      if (now - lastPacketSpawn < 300) return;

      const randomConn =
        activeConnections[Math.floor(Math.random() * activeConnections.length)];
      packets.push({
        from: randomConn.a,
        to: randomConn.b,
        progress: 0,
        speed: 0.012 + Math.random() * 0.018,
        color: randomConn.a.color,
      });
      lastPacketSpawn = now;
    };

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render loop
    let lastTime = performance.now();

    const render = (now) => {
      if (!isVisible) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Clear canvas with transparency
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      if (mouse.active && mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.1;
          mouse.y += (mouse.targetY - mouse.y) * 0.1;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // Update & Draw Nodes
      const activeConnections = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Standard motion
          node.x += node.vx;
          node.y += node.vy;

          // Boundary bouncing with soft margins
          if (node.x < 0) {
            node.x = 0;
            node.vx *= -1;
          } else if (node.x > width) {
            node.x = width;
            node.vx *= -1;
          }

          if (node.y < 0) {
            node.y = 0;
            node.vy *= -1;
          } else if (node.y > height) {
            node.y = height;
            node.vy *= -1;
          }

          // Gentle mouse interaction (repulsion & subtle drag)
          if (mouse.x !== null) {
            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;
            const dist = Math.hypot(dx, dy);

            if (dist < MOUSE_REPEL_DIST && dist > 1) {
              const force = (1 - dist / MOUSE_REPEL_DIST) * 0.8;
              node.x += (dx / dist) * force;
              node.y += (dy / dist) * force;
            }
          }

          node.pulsePhase += node.pulseSpeed;
        }

        // Connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Register connection for possible packet transmission
            if (activeConnections.length < 60) {
              activeConnections.push({ a: node, b: other });
            }
          }
        }

        // Connection to mouse cursor
        if (mouse.x !== null) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MOUSE_CONNECT_DIST) {
            const alpha = (1 - dist / MOUSE_CONNECT_DIST) * 0.45;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Draw node body
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7; // 0.4 to 1.0
        const radius = node.isKeyNode ? node.radius * 1.5 : node.radius;

        // Outer glow
        const glowRadius = radius * (node.isKeyNode ? 3.5 : 2.5);
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );
        gradient.addColorStop(
          0,
          `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.4 * pulse})`
        );
        gradient.addColorStop(
          1,
          `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.85 * pulse})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw & Update Packets (Live CI/CD packet streaming)
      if (!prefersReducedMotion) {
        maybeSpawnPacket(now, activeConnections);

        for (let p = packets.length - 1; p >= 0; p--) {
          const pkt = packets[p];
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            packets.splice(p, 1);
            continue;
          }

          const curX = pkt.from.x + (pkt.to.x - pkt.from.x) * pkt.progress;
          const curY = pkt.from.y + (pkt.to.y - pkt.from.y) * pkt.progress;

          // Packet particle
          ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Packet halo
          ctx.fillStyle = `rgba(${pkt.color.r}, ${pkt.color.g}, ${pkt.color.b}, 0.55)`;
          ctx.beginPath();
          ctx.arc(curX, curY, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse interactive beacon
      if (mouse.x !== null) {
        const mouseGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_CONNECT_DIST
        );
        mouseGradient.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        mouseGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
        mouseGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = mouseGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_CONNECT_DIST, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="background-topology-canvas"
      aria-hidden="true"
    />
  );
}
