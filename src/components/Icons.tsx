import React from 'react';

// Heart/Stethoscope logo at the top
export const VyasaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M50 85C50 85 80 60 80 38C80 23.5 68.5 12 54 12C47.5 12 42.5 14.5 40 18.5"
      stroke="#4a7cff"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M50 85C50 85 20 60 20 38C20 23.5 31.5 12 46 12C52.5 12 57.5 14.5 60 18.5"
      stroke="#ffffff"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle cx="50" cy="35" r="10" stroke="#4a7cff" strokeWidth="6" />
    <path
      d="M38 52C42.5 58 57.5 58 62 52"
      stroke="#ffffff"
      strokeWidth="5"
      strokeLinecap="round"
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
    <path
      d="M100 170C100 170 160 120 160 76C160 47 137 24 108 24C95 24 85 29 80 37"
      stroke="#4a7cff"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M100 170C100 170 40 120 40 76C40 47 63 24 92 24C105 24 115 29 120 37"
      stroke="#4a7cff"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="100" cy="70" r="20" stroke="#4a7cff" strokeWidth="8" />
  </svg>
);
