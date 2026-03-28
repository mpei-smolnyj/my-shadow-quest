export default function TaskItem({ task, onComplete, onFail }) {
  // Определяем цвет левой границы в зависимости от типа
  const typeColors = {
    "Интеллект": "#3498db",
    "Сила": "#e74c3c",
    "Ловкость": "#2ecc71",
    "Дело": "#9b59b6"
  };

  const borderColor = typeColors[task.type] || "#00ff00";

  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${borderColor}` }}>
      <div className="task-header">
        <span className="task-tag" style={{ color: borderColor }}>[{task.type}]</span>
        <p className="task-text">{task.text}</p>
      </div>
      <div className="task-actions">
        <button className="btn-done" onClick={() => onComplete(task)}>Выполнить</button>
        <button className="btn-fail" onClick={() => onFail(task.id)}>Провал</button>
      </div>
    </div>
  );
}