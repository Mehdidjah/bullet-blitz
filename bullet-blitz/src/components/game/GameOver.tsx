import { Skull } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50">
      <Skull className="w-24 h-24 text-destructive mb-4 animate-pulse" />
      <h2 className="text-6xl font-bold text-destructive mb-4">GAME OVER</h2>
      <p className="text-2xl text-foreground mb-2">Final Score: {score}</p>
      <p className="text-muted-foreground mb-8">Better luck next time!</p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-destructive text-white rounded-lg text-xl font-bold hover:scale-105 transition-transform"
      >
        TRY AGAIN
      </button>
    </div>
  );
};
