import React from 'react';

// Abstract, resolution-independent artwork: no external image requests.
export function ProfileBanner() {
  return (
    <div className="ps-banner" role="img" aria-label="Soft blue, lavender and peach abstract waves">
      <svg className="ps-banner-art" viewBox="0 0 1100 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="ps-bg" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d8e9ff" /><stop offset=".42" stopColor="#f6f8ff" /><stop offset=".76" stopColor="#e4e9ff" /><stop offset="1" stopColor="#e5f3ff" />
          </linearGradient>
          <linearGradient id="ps-waves" x1="0" y1="0" x2="1" y2=".9">
            <stop stopColor="#8ab9ef" /><stop offset=".25" stopColor="#f7ffff" /><stop offset=".48" stopColor="#c4bbfc" /><stop offset=".72" stopColor="#ffffff" /><stop offset="1" stopColor="#84aff4" />
          </linearGradient>
          <linearGradient id="ps-wave-right" x1="0" y1="0" x2=".8" y2="1">
            <stop stopColor="#ffffff" /><stop offset=".23" stopColor="#b1d2ff" /><stop offset=".47" stopColor="#7da8e8" /><stop offset=".68" stopColor="#dec0f4" /><stop offset="1" stopColor="#e3f7ff" />
          </linearGradient>
          <linearGradient id="ps-peach" x1=".2" y1="0" x2=".8" y2="1">
            <stop stopColor="#fff" /><stop offset=".45" stopColor="#f6dded" /><stop offset=".78" stopColor="#ffd7c9" /><stop offset="1" stopColor="#d4eafa" />
          </linearGradient>
          <filter id="ps-blur"><feGaussianBlur stdDeviation="16" /></filter>
        </defs>
        <rect width="1100" height="230" fill="url(#ps-bg)" />
        <path d="M-170 285C-84 198-118 53 18-36 139-115 272-28 252 67c-14 68-160 68-158 136 2 66 130 99 216 126" fill="none" stroke="#87b4ff" strokeOpacity=".5" strokeWidth="105" filter="url(#ps-blur)" />
        <path d="M-94 263C95 180 103 70 208-20 308-105 390-81 423-1c34 85-37 136-86 166-76 48-116 83-86 155" fill="none" stroke="url(#ps-waves)" strokeWidth="92" opacity=".93" />
        <path d="M-106 257C72 183 101 71 199-19c98-89 172-67 193 5" fill="none" stroke="#fff" strokeWidth="5" opacity=".82" />
        <path d="M865-120c-103 86-50 170-112 220-60 48-96 46-83 106 15 70 136 74 173 146" fill="none" stroke="url(#ps-wave-right)" strokeWidth="132" opacity=".9" />
        <path d="M1162-110c-166 85-217 160-176 241 38 75 143 73 168 184" fill="none" stroke="url(#ps-peach)" strokeWidth="159" opacity=".93" />
        <path d="M1094-89c-149 88-169 164-129 235 22 40 74 56 111 85" fill="none" stroke="#fff" strokeWidth="6" opacity=".8" />
        <ellipse cx="561" cy="82" rx="278" ry="135" fill="#f6f9ff" opacity=".56" filter="url(#ps-blur)" />
        <path d="M418-44c-61 103-31 197-131 298" stroke="#fff" strokeWidth="4" fill="none" opacity=".65" />
      </svg>
    </div>
  );
}
