import React, { useState } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import { useJiraTasks } from './hooks/useJiraTasks';
import './App.css';

function App() {
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);
  
  const { tasks, loading, error, handleDataChange, refreshTasks } = useJiraTasks();

  const addMessage = (message) => {
    const newMessage = { 
      message: `${new Date().toLocaleTimeString()} - ${message}`,
      id: Date.now()
    };
    setMessages(prev => [newMessage, ...prev].slice(0, 10));
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
    addMessage(`Zoom changed to: ${zoom}`);
  };

  const handleDataUpdate = async (entityType, action, item, id) => {
    addMessage(`${entityType} ${action}: ${item.text || id}`);
    const success = await handleDataChange(entityType, action, item, id);
    if (success) {
      addMessage(`✅ ${entityType} ${action} completed successfully`);
    } else {
      addMessage(`❌ Failed to ${action} ${entityType}`);
    }
    return success;
  };

  const handleRefresh = () => {
    refreshTasks();
    addMessage('Manual refresh triggered');
  };

  if (loading && tasks.data.length === 0) {
    return <div className="loading">Loading Jira tasks...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Jira Gantt Dashboard</h1>
        <div className="task-stats">
          Total Tasks: {tasks.data.length}
        </div>
      </header>

      <Toolbar
        zoom={currentZoom}
        onZoomChange={handleZoomChange}
        onRefresh={handleRefresh}
      />

      <div className="gantt-wrapper">
        <Gantt
          tasks={tasks}
          zoom={currentZoom}
          onDataUpdated={handleDataUpdate}
        />
      </div>

      <MessageArea messages={messages} />
    </div>
  );
}

export default App;