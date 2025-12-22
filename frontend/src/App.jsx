// frontend/src/App.jsx
import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Student Task Manager</h1>
        <p>Connected to MongoDB Atlas Cloud Database</p>
      </header>
      
      <main>
        <TaskList />
      </main>
      
      <footer>
        <p>Backend running on: <strong>http://localhost:5600</strong></p>
        <p>MongoDB Database: <strong>taskmanager</strong></p>
        <p style={{fontSize: '12px', color: '#666', marginTop: '10px'}}>
          Tasks are stored in MongoDB Atlas cloud
        </p>
      </footer>
    </div>
  );
}

export default App;