import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import styles from './SnakeGame.module.css';

// Game constants
const GRID_SIZE = 15;
const CELL_SIZE = 15; // pixels per cell
const GAME_WIDTH = 238.69;
const GAME_HEIGHT = 405.32;

const INITIAL_SNAKE = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
  { x: 4, y: 7 },
  { x: 3, y: 7 },
];

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

// Arrow icons as SVG components
const ArrowUp = () => (
  <svg viewBox="0 0 24 24" className={`${styles.dPadIcon} ${styles.dPadIconUp}`}>
    <path d="M12 4l-8 8h5v8h6v-8h5z" />
  </svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" className={`${styles.dPadIcon} ${styles.dPadIconDown}`}>
    <path d="M12 20l8-8h-5V4H9v8H4z" />
  </svg>
);

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" className={`${styles.dPadIcon} ${styles.dPadIconLeft}`}>
    <path d="M4 12l8-8v5h8v6h-8v5z" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" className={`${styles.dPadIcon} ${styles.dPadIconRight}`}>
    <path d="M20 12l-8 8v-5H4v-6h8V4z" />
  </svg>
);

// Food Item Component (reusable for both game board and indicator)
function FoodItem({ size = 20.69, className = '' }) {
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <div className={styles.foodItemOuter || styles.gameFoodOuter} style={{ 
        width: size, 
        height: size, 
        borderRadius: '50%',
        background: '#46ECD5',
        opacity: 0.1,
        position: 'absolute',
        top: 0,
        left: 0,
      }} />
      <div className={styles.foodItemMiddle || styles.gameFoodMiddle} style={{ 
        width: size * 0.71, 
        height: size * 0.71, 
        borderRadius: '50%',
        background: '#46ECD5',
        opacity: 0.2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <div className={styles.foodItemInner || styles.gameFoodInner} style={{ 
        width: size * 0.39, 
        height: size * 0.39, 
        borderRadius: '50%',
        background: '#46ECD5',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
    </div>
  );
}

// SVG Snake Path Component
function SnakePath({ snake, gameWidth, gameHeight }) {
  const cellWidth = gameWidth / GRID_SIZE;
  const cellHeight = gameHeight / GRID_SIZE;

  return (
    <svg 
      viewBox={`0 0 ${gameWidth} ${gameHeight}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Render snake as connected line segments */}
      {snake.length > 1 && (
        <path
          d={snake.map((segment, index) => {
            const x = segment.x * cellWidth + cellWidth / 2;
            const y = segment.y * cellHeight + cellHeight / 2;
            return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
          }).join(' ')}
          fill="none"
          stroke="#43D9AD"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(67, 217, 173, 0.5))' }}
        />
      )}
      
      {/* Also render circles at each segment for better visibility */}
      {snake.map((segment, index) => {
        const x = segment.x * cellWidth + cellWidth / 2;
        const y = segment.y * cellHeight + cellHeight / 2;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={5}
            fill="#43D9AD"
            style={{ opacity: 1 - (index * 0.1) }}
          />
        );
      })}
    </svg>
  );
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [nextDirection, setNextDirection] = useState(DIRECTIONS.RIGHT);
  const [state, setState] = useState('idle'); // idle | playing | gameOver
  const [foodLeft, setFoodLeft] = useState(10);
  const [activeButton, setActiveButton] = useState(null);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef(null);

  // Generate random food position
  const generateFood = useCallback(() => {
    let newFood;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      attempts++;
    } while (
      attempts < 100 &&
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  }, [snake]);

  // Move snake
  const moveSnake = useCallback(() => {
    setSnake(prev => {
      const head = { 
        x: prev[0].x + nextDirection.x, 
        y: prev[0].y + nextDirection.y 
      };

      // Check wall collision
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= GRID_SIZE ||
        head.y >= GRID_SIZE
      ) {
        setState('gameOver');
        return prev;
      }

      // Check self collision
      if (prev.some(p => p.x === head.x && p.y === head.y)) {
        setState('gameOver');
        return prev;
      }

      const next = [head, ...prev];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        const newFood = generateFood();
        setFood(newFood);
        const newFoodLeft = Math.max(0, foodLeft - 1);
        setFoodLeft(newFoodLeft);
        setScore(s => s + 10);
        
        // Check win condition
        if (newFoodLeft === 0) {
          setState('gameOver');
        }
      } else {
        next.pop();
      }

      return next;
    });
  }, [nextDirection, food, foodLeft, generateFood]);

  // Game loop
  useEffect(() => {
    if (state !== 'playing') return;

    gameLoopRef.current = setInterval(moveSnake, 140);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [state, moveSnake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = e => {
      if (state !== 'playing') return;

      let newDir = null;
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== DIRECTIONS.DOWN) newDir = DIRECTIONS.UP;
          break;
        case 'ArrowDown':
          if (direction !== DIRECTIONS.UP) newDir = DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          if (direction !== DIRECTIONS.RIGHT) newDir = DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          if (direction !== DIRECTIONS.LEFT) newDir = DIRECTIONS.RIGHT;
          break;
        default:
          break;
      }

      if (newDir) {
        setDirection(newDir);
        setNextDirection(newDir);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, direction]);

  // Start game
  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(DIRECTIONS.RIGHT);
    setNextDirection(DIRECTIONS.RIGHT);
    setFoodLeft(10);
    setScore(0);
    setState('playing');
  };

  // Handle D-pad button press
  const handleDirection = useCallback((dir, buttonName) => {
    setActiveButton(buttonName);
    
    if (state !== 'playing') return;

    // Prevent 180-degree turns
    const opposites = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[buttonName] !== activeButton) {
      setDirection(dir);
      setNextDirection(dir);
    }

    setTimeout(() => setActiveButton(null), 150);
  }, [state, activeButton]);

  // Get food position style
  const getFoodStyle = () => {
    const cellWidth = GAME_WIDTH / GRID_SIZE;
    const cellHeight = GAME_HEIGHT / GRID_SIZE;
    return {
      position: 'absolute',
      top: food.y * cellHeight + cellHeight / 2,
      left: food.x * cellWidth + cellWidth / 2,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Decorative Corner Bolts */}
        <div className={`${styles.bolt} ${styles.boltTopLeft}`} />
        <div className={`${styles.bolt} ${styles.boltTopRight}`} />
        <div className={`${styles.bolt} ${styles.boltBottomLeft}`} />
        <div className={`${styles.bolt} ${styles.boltBottomRight}`} />

        {/* Left Section: Game Board */}
        <div className={styles.gameBoard}>
          {/* SVG Snake Path */}
          <SnakePath snake={snake} gameWidth={GAME_WIDTH} gameHeight={GAME_HEIGHT} />

          {/* Food on game board */}
          <div style={getFoodStyle()}>
            <div style={{
              width: '20.7px',
              height: '20.7px',
              borderRadius: '50%',
              background: '#46ECD5',
              opacity: 0.1,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            <div style={{
              width: '14.7px',
              height: '14.7px',
              borderRadius: '50%',
              background: '#46ECD5',
              opacity: 0.2,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#46ECD5',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
          </div>

          {/* Start Button (when idle) */}
          {state === 'idle' && (
            <button className={styles.startButton} onClick={startGame}>
              start-game
            </button>
          )}

          {/* Game Over Overlay */}
          {state === 'gameOver' && (
            <div className={styles.overlay}>
              <p className={styles.overlayTitle}>
                {foodLeft === 0 ? 'YOU WIN!' : 'GAME OVER'}
              </p>
              <p className={styles.overlayScore}>
                Score: {score}
              </p>
              <button className={styles.overlayButton} onClick={startGame}>
                play-again
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Controls and Info */}
        <div className={styles.rightSection}>
          {/* Game Navigation Panel */}
          <div className={styles.navPanel}>
            <div className={styles.instructions}>
              <p>// use keyboard</p>
              <p>// arrows to play</p>
            </div>

            {/* D-Pad Controls */}
            <div className={styles.dPad}>
              <div className={styles.dPadEmpty} />
              <button
                className={`${styles.dPadButton} ${activeButton === 'UP' ? styles.active : ''}`}
                onClick={() => handleDirection(DIRECTIONS.UP, 'UP')}
              >
                <ArrowUp />
              </button>
              <div className={styles.dPadEmpty} />
              <button
                className={`${styles.dPadButton} ${activeButton === 'LEFT' ? styles.active : ''}`}
                onClick={() => handleDirection(DIRECTIONS.LEFT, 'LEFT')}
              >
                <ArrowLeft />
              </button>
              <button
                className={`${styles.dPadButton} ${activeButton === 'DOWN' ? styles.active : ''}`}
                onClick={() => handleDirection(DIRECTIONS.DOWN, 'DOWN')}
              >
                <ArrowDown />
              </button>
              <button
                className={`${styles.dPadButton} ${activeButton === 'RIGHT' ? styles.active : ''}`}
                onClick={() => handleDirection(DIRECTIONS.RIGHT, 'RIGHT')}
              >
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* Food Left Indicator */}
          <div className={styles.foodLeftPanel}>
            <p className={styles.foodLeftLabel}>// food left</p>
            <div className={styles.foodItems}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`${styles.foodItem} ${i >= 8 ? styles.foodItemDimmed : ''}`}
                >
                  <div className={styles.foodItemOuter} />
                  <div className={styles.foodItemMiddle} />
                  <div className={styles.foodItemInner} />
                </div>
              ))}
            </div>
          </div>

          {/* Skip Button */}
          {(state === 'playing' || state === 'idle') && (
            <button className={styles.skipButton} onClick={startGame}>
              skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;

