import { useState } from 'react';
import { useGameState } from './logic/useGameState';
import StatsBar from './components/StatsBar';
import TaskItem from './components/TaskItem';
import './index.css';

function App() {
  // Вытаскиваем ВСЁ необходимое из нашего хука
  const { hero, tasks, setTasks, completeTask, failTask, buyItem } = useGameState();
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text) return;
    // Теперь setTasks будет работать, так как мы его импортировали выше
    setTasks([...tasks, { id: Date.now(), text, difficulty: 1, type: "Дело" }]);
    setText("");
  };

  return (
    <div className="container">
      <StatsBar hero={hero} />
      
      <form onSubmit={addTask} className="add-form">
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Новый квест..." 
        />
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