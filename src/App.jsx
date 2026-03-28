import { useState, useEffect } from 'react'

function App() {
  // --- 1. ЗАГРУЗКА ДАННЫХ ИЗ ПАМЯТИ ---
  const [hero, setHero] = useState(() => {
    const saved = localStorage.getItem("hero_stats");
    try {
      return saved ? JSON.parse(saved) : { hp: 100, xp: 0, gold: 50, lvl: 1 };
    } catch (e) {
      return { hp: 100, xp: 0, gold: 50, lvl: 1 };
    }
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("hero_tasks");
    try {
      return saved ? JSON.parse(saved) : [{ id: 1, text: "Первый запуск", difficulty: 1, type: "Интеллект" }];
    } catch (e) {
      return [{ id: 1, text: "Первый запуск", difficulty: 1, type: "Интеллект" }];
    }
  });

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDiff, setNewTaskDiff] = useState(1);
  const [newTaskType, setNewTaskType] = useState("Сила");

  // --- 2. АВТОСОХРАНЕНИЕ ---
  useEffect(() => {
    localStorage.setItem("hero_stats", JSON.stringify(hero));
    localStorage.setItem("hero_tasks", JSON.stringify(tasks));
  }, [hero, tasks]);

  // --- 3. ЛОГИКА ---
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      difficulty: Number(newTaskDiff),
      type: newTaskType
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const completeTask = (task) => {
    const xpGain = task.difficulty * 20;
    const goldGain = task.difficulty * 10;
    let eventMsg = "";
    if (Math.random() < 0.15) {
      const bonus = 50;
      setHero(prev => ({ ...prev, gold: prev.gold + bonus }));
      eventMsg = "\nСобытие: Вы нашли клад! +50 золота!";
    }
    setHero(prev => ({
      ...prev,
      xp: prev.xp + xpGain,
      gold: prev.gold + goldGain,
      lvl: Math.floor((prev.xp + xpGain) / 200) + 1
    }));
    setTasks(tasks.filter(t => t.id !== task.id));
    alert("Квест выполнен! \nОпыт: +" + xpGain + "\nЗолото: +" + goldGain + eventMsg);
  };

  const failTask = (id) => {
    const damage = 20;
    setHero(prev => ({ ...prev, hp: Math.max(0, prev.hp - damage) }));
    setTasks(tasks.filter(t => t.id !== id));
    alert("Квест провален! 💔 Вы потеряли " + damage + " HP.");
  };

  // --- 4. ИНТЕРФЕЙС ---
  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'monospace', backgroundColor: '#121212', color: '#00ff00', minHeight: '100vh' }}>
      <header style={{ border: '2px solid #00ff00', padding: '15px', marginBottom: '20px', borderRadius: '10px' }}>
        <h2 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>🛡 СТАТУС ГЕРОЯ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '1.1em' }}>
          <div>❤️ HP: {hero.hp}</div>
          <div>✨ XP: {hero.xp}</div>
          <div>💰 GOLD: {hero.gold}</div>
          <div>📊 LVL: {hero.lvl}</div>
        </div>
      </header>
        <section style={{ marginBottom: '30px', padding: '10px', background: '#1e1e1e', borderRadius: '10px' }}>
        <h4>➕ НОВЫЙ КВЕСТ</h4>
        <form onSubmit={addTask}>
          <input 
            type="text" 
            placeholder="Что нужно сделать?" 
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            style={{ width: '90%', padding: '8px', marginBottom: '10px', background: '#000', color: '#00ff00', border: '1px solid #00ff00' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select value={newTaskType} onChange={(e) => setNewTaskType(e.target.value)} style={{ background: '#000', color: '#00ff00', border: '1px solid #00ff00' }}>
              <option>Сила</option>
              <option>Интеллект</option>
              <option>Ловкость</option>
            </select>
            <select value={newTaskDiff} onChange={(e) => setNewTaskDiff(e.target.value)} style={{ background: '#000', color: '#00ff00', border: '1px solid #00ff00' }}>
              <option value="1">Легко (x1)</option>
              <option value="2">Нормально (x2)</option>
              <option value="3">БОСС (x3)</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#00ff00', color: '#000', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
            ДОБАВИТЬ КВЕСТ
          </button>
        </form>
      </section>

      <main>
        <h3>📜 ЖУРНАЛ ЗАДАНИЙ:</h3>
        {tasks.map(task => (
          <div key={task.id} style={{ borderLeft: '4px solid #00ff00', padding: '15px', marginBottom: '15px', background: '#1e1e1e' }}>
            <div><span style={{ color: '#888' }}>[{task.type}]</span> {task.text}</div>
            <div style={{ fontSize: '0.8em', marginBottom: '10px' }}>СЛОЖНОСТЬ: {task.difficulty}</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => completeTask(task)} style={{ flex: 1, background: '#004400', color: '#00ff00', border: '1px solid #00ff00', cursor: 'pointer' }}>ВЫПОЛНИТЬ</button>
              <button onClick={() => failTask(task.id)} style={{ background: '#440000', color: '#ff0000', border: '1px solid #ff0000', cursor: 'pointer' }}>Провал</button>
            </div>
          </div>
        ))}
      </main>
            {/* МАГАЗИН */}
      <section style={{ marginTop: '40px', padding: '15px', border: '1px dashed #00ff00', borderRadius: '10px' }}>
        <h3 style={{ textAlign: 'center' }}>🏪 МАГАЗИН ТАВЕРНЫ</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span>🧪 Малое зелье (+20 HP)</span>
          <button 
            onClick={() => {
              if (hero.gold >= 20) {
                setHero(prev => ({ ...prev, gold: prev.gold - 20, hp: Math.min(100, prev.hp + 20) }));
              } else {
                alert("Недостаточно золота!");
              }
            }}
            style={{ background: '#333', color: '#00ff00', border: '1px solid #00ff00', cursor: 'pointer', padding: '5px' }}
          >
            20💰
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>⚗️ Эликсир (+50 HP)</span>
          <button 
            onClick={() => {
              if (hero.gold >= 50) {
                setHero(prev => ({ ...prev, gold: prev.gold - 50, hp: Math.min(100, prev.hp + 50) }));
              } else {
                alert("Недостаточно золота!");
              }
            }}
            style={{ background: '#333', color: '#00ff00', border: '1px solid #00ff00', cursor: 'pointer', padding: '5px' }}
          >
            50💰
          </button>
        </div>
      </section>

    </div>
  )
}

export default App
