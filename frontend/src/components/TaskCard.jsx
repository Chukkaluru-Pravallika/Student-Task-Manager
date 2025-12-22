import { format } from 'date-fns';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityColors = {
    high: 'bg-red-100 border-red-300',
    medium: 'bg-yellow-100 border-yellow-300',
    low: 'bg-green-100 border-green-300'
  };

  return (
    <div className={`p-4 border rounded-lg mb-3 ${priorityColors[task.priority]}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task._id)}
            className="mt-1"
          />
          <div>
            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            {task.dueDate && (
              <p className="text-xs text-gray-500 mt-2">
                Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-200">
          Priority: {task.priority}
        </span>
        <span className="text-xs text-gray-500">
          Created: {format(new Date(task.createdAt), 'MMM dd')}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;