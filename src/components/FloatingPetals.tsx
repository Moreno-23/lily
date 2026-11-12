import React, { useMemo } from 'react';

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
  type: 'petal' | 'leaf' | 'sparkle';
}

export const FloatingPetals: React.FC = () => {
  // Generate a fixed, deterministic set of floating particles for performance
  const particles = useMemo<Petal[]>(() => {
    const colors = ['#F4DCE0', '#C98996', '#D8B978', '#A6B59A', '#FFF9F0'];
    const items: Petal[] = [];

    for (let i = 0; i < 28; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'leaf' | 'sparkle' = 
        typeRand < 0.65 ? 'petal' : typeRand < 0.85 ? 'leaf' : 'sparkle';

      items.push({
        id: i,
        left: `${(i * 3.5 + Math.random() * 4) % 100}%`,
        size: type === 'sparkle' ? 6 + Math.random() * 6 : 14 + Math.random() * 16,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.floor(Math.random() * 360),
        type,
      });
    }
    return items;
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden" 
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-0"
          style={{
            left: p.left,
            top: '-30px',
            animation: `float-petal ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'petal' && (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 24 32"
              fill={p.color}
              className="drop-shadow-sm filter"
              style={{
                transform: `rotate(${p.rotation}deg)`,
                opacity: 0.75,
              }}
            >
              <path d="M12 0 C4 8 0 18 3 26 C6 32 18 32 21 26 C24 18 20 8 12 0 Z" />
            </svg>
          )}

          {p.type === 'leaf' && (
            <svg
              width={p.size * 0.9}
              height={p.size * 1.4}
              viewBox="0 0 20 30"
              fill="#A6B59A"
              className="drop-shadow-sm opacity-60"
              style={{
                transform: `rotate(${p.rotation}deg)`,
              }}
            >
              <path d="M10 0 C2 10 2 20 10 30 C18 20 18 10 10 0 Z" />
            </svg>
          )}

          {p.type === 'sparkle' && (
            <div
              className="rounded-full bg-[#D8B978] animate-ping"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                boxShadow: '0 0 8px #D8B978',
                opacity: 0.6,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

