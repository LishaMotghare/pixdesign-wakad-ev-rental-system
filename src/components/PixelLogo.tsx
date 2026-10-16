import React from 'react';

interface PixelLogoProps {
  className?: string;
  size?: number;
}

export const PixelLogo: React.FC<PixelLogoProps> = ({ className = '', size = 38 }) => {
  // A crisp 6x7 pixel grid defining the letter "P"
  // 1 = filled pixel, 0 = empty
  const pixelGrid = [
    [1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
  ];

  const cols = 6;
  const rows = 7;
  const cellSize = 10;
  const gap = 2;
  const totalWidth = cols * cellSize + (cols - 1) * gap;
  const totalHeight = rows * cellSize + (rows - 1) * gap;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-slate-900 p-1.5 shadow-md border border-slate-700/60 ${className}`}
      style={{ width: size, height: size }}
      title="PixDesign Pixel P"
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {pixelGrid.map((row, rIdx) =>
          row.map((val, cIdx) => {
            if (!val) return null;
            const x = cIdx * (cellSize + gap);
            const y = rIdx * (cellSize + gap);
            // Highlight top-right corner pixel for high-tech accent
            const isAccent = (rIdx === 0 && cIdx === 4) || (rIdx === 3 && cIdx === 4);
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                rx={1.5}
                fill={isAccent ? '#38BDF8' : 'url(#pixGradient)'}
                opacity={rIdx >= 4 ? 0.95 : 1}
              />
            );
          })
        )}
      </svg>
    </div>
  );
};
