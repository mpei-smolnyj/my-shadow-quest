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
  
  setTasks(prev => prev.filter(t => t.id !== task.id));
};

  const failTask = (id) => {
    setHero(prev => ({ ...prev, hp: Math.max(0, prev.hp - 20) }));
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const buyItem = (price, hpRestore) => {
  if (hero.gold >= price) {
    setHero(prev => ({ 
      ...prev, 
      gold: prev.gold - price, 
      hp: Math.min(100, prev.hp + hpRestore) 
    }));
    return true;
  }
  return false;
};

   const completeTask = (task) => {
      let xpGain = task.difficulty * 20;
      let goldGain = task.difficulty * 10;
      let message = "";

      if (Math.random() < 0.2) {
        const events = [
        { text: "💰 Вы нашли заначку в старых джинсах!", gold: 15, xp: 0 },
        { text: "📖 Прочитанная статья оказалась полезной!", gold: 0, xp: 30 },
        { text: "🍀 Удача! Двойной опыт за задачу!", gold: 0, xp: xpGain },
        { text: "💎 Награда от гильдии за усердие!", gold: 25, xp: 10 }
      ];
    
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        goldGain += randomEvent.gold;
        xpGain += randomEvent.xp;
        message = randomEvent.text;
    
      if (message) alert(message); 
      }

    setHero(prev => ({
      ...prev,
      xp: prev.xp + xpGain,
      gold: prev.gold + goldGain,
      lvl: Math.floor((prev.xp + xpGain) / 200) + 1
  }));

  setTasks(prev => prev.filter(t => t.id !== task.id));

  return { hero, tasks, setTasks, completeTask, failTask, buyItem };
}