import { useState, useEffect } from 'react';
import { useGameState } from './logic/useGameState';
import StatsBar from './components/StatsBar';
import TaskItem from './components/TaskItem';
import './index.css';

function App() {
  // Вытаскиваем все функции из нашей логики
  const { hero, tasks, setTasks, completeTask, failTask } = useGameState();
  
  // Состояния для формы
  const [text, setText] = useState("");
  const [type, setType] = useState("Интеллект");

  // Безопасная инициализация Telegram WebApp
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = { 
      id: Date.now(), 
      text, 
      difficulty: 1, 
      type: type 
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  return (
    <div className="container">
      <StatsBar hero={hero} />
      
      <form onSubmit={addTask} className="add-form">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Что нужно сделать?" 
        />
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="type-select"
        >
          <option value="Интеллект">🧠 Интеллект</option>
          <option value="Сила">💪 Сила</option>
          <option value="Ловкость">⚡ Ловкость</option>
          <option value="Дело">🧹 Дело</option>
        </select>
        <button type="submit">Добавить</button>
      </form>

      <div className="journal">
        {tasks.map(t => (
          <TaskItem 
            key={t.id} 
            task={t} 
            onComplete={completeTask} 
            onFail={failTask} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;