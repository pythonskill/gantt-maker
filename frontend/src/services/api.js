// Предполагаем, что у нас есть REST API для JiraTask
const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const jiraApi = {
  // Получение всех задач (с иерархией)
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/jira-tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  // Создание новой задачи
  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/jira-tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
  },

  // Обновление задачи
  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/jira-tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  // Удаление задачи
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/jira-tasks/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
  },

  // Создание связи между задачами (link)
  createLink: async (linkData) => {
    const response = await fetch(`${API_BASE_URL}/jira-links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(linkData)
    });
    if (!response.ok) throw new Error('Failed to create link');
    return response.json();
  },

  // Удаление связи
  deleteLink: async (id) => {
    const response = await fetch(`${API_BASE_URL}/jira-links/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete link');
    return response.json();
  }
};