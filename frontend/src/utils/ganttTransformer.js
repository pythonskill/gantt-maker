// Преобразуем JiraTask в формат DHTMLX Gantt
export const transformJiraToGantt = (jiraTasks) => {
  const tasks = jiraTasks.map(task => ({
    id: task.id,
    text: task.summary || task.title,
    start_date: task.startDate || task.createdDate,
    duration: task.duration || task.estimateDays || 1,
    progress: task.progress || 0,
    parent: task.parentId || null,
    // Сохраняем оригинальные Jira-поля
    originalData: {
      status: task.status,
      assignee: task.assignee,
      priority: task.priority,
      storyPoints: task.storyPoints
    }
  }));

  const links = jiraTasks
    .filter(task => task.predecessorIds && task.predecessorIds.length > 0)
    .flatMap(task => 
      task.predecessorIds.map(predecessorId => ({
        id: `${predecessorId}-${task.id}`,
        source: predecessorId,
        target: task.id,
        type: task.linkType || '0' // 0 = finish-to-start
      }))
    );

  return { data: tasks, links };
};

// Преобразуем изменения из Gantt обратно в формат JiraTask
export const transformGanttToJiraUpdate = (taskUpdate) => {
  return {
    id: taskUpdate.id,
    summary: taskUpdate.text,
    startDate: taskUpdate.start_date,
    duration: taskUpdate.duration,
    progress: taskUpdate.progress,
    parentId: taskUpdate.parent,
    updatedAt: new Date().toISOString()
  };
};