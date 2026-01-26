import React, { useState, useEffect, useCallback } from 'react';
import styles from './SnakeGame.module.css';

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 10, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [state, setState] = useState('idle'); // idle | playing | gameOver
  const [foodLeft, setFoodLeft] = useState(10);

  const generateFood = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  const moveSnake = useCallback(() => {
    setSnake(prev => {
      const head = { ...prev[0], x: prev[0].x + direction.x, y: prev[0].y + direction.y };

      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= GRID_SIZE ||
        head.y >= GRID_SIZE ||
        prev.some(p => p.x === head.x && p.y === head.y)
      ) {
        setState('gameOver');
        return prev;
      }

      const next = [head, ...prev];

      if (head.x === food.x && head.y === food.y) {
        setFood(generateFood());
        setFoodLeft(f => Math.max(0, f - 1));
      } else {
        next.pop();
      }

      return next;
    });
  }, [direction, food]);

  useEffect(() => {
    if (state !== 'playing') return;
    const id = setInterval(moveSnake, 140);
    return () => clearInterval(id);
  }, [state, moveSnake]);

  useEffect(() => {
    const handleKey = e => {
      if (state !== 'playing') return;
      if (e.key === 'ArrowUp' && direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
      if (e.key === 'ArrowDown' && direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
      if (e.key === 'ArrowLeft' && direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
      if (e.key === 'ArrowRight' && direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction, state]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(DIRECTIONS.RIGHT);
    setFoodLeft(10);
    setState('playing');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* GAME GRID */}
        <div className={styles.gameArea}>
          <div className={styles.grid}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isBody = snake.slice(1).some(s => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={i}
                  className={`${styles.cell} ${
                    isHead ? styles.head : isBody ? styles.body : isFood ? styles.food : ''
                  }`}
                />
              );
            })}
          </div>

          {state === 'gameOver' && (
            <div className={styles.overlay}>
              <p>GAME OVER!</p>
              <button onClick={startGame}>start-again</button>
            </div>
          )}
        </div>

        {/* SIDE PANEL */}
        <div className={styles.sidePanel}>
          <div className={styles.help}>
            <p>// use keyboard</p>
            <p>// arrows to play</p>
            <div className={styles.keys}>
              <span ></span>
              <span className={styles.keys_span}>▲</span>
              <span></span>
              <span className={styles.keys_span}>◀</span>
              <span className={styles.keys_span}>▼</span>
              <span className={styles.keys_span}>▶</span>
            </div>
          </div>

          <div className={styles.food}>
            <p>// food left</p>
            <div className={styles.dots}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={i < foodLeft ? styles.dotActive : styles.dot} />
              ))}
            </div>
          </div>

          {state === 'idle' && <button onClick={startGame}>start-game</button>}
          {state === 'playing' && <button className={styles.skip}>skip</button>}
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
