import { Trophy } from "lucide-react";

interface VictoryProps {
  score: number;
  onRestart: () => void;
}

export const Victory = ({ score, onRestart }: VictoryProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50">
      <Trophy className="w-24 h-24 text-accent mb-4 animate-pulse-glow" />
      <h2 className="text-6xl font-bold text-primary mb-4 glow-effect">VICTORY!</h2>
      <p className="text-2xl text-foreground mb-2">You conquered all 10 levels!</p>
      <p className="text-3xl text-accent font-bold mb-8">Final Score: {score}</p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-xl font-bold hover:scale-105 transition-transform glow-effect"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};
