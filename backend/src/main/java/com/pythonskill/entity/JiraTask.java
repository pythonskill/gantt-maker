package com.pythonskill.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jira_tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JiraTask extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    @Column(nullable = false)
    public String summary;
    
    @Column(name = "start_date")
    public LocalDateTime startDate;
    
    public Integer duration; // in days
    
    public Double progress; // 0.0 to 1.0
    
    @Column(name = "parent_id")
    public Long parentId;
    
    public String status; // To Do, In Progress, Done
    
    public String assignee;
    
    public String priority; // Low, Medium, High, Critical
    
    @Column(name = "story_points")
    public Integer storyPoints;
    
    @Column(name = "created_date")
    public LocalDateTime createdDate;
    
    @Column(name = "updated_date")
    public LocalDateTime updatedDate;
    
    @OneToMany(mappedBy = "source", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<JiraLink> outgoingLinks = new ArrayList<>();
    
    @OneToMany(mappedBy = "target", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<JiraLink> incomingLinks = new ArrayList<>();
    
    public JiraTask(String summary, LocalDateTime startDate, Integer duration, 
                    Double progress, Long parentId, String status, String assignee, 
                    String priority, Integer storyPoints) {
        this.summary = summary;
        this.startDate = startDate;
        this.duration = duration;
        this.progress = progress;
        this.parentId = parentId;
        this.status = status;
        this.assignee = assignee;
        this.priority = priority;
        this.storyPoints = storyPoints;
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedDate = LocalDateTime.now();
    }
    
    // Helper method to get predecessor IDs
    public List<Long> getPredecessorIds() {
        return incomingLinks.stream()
            .filter(link -> "finish-to-start".equals(link.type))
            .map(link -> link.source.id)
            .toList();
    }
}
