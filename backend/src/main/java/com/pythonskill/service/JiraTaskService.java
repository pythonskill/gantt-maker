package com.pythonskill.service;

import com.pythonskill.dto.TaskCreateRequest;
import com.pythonskill.dto.TaskUpdateRequest;
import com.pythonskill.entity.JiraTask;
import com.pythonskill.repository.JiraLinkRepository;
import com.pythonskill.repository.JiraTaskRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class JiraTaskService {
    
    @Inject
    JiraTaskRepository taskRepository;
    
    @Inject
    JiraLinkRepository linkRepository;
    
    public List<JiraTask> getAllTasks() {
        return taskRepository.listAll();
    }
    
    public JiraTask getTaskById(Long id) {
        return taskRepository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("Task not found: " + id));
    }
    
    @Transactional
    public JiraTask createTask(TaskCreateRequest request) {
        JiraTask task = new JiraTask(
            request.summary,
            request.startDate,
            request.duration,
            request.progress != null ? request.progress : 0.0,
            request.parentId,
            request.status != null ? request.status : "To Do",
            request.assignee,
            request.priority != null ? request.priority : "Medium",
            request.storyPoints
        );
        
        taskRepository.persist(task);
        return task;
    }
    
    @Transactional
    public JiraTask updateTask(Long id, TaskUpdateRequest request) {
        JiraTask task = getTaskById(id);
        
        if (request.summary != null) task.summary = request.summary;
        if (request.startDate != null) task.startDate = request.startDate;
        if (request.duration != null) task.duration = request.duration;
        if (request.progress != null) task.progress = request.progress;
        if (request.parentId != null) task.parentId = request.parentId;
        if (request.status != null) task.status = request.status;
        if (request.assignee != null) task.assignee = request.assignee;
        if (request.priority != null) task.priority = request.priority;
        if (request.storyPoints != null) task.storyPoints = request.storyPoints;
        
        taskRepository.persist(task);
        return task;
    }
    
    @Transactional
    public void deleteTask(Long id) {
        JiraTask task = getTaskById(id);
        
        // Удаляем все связи, связанные с этой задачей
        linkRepository.deleteBySourceAndTarget(id, id);
        
        taskRepository.delete(task);
    }
}
