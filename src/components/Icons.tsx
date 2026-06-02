import React from 'react';

// Heart/Stethoscope logo at the top
export const VyasaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Stethoscope Earpieces */}
    <rect x="47" y="27" width="22" height="10" rx="5" fill="#1e6fd9" />
    <rect x="131" y="27" width="22" height="10" rx="5" fill="#1e6fd9" />
    
    {/* Stethoscope Tubes */}
    <path
      d="M 60,32 C 30,32 30,70 65,95"
      stroke="#1e6fd9"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 140,32 C 170,32 170,70 135,95"
      stroke="#1e6fd9"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Human Silhouette (Head and Torso) */}
    {/* Head */}
    <path
      d="M 100,42 C 111,42 120,51 120,62 C 120,73 111,82 100,82 C 89,82 80,73 80,62 C 80,51 89,42 100,42 Z"
      fill="#1e6fd9"
    />
    {/* Torso */}
    <path
      d="M 94,80 L 94,89 C 83,93 72,102 70,115 L 130,115 C 128,102 117,93 106,89 L 106,80 Z"
      fill="#1e6fd9"
    />

    {/* Stylized Tapered V-Collar Chestpiece */}
    <path
      d="M 62,95 C 62,88 72,88 72,95 C 76,115 85,132 100,132 C 115,132 124,115 128,95 C 128,88 138,88 138,95 C 142,125 125,165 100,165 C 75,165 58,125 62,95 Z"
      fill="#4ea2ff"
    />
  </svg>
);

// Individual Doctor SVG Illustration
export const DoctorIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', maxHeight: '120px' }}
    {...props}
  >
    {/* Soft sky-blue background circle */}
    <rect width="200" height="200" rx="30" fill="#eef2ff" />
    
    {/* Shield representing security / medical shield */}
    <path
      d="M45 55C45 45 65 38 75 35C85 38 105 45 105 55C105 85 75 105 75 105C75 105 45 85 45 55Z"
      fill="#4a7cff"
      opacity="0.15"
    />
    <path
      d="M75 42V98C75 98 52 82 52 55C52 48 68 42 75 42Z"
      fill="#4a7cff"
      opacity="0.3"
    />
    
    {/* Doctor Body and Coat */}
    <circle cx="100" cy="80" r="30" fill="#fbcfe8" /> {/* Head */}
    <path d="M100 70C100 70 95 72 90 70" stroke="#312e81" strokeWidth="2" strokeLinecap="round" /> {/* Hair */}
    <path d="M85 65C85 65 100 55 115 65" fill="#312e81" /> {/* Hair mass */}
    
    {/* Coat / Shoulders */}
    <path
      d="M60 160C60 120 75 110 100 110C125 110 140 120 140 160H60Z"
      fill="#ffffff"
      stroke="#cbd5e1"
      strokeWidth="2"
    />
    
    {/* Blue Scrub Shirt */}
    <path d="M90 110L100 125L110 110H90Z" fill="#3b82f6" />
    
    {/* Clipboard */}
    <rect x="110" y="115" width="40" height="55" rx="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
    <rect x="120" y="110" width="20" height="8" rx="2" fill="#64748b" />
    <line x1="120" y1="130" x2="140" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="120" y1="140" x2="145" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    <line x1="120" y1="150" x2="135" y2="150" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

    {/* Stethoscope */}
    <path
      d="M85 110C85 130 115 130 115 110"
      stroke="#475569"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="100" cy="132" r="5" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
  </svg>
);

// Hospital SVG Illustration
export const HospitalIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', maxHeight: '120px' }}
    {...props}
  >
    {/* Soft sky-blue background circle */}
    <rect width="200" height="200" rx="30" fill="#eef2ff" />
    
    {/* Hospital main building base */}
    <rect x="50" y="70" width="100" height="90" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
    
    {/* Accent blue banners */}
    <rect x="50" y="85" width="100" height="15" fill="#4a7cff" opacity="0.1" />
    
    {/* Hospital front wing */}
    <rect x="80" y="90" width="40" height="70" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
    
    {/* Windows */}
    <rect x="62" y="110" width="10" height="10" rx="2" fill="#94a3b8" opacity="0.3" />
    <rect x="128" y="110" width="10" height="10" rx="2" fill="#94a3b8" opacity="0.3" />
    <rect x="62" y="130" width="10" height="10" rx="2" fill="#94a3b8" opacity="0.3" />
    <rect x="128" y="130" width="10" height="10" rx="2" fill="#94a3b8" opacity="0.3" />
    
    {/* Red Cross sign on top */}
    <circle cx="100" cy="55" r="15" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
    <rect x="97" y="47" width="6" height="16" rx="2" fill="#f43f5e" />
    <rect x="92" y="52" width="16" height="6" rx="2" fill="#f43f5e" />

    {/* Front glass double-door */}
    <rect x="92" y="135" width="16" height="25" rx="2" fill="#3b82f6" opacity="0.2" stroke="#4a7cff" strokeWidth="1.5" />
    <line x1="100" y1="135" x2="100" y2="160" stroke="#4a7cff" strokeWidth="1.5" />

    {/* Tiny Tree decorations */}
    <circle cx="35" cy="150" r="12" fill="#10b981" opacity="0.8" />
    <rect x="33" y="152" width="4" height="12" fill="#78350f" />
    
    <circle cx="165" cy="150" r="12" fill="#10b981" opacity="0.8" />
    <rect x="163" y="152" width="4" height="12" fill="#78350f" />
  </svg>
);

// Large Stethoscope Watermark in the background
export const WatermarkStethoscope: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="500"
    height="500"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.06, pointerEvents: 'none' }}
    {...props}
  >
    {/* Stethoscope Earpieces */}
    <rect x="47" y="27" width="22" height="10" rx="5" fill="#4a7cff" />
    <rect x="131" y="27" width="22" height="10" rx="5" fill="#4a7cff" />
    
    {/* Stethoscope Tubes */}
    <path
      d="M 60,32 C 30,32 30,70 65,95"
      stroke="#4a7cff"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 140,32 C 170,32 170,70 135,95"
      stroke="#4a7cff"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Human Silhouette (Head and Torso) */}
    {/* Head */}
    <path
      d="M 100,42 C 111,42 120,51 120,62 C 120,73 111,82 100,82 C 89,82 80,73 80,62 C 80,51 89,42 100,42 Z"
      fill="#4a7cff"
    />
    {/* Torso */}
    <path
      d="M 94,80 L 94,89 C 83,93 72,102 70,115 L 130,115 C 128,102 117,93 106,89 L 106,80 Z"
      fill="#4a7cff"
    />

    {/* Stylized Tapered V-Collar Chestpiece */}
    <path
      d="M 62,95 C 62,88 72,88 72,95 C 76,115 85,132 100,132 C 115,132 124,115 128,95 C 128,88 138,88 138,95 C 142,125 125,165 100,165 C 75,165 58,125 62,95 Z"
      fill="#4a7cff"
    />
  </svg>
);
