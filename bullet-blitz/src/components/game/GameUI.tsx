import { Heart, Target, Zap } from "lucide-react";

interface GameUIProps {
  level: number;
  score: number;
  health: number;
  maxHealth: number;
  ammo: number;
  enemiesLeft: number;
}

export const GameUI = ({ level, score, health, maxHealth, ammo, enemiesLeft }: GameUIProps) => {
  const healthPercent = (health / maxHealth) * 100;

  return (
    <div className="absolute -top-20 left-0 right-0 flex justify-between items-center text-foreground">
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Heart className="text-destructive" />
          <div className="w-40 h-6 bg-card border border-border rounded-full overflow-hidden">
            <div
              className="h-full bg-destructive transition-all duration-300"
              style={{ width: `${healthPercent}%` }}
            />
          </div>
          <span className="text-sm font-bold">{health}</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="text-accent" />
          <span className="text-xl font-bold">{ammo}</span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-primary glow-effect">
          LEVEL {level}
        </div>
        <div className="text-sm text-muted-foreground">Score: {score}</div>
      </div>

      <div className="flex items-center gap-2">
        <Target className="text-game-enemy" />
        <span className="text-xl font-bold">{enemiesLeft}</span>
      </div>
    </div>
  );
};
