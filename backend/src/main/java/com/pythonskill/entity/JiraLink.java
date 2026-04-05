package com.pythonskill.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jira_links")
@Data
@AllArgsConstructor
public class JiraLink extends PanacheEntityBase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    
    @ManyToOne
    @JoinColumn(name = "source_id", nullable = false)
    public JiraTask source;
    
    @ManyToOne
    @JoinColumn(name = "target_id", nullable = false)
    public JiraTask target;
    
    public String type; // 'finish-to-start', 'start-to-start', etc.
    
    public JiraLink() {
    }
    
    public JiraLink(JiraTask source, JiraTask target, String type) {
        this.source = source;
        this.target = target;
        this.type = type;
    }
}
