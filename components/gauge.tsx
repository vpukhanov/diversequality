"use client";

import { useEffect, useState } from "react";

export default function Gauge({ score }: { score: number }) {
  const [needleRotation, setNeedleRotation] = useState(0);

  useEffect(() => {
    if (score) {
      const rotation = (score / 100) * 90;
      setNeedleRotation(rotation);
    }
  }, [score]);

  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Gauge background */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        {/* Gradient arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
        />
        {/* Center point */}
        <circle cx="100" cy="100" r="4" fill="#4A4E69" />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="#4A4E69"
          strokeWidth="2"
          transform={`rotate(${needleRotation}, 100, 100)`}
          style={{ transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E9A69C" /> {/* Warm coral red */}
            <stop offset="50%" stopColor="#F5D5D5" /> {/* Light neutral */}
            <stop offset="100%" stopColor="#A8C7A3" /> {/* Muted sage green */}
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform font-sans text-2xl font-bold text-accent-foreground">
        {score}
      </div>
    </div>
  );
}
