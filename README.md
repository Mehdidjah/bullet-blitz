# 🎮 Neon Assault

A fast-paced top-down shooter game built with React, TypeScript, and Vite. Battle through 10 increasingly difficult levels of enemy waves in this neon-styled arcade experience.

![Neon Assault Game](https://img.shields.io/badge/Status-Playable-brightgreen) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🎯 Game Features

- **10 Progressive Levels**: Each level increases in difficulty with more enemies and faster speeds
- **Smooth Controls**: WASD movement with mouse-aim shooting mechanics
- **Dynamic Gameplay**: Real-time collision detection and enemy AI
- **Score System**: Earn points by defeating enemies, with multipliers per level
- **Health & Ammo Management**: Strategic resource management adds depth
- **Neon Visual Style**: Cyberpunk-inspired design with glowing effects
- **Responsive UI**: Real-time HUD showing health, ammo, level, and score

## 🎮 How to Play

### Controls
- **W/A/S/D**: Move your character
- **Mouse**: Aim your weapon
- **Left Click**: Shoot

### Objective
Survive all 10 levels by defeating every enemy that spawns. Enemies chase you and deal damage on contact. Each level increases the number of enemies, their speed, and health.

### Game Mechanics
- **Health**: You start with 100 HP. Lose health when enemies touch you. Gain +20 HP between levels.
- **Ammo**: Start with 30 bullets. Gain +10 ammo each level. Each shot consumes 1 ammo.
- **Enemies**: Deal 10 damage on contact. Take 25 damage per bullet hit.
- **Scoring**: Earn 100 points × current level for each enemy defeated.

### Tips
- Keep moving! Standing still makes you an easy target
- Manage your ammo carefully - you can't shoot without bullets
- Lead your shots when enemies are moving
- Use the edges of the arena to create distance
- Each level gets progressively harder, so conserve resources

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd neon-assault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to start playing!

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

## 🛠️ Technology Stack

- **React 18.3.1**: UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Component library
- **Lucide React**: Icon library

## 📁 Project Structure

```
neon-assault/
├── src/
│   ├── components/
│   │   └── game/          # Game components
│   │       ├── Player.tsx
│   │       ├── Enemy.tsx
│   │       ├── Bullet.tsx
│   │       ├── GameUI.tsx
│   │       ├── GameOver.tsx
│   │       └── Victory.tsx
│   ├── pages/
│   │   └── Index.tsx      # Main game logic
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities
│   └── index.css          # Global styles & design system
├── public/                # Static assets
└── package.json
```

## 🎨 Customization

### Adjusting Difficulty
Edit constants in `src/pages/Index.tsx`:

```typescript
const PLAYER_SPEED = 5;              // Player movement speed
const PLAYER_MAX_HEALTH = 100;       // Starting health
const BULLET_SPEED = 10;             // Bullet velocity
const ENEMIES_PER_LEVEL = 3;         // Base enemies per level
const ENEMY_SPEED_MULTIPLIER = 0.3;  // Speed increase per level
```

### Changing Visual Style
Modify the design tokens in `src/index.css`:

```css
--game-glow: 180 100% 50%;    /* Primary glow color */
--enemy-color: 0 85% 60%;     /* Enemy color */
--player-color: 180 100% 50%; /* Player color */
--bullet-color: 30 100% 55%;  /* Bullet color */
```

## 🐛 Troubleshooting

### Game runs slowly
- Close other browser tabs
- Disable browser extensions
- Try a different browser (Chrome/Firefox recommended)

### Controls not responding
- Click inside the game area to ensure focus
- Check that no other applications are capturing keyboard input
- Refresh the page

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 🎯 Future Enhancements

Potential features to add:
- Power-ups (health packs, ammo drops, shields)
- Multiple weapon types
- Boss battles every 3 levels
- Sound effects and background music
- Particle effects and explosions
- Leaderboard system
- Mobile touch controls
- Difficulty settings

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Enjoy the game! Can you survive all 10 levels?** 🎮🔥
