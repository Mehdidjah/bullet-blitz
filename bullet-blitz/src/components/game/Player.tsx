interface PlayerProps {
  x: number;
  y: number;
  angle: number;
}

export const Player = ({ x, y, angle }: PlayerProps) => {
  return (
    <div
      className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 transition-transform z-20"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) rotate(${angle}rad)`,
      }}
    >
      {/* Player body */}
      <div className="absolute inset-0 bg-game-player rounded-full glow-effect" />
      
      {/* Gun barrel */}
      <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-game-player -translate-y-1/2 origin-left" />
      
      {/* Player eyes/direction indicator */}
      <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" />
    </div>
  );
};
