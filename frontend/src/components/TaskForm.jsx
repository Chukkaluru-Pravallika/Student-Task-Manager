import { useState } from "react";

export default function TaskForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [priority, setPriority] = useState(initialData.priority || "medium");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority, dueDate });
  };

  return (
    <form onSubmit={submit}>
      <input required value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button>Save</button>
    </form>
  );
}
