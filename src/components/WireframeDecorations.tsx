import React from 'react';

// Alpine Peak Wireframe SVG Graphic
export const AlpinePeakWireframe: React.FC<{ className?: string }> = ({ className = "w-16 h-16 text-[#AAD0D1]/30" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Wireframe Triangles representing Alpine Peaks */}
    <path d="M10 80 L50 20 L90 80 Z" strokeDasharray="3 3" />
    <path d="M50 20 L50 80" />
    <path d="M30 50 L50 20 L70 50" />
    <path d="M25 60 L75 60" strokeDasharray="2 2" />
    <path d="M35 35 L50 80 L65 35" />
    {/* Contour Lines */}
    <circle cx="50" cy="20" r="3" fill="currentColor" />
    <circle cx="10" cy="80" r="2" fill="currentColor" />
    <circle cx="90" cy="80" r="2" fill="currentColor" />
  </svg>
);

// Ski Track Contour Lines Wireframe
export const SkiTrackWireframe: React.FC<{ className?: string }> = ({ className = "w-24 h-12 text-[#417483]/40" }) => (
  <svg 
    viewBox="0 0 120 60" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
    className={className}
  >
    <path d="M10 50 Q 30 10, 60 30 T 110 20" strokeDasharray="4 2" />
    <path d="M10 42 Q 30 2, 60 22 T 110 12" />
    <path d="M10 58 Q 30 18, 60 38 T 110 28" />
    <circle cx="60" cy="30" r="2" fill="currentColor" />
    <circle cx="110" cy="20" r="2" fill="currentColor" />
  </svg>
);

// Blueprint Compass Wireframe
export const CompassWireframe: React.FC<{ className?: string }> = ({ className = "w-16 h-16 text-[#AAD0D1]/20" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    className={className}
  >
    <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
    <circle cx="50" cy="50" r="32" />
    <circle cx="50" cy="50" r="12" strokeDasharray="2 2" />
    <line x1="50" y1="5" x2="50" y2="95" />
    <line x1="5" y1="50" x2="95" y2="50" />
    <polygon points="50,15 55,45 85,50 55,55 50,85 45,55 15,50 45,45" fill="currentColor" opacity="0.1" />
  </svg>
);

// Wireframe Crest Badge
export const WireframeBadge: React.FC<{ label?: string; className?: string }> = ({ label = "DNS 2026", className = "text-[#AAD0D1]" }) => (
  <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md border border-current/40 bg-current/5 font-mono text-[10px] font-bold tracking-wider ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
    <span>{label}</span>
  </div>
);
