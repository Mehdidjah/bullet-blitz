import { useState, useEffect, useRef, useCallback } from "react";
import { GameUI } from "@/components/game/GameUI";
import { Player } from "@/components/game/Player";
import { Enemy } from "@/components/game/Enemy";
import { Bullet } from "@/components/game/Bullet";
import { GameOver } from "@/components/game/GameOver";
import { Victory } from "@/components/game/Victory";
import { useToast } from "@/hooks/use-toast";

interface Position {
  x: number;
  y: number;
}

interface GameObject extends Position {
  id: string;
  velocity?: { x: number; y: number };
}

interface EnemyObject extends GameObject {
  health: number;
  speed: number;
}

interface BulletObject extends GameObject {
  angle: number;
}

const PLAYER_SPEED = 5;
const PLAYER_MAX_HEALTH = 100;
const BULLET_SPEED = 10;
const ENEMIES_PER_LEVEL = 3;
const ENEMY_SPEED_MULTIPLIER = 0.3;

const Index = () => {
  const { toast } = useToast();
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  
  const [playerPos, setPlayerPos] = useState<Position>({ x: 400, y: 300 });
  const [playerHealth, setPlayerHealth] = useState(PLAYER_MAX_HEALTH);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(30);
  const [enemies, setEnemies] = useState<EnemyObject[]>([]);
  const [bullets, setBullets] = useState<BulletObject[]>([]);
  
  const keysPressed = useRef<Set<string>>(new Set());
  const animationFrameRef = useRef<number>();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    const handleClick = () => {
      if (gameStarted && !gameOver && !victory && ammo > 0) {
        shootBullet();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [gameStarted, gameOver, victory, ammo, playerPos, mousePos]);

  // Spawn enemies for current level
  const spawnEnemies = useCallback(() => {
    const newEnemies: EnemyObject[] = [];
    const enemyCount = ENEMIES_PER_LEVEL + level - 1;
    const enemySpeed = 1 + (level - 1) * ENEMY_SPEED_MULTIPLIER;

    for (let i = 0; i < enemyCount; i++) {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;

      switch (edge) {
        case 0: // Top
          x = Math.random() * 800;
          y = 0;
          break;
        case 1: // Right
          x = 800;
          y = Math.random() * 600;
          break;
        case 2: // Bottom
          x = Math.random() * 800;
          y = 600;
          break;
        case 3: // Left
          x = 0;
          y = Math.random() * 600;
          break;
      }

      newEnemies.push({
        id: `enemy-${Date.now()}-${i}`,
        x,
        y,
        health: 50 + (level - 1) * 10,
        speed: enemySpeed,
        velocity: { x: 0, y: 0 },
      });
    }

    setEnemies(newEnemies);
  }, [level]);

  // Shoot bullet
  const shootBullet = useCallback(() => {
    const angle = Math.atan2(mousePos.y - playerPos.y, mousePos.x - playerPos.x);
    
    const newBullet: BulletObject = {
      id: `bullet-${Date.now()}`,
      x: playerPos.x,
      y: playerPos.y,
      angle,
    };

    setBullets(prev => [...prev, newBullet]);
    setAmmo(prev => Math.max(0, prev - 1));
  }, [playerPos, mousePos]);

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setVictory(false);
    setPlayerHealth(PLAYER_MAX_HEALTH);
    setScore(0);
    setLevel(1);
    setAmmo(30);
    setPlayerPos({ x: 400, y: 300 });
    setBullets([]);
    setEnemies([]);
    
    toast({
      title: "Level 1 Started!",
      description: "Use WASD to move, mouse to aim and shoot!",
    });
  };

  // Next level
  const nextLevel = useCallback(() => {
    if (level >= 10) {
      setVictory(true);
      setGameStarted(false);
      return;
    }

    setLevel(prev => prev + 1);
    setAmmo(prev => prev + 10);
    setPlayerHealth(prev => Math.min(PLAYER_MAX_HEALTH, prev + 20));
    
    toast({
      title: `Level ${level + 1}!`,
      description: "Enemies are getting stronger!",
    });
  }, [level, toast]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || victory) return;

    const gameLoop = () => {
      // Move player
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.current.has('w')) newY -= PLAYER_SPEED;
        if (keysPressed.current.has('s')) newY += PLAYER_SPEED;
        if (keysPressed.current.has('a')) newX -= PLAYER_SPEED;
        if (keysPressed.current.has('d')) newX += PLAYER_SPEED;

        // Boundaries
        newX = Math.max(30, Math.min(770, newX));
        newY = Math.max(30, Math.min(570, newY));

        return { x: newX, y: newY };
      });

      // Move bullets
      setBullets(prev => 
        prev
          .map(bullet => ({
            ...bullet,
            x: bullet.x + Math.cos(bullet.angle) * BULLET_SPEED,
            y: bullet.y + Math.sin(bullet.angle) * BULLET_SPEED,
          }))
          .filter(bullet => 
            bullet.x > 0 && bullet.x < 800 && bullet.y > 0 && bullet.y < 600
          )
      );

      // Move enemies toward player
      setEnemies(prev => 
        prev.map(enemy => {
          const angle = Math.atan2(playerPos.y - enemy.y, playerPos.x - enemy.x);
          return {
            ...enemy,
            x: enemy.x + Math.cos(angle) * enemy.speed,
            y: enemy.y + Math.sin(angle) * enemy.speed,
          };
        })
      );

      // Collision detection - bullets hit enemies
      setBullets(prevBullets => {
        const remainingBullets = [...prevBullets];
        
        setEnemies(prevEnemies => {
          const remainingEnemies = prevEnemies.map(enemy => {
            const hitBulletIndex = remainingBullets.findIndex(bullet => {
              const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
              return dist < 25;
            });

            if (hitBulletIndex !== -1) {
              remainingBullets.splice(hitBulletIndex, 1);
              const newHealth = enemy.health - 25;
              
              if (newHealth <= 0) {
                setScore(prev => prev + 100 * level);
                return null;
              }
              
              return { ...enemy, health: newHealth };
            }
            
            return enemy;
          }).filter(Boolean) as EnemyObject[];

          return remainingEnemies;
        });

        return remainingBullets;
      });

      // Collision detection - enemies hit player
      setEnemies(prevEnemies => {
        const hitEnemy = prevEnemies.find(enemy => {
          const dist = Math.hypot(enemy.x - playerPos.x, enemy.y - playerPos.y);
          return dist < 35;
        });

        if (hitEnemy) {
          setPlayerHealth(prev => {
            const newHealth = prev - 10;
            if (newHealth <= 0) {
              setGameOver(true);
              setGameStarted(false);
            }
            return Math.max(0, newHealth);
          });
          
          return prevEnemies.filter(e => e.id !== hitEnemy.id);
        }

        return prevEnemies;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameOver, victory, playerPos, level]);

  // Spawn enemies when level changes
  useEffect(() => {
    if (gameStarted && !gameOver && !victory) {
      spawnEnemies();
    }
  }, [level, gameStarted, gameOver, victory, spawnEnemies]);

  // Check if level complete
  useEffect(() => {
    if (gameStarted && !gameOver && !victory && enemies.length === 0 && level <= 10) {
      const timer = setTimeout(() => {
        nextLevel();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [enemies.length, gameStarted, gameOver, victory, level, nextLevel]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="relative">
        <GameUI
          level={level}
          score={score}
          health={playerHealth}
          maxHealth={PLAYER_MAX_HEALTH}
          ammo={ammo}
          enemiesLeft={enemies.length}
        />
        
        <div
          ref={gameRef}
          className="game-container relative w-[800px] h-[600px] border-2 border-primary rounded-lg glow-effect cursor-crosshair"
        >
          {!gameStarted && !gameOver && !victory && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-50">
              <h1 className="text-6xl font-bold text-primary mb-4 animate-pulse-glow">
                NEON ASSAULT
              </h1>
              <p className="text-xl text-foreground mb-2">Survive 10 levels of increasing chaos</p>
              <p className="text-muted-foreground mb-8">WASD to move • Mouse to aim & shoot</p>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-xl font-bold hover:scale-105 transition-transform glow-effect"
              >
                START GAME
              </button>
            </div>
          )}

          {gameStarted && (
            <>
              <Player x={playerPos.x} y={playerPos.y} angle={Math.atan2(mousePos.y - playerPos.y, mousePos.x - playerPos.x)} />
              
              {enemies.map(enemy => (
                <Enemy key={enemy.id} x={enemy.x} y={enemy.y} health={enemy.health} />
              ))}
              
              {bullets.map(bullet => (
                <Bullet key={bullet.id} x={bullet.x} y={bullet.y} angle={bullet.angle} />
              ))}
            </>
          )}

          {gameOver && <GameOver score={score} onRestart={startGame} />}
          {victory && <Victory score={score} onRestart={startGame} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
