package com.pythonskill.repository;

import com.pythonskill.entity.JiraTask;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class JiraTaskRepository implements PanacheRepository<JiraTask> {
    
    public List<JiraTask> findByParentId(Long parentId) {
        return find("parentId", parentId).list();
    }
    
    public List<JiraTask> findByStatus(String status) {
        return find("status", status).list();
    }
    
    public List<JiraTask> findByAssignee(String assignee) {
        return find("assignee", assignee).list();
    }
}
