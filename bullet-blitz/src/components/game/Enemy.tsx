interface EnemyProps {
  x: number;
  y: number;
  health: number;
}

export const Enemy = ({ x, y, health }: EnemyProps) => {
  const healthPercent = (health / 100) * 100;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {/* Enemy body */}
      <div className="w-10 h-10 bg-game-enemy rounded-lg enemy-glow animate-pulse-glow relative">
        {/* Evil eyes */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full" />
        <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
        
        {/* Evil mouth */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-white rounded-full" />
      </div>
      
      {/* Health bar */}
      <div className="absolute -top-2 left-0 w-10 h-1 bg-card border border-border rounded-full overflow-hidden">
        <div
          className="h-full bg-game-enemy transition-all duration-200"
          style={{ width: `${healthPercent}%` }}
        />
      </div>
    </div>
  );
};
