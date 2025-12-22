import TaskForm from "./TaskForm";

export default function EditTaskModal({ task, onClose, onUpdate }) {
  return (
    <div className="modal">
      <h2>Edit Task</h2>
      <TaskForm
        initialData={task}
        onSubmit={(data) => onUpdate(task._id, data)}
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
}
