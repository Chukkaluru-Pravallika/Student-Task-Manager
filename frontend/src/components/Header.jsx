export default function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>Student Task Manager</h1>
      <button onClick={onAdd}>+ Add Task</button>
    </header>
  );
}
