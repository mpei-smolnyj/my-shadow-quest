export default function TaskItem({ task, onComplete, onFail }) {
  return (
    <div className="task-card">
      <div className="task-info">
        <span className="task-type">[{task.type}]</span>
        <p>{task.text}</p>
      </div>
      <div className="task-actions">
        <button className="btn-success" onClick={() => onComplete(task)}>Выполнить</button>
        <button className="btn-danger" onClick={() => onFail(task.id)}>Провал</button>
      </div>
    </div>
  );
}