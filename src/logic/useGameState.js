// src/logic/useGameState.js
import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [hero, setHero] = useState(() => {
    const saved = localStorage.getItem("hero_stats");
    return saved ? JSON.parse(saved) : { hp: 100, xp: 0, gold: 50, lvl: 1 };
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("hero_tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("hero_stats", JSON.stringify(hero));
    localStorage.setItem("hero_tasks", JSON.stringify(tasks));
  }, [hero, tasks]);

  const completeTask = (task) => {
    const xpGain = task.difficulty * 20;
    const goldGain = task.difficulty * 10;
    setHero(prev => ({
      ...prev,
      xp: prev.xp + xpGain,
      gold: prev.gold + goldGain,
      lvl: Math.floor((prev.xp + xpGain) / 200) + 1
    }));
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const failTask = (id) => {
    setHero(prev => ({ ...prev, hp: Math.max(0, prev.hp - 20) }));
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { hero, tasks, setTasks, completeTask, failTask, buyItem };
};