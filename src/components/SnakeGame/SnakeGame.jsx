import React, { useState, useEffect, useCallback } from 'react';
import styles from './SnakeGame.module.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameState, setGameState] = useState('idle'); // idle, playing, gameOver
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('gameOver');
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('gameOver');
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (gameState !== 'playing') return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
        break;
      case 'ArrowDown':
        if (direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
        break;
      case 'ArrowLeft':
        if (direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
        break;
      case 'ArrowRight':
        if (direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
        break;
      default:
        break;
    }
  }, [direction, gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameState === 'playing') {
      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
    }
  }, [gameState, moveSnake]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setGameState('playing');
  };

  const skipGame = () => {
    setGameState('idle');
  };

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;

        let cellClass = styles.cell;
        if (isSnakeHead) cellClass += ` ${styles.snakeHead}`;
        else if (isSnakeBody) cellClass += ` ${styles.snakeBody}`;
        else if (isFood) cellClass += ` ${styles.food}`;

        grid.push(
          <div key={`${x}-${y}`} className={cellClass}></div>
        );
      }
    }
    return grid;
  };

  return (
    <div className={styles.gamePanel}>
      <div className={styles.gameGrid}>
        {renderGrid()}
      </div>
      <div className={styles.controls}>
        {gameState === 'idle' && (
          <button className={styles.button} onClick={startGame} aria-label="Start Snake Game">
            start-game
          </button>
        )}
        {gameState === 'playing' && (
          <button className={styles.button} onClick={skipGame} aria-label="Skip Snake Game">
            skip
          </button>
        )}
        {gameState === 'gameOver' && (
          <div>
            <p className={styles.gameOverText}>Game Over! Score: {score}</p>
            <button className={styles.button} onClick={startGame} aria-label="Restart Snake Game">
              restart
            </button>
          </div>
        )}
        <div className={styles.score}>
          Food: {score}
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
