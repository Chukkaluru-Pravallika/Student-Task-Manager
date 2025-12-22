// frontend/src/components/TaskList.jsx - UPDATED WITH + BUTTON
import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import AddTaskModal from './AddTaskModal'; // Import the modal

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAll();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);
  
  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // DELETE FUNCTION
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.delete(taskId);
      console.log('Task deleted:', taskId);
      
      // Remove task from state
      setTasks(tasks.filter(task => task._id !== taskId));
      
      alert('✅ Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('❌ Failed to delete task');
    }
  };

  // EDIT FUNCTIONS
  const handleEditClick = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditForm({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: ''
    });
  };

  const handleUpdateTask = async (taskId) => {
    try {
      const response = await taskAPI.update(taskId, editForm);
      console.log('Task updated:', response.data);
      
      // Update task in state
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
      
      setEditingTask(null);
      alert('✅ Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      alert('❌ Failed to update task');
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  if (loading) return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      fontSize: '18px',
      color: '#666'
    }}>
      ⏳ Loading tasks from MongoDB Atlas...
    </div>
  );
  
  if (error) return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      color: '#f44336',
      fontSize: '18px'
    }}>
      ❌ {error}
    </div>
  );

  return (
    <div>
      {/* + BUTTON TO ADD TASK */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>
          📋 Your Tasks ({tasks.length} total)
        </h2>
        
        <button
          onClick={openModal}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <span style={{ fontSize: '20px' }}>+</span> Add New Task
        </button>
      </div>

      {/* ADD TASK MODAL */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onTaskAdded={fetchTasks}
      />

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px',
          background: '#f9f9f9',
          borderRadius: '12px',
          color: '#666'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>📭</div>
          <h3>No tasks yet</h3>
          <p>Click the "+ Add New Task" button to create your first task!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {tasks.map(task => (
            <div key={task._id} style={{
              border: '1px solid #e0e0e0',
              padding: '20px',
              borderRadius: '10px',
              background: 'white',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>
              {/* EDIT MODE */}
              {editingTask === task._id ? (
                <div>
                  <h3 style={{ margin: '0 0 15px 0', color: '#2196F3' }}>✏️ Edit Task</h3>
                  {/* ... (keep your existing edit form code) ... */}
                </div>
              ) : (
                /* VIEW MODE */
                <>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{task.title}</h3>
                  {task.description && (
                    <p style={{ margin: '0 0 15px 0', color: '#666', lineHeight: '1.5' }}>
                      {task.description}
                    </p>
                  )}
                  <div style={{
                    display: 'flex',
                    gap: '15px',
                    marginTop: '15px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      padding: '6px 15px',
                      background: task.status === 'completed' ? '#4CAF50' : 
                                 task.status === 'in-progress' ? '#FF9800' : '#9E9E9E',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {task.status.toUpperCase()}
                    </span>
                    <span style={{
                      padding: '6px 15px',
                      background: task.priority === 'high' ? '#F44336' : 
                                 task.priority === 'medium' ? '#FF9800' : '#4CAF50',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {task.priority.toUpperCase()} PRIORITY
                    </span>
                    {task.dueDate && (
                      <span style={{
                        padding: '6px 15px',
                        background: '#E3F2FD',
                        color: '#1976D2',
                        borderRadius: '20px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        📅 Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                  
                  {/* EDIT/DELETE BUTTONS */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1px solid #eee'
                  }}>
                    <button 
                      onClick={() => handleEditClick(task)}
                      style={{
                        padding: '8px 20px',
                        background: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task._id)}
                      style={{
                        padding: '8px 20px',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;