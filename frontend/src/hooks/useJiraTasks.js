import { useState, useEffect, useCallback } from 'react';
import { jiraApi } from '../services/api';
import { transformJiraToGantt, transformGanttToJiraUpdate } from '../utils/ganttTransformer';

export const useJiraTasks = () => {
  const [tasks, setTasks] = useState({ data: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const jiraTasks = await jiraApi.getAllTasks();
      const transformed = transformJiraToGantt(jiraTasks);
      setTasks(transformed);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Обработчик изменений из Gantt
  const handleDataChange = useCallback(async (entityType, action, item, id) => {
    try {
      switch (entityType) {
        case 'task':
          if (action === 'update') {
            const updateData = transformGanttToJiraUpdate(item);
            await jiraApi.updateTask(id, updateData);
          } else if (action === 'delete') {
            await jiraApi.deleteTask(id);
          } else if (action === 'insert') {
            const newTask = transformGanttToJiraUpdate(item);
            await jiraApi.createTask(newTask);
          }
          break;

        case 'link':
          if (action === 'insert') {
            await jiraApi.createLink({
              source: item.source,
              target: item.target,
              type: item.type
            });
          } else if (action === 'delete') {
            await jiraApi.deleteLink(id);
          }
          break;

        default:
          break;
      }

      // После успешного сохранения перезагружаем данные для синхронизации
      await loadTasks();
      
      return true; // Успешное выполнение
    } catch (err) {
      console.error('Failed to save changes:', err);
      setError(err.message);
      return false; // Откат изменений в Gantt
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    handleDataChange,
    refreshTasks: loadTasks
  };
};