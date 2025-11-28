interface BulletProps {
  x: number;
  y: number;
  angle: number;
}

export const Bullet = ({ x, y, angle }: BulletProps) => {
  return (
    <div
      className="absolute w-3 h-3 bg-game-bullet rounded-full glow-effect z-30"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${angle}rad)`,
        boxShadow: '0 0 10px hsl(var(--bullet-color))',
      }}
    />
  );
};
