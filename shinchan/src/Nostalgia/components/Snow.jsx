import React, { useMemo } from 'react';

const  Snow = ({ count = 100 }) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 200 + 5,
      blur: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.5,
    }));
  }, [count]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100vh) translateX(0px);
            }
            100% {
              transform: translateY(100vh) translateX(50px);
            }
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: 'absolute',
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            animation: `fall ${flake.duration}s linear infinite`,
            filter: `blur(${flake.blur}px)`,
            opacity: flake.opacity,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default Snow;
export const dynamic = "force-dynamic";