package com.pythonskill.repository;

import com.pythonskill.entity.JiraLink;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class JiraLinkRepository implements PanacheRepository<JiraLink> {
    
    public List<JiraLink> findBySourceId(Long sourceId) {
        return find("source.id", sourceId).list();
    }
    
    public List<JiraLink> findByTargetId(Long targetId) {
        return find("target.id", targetId).list();
    }
    
    public void deleteBySourceAndTarget(Long sourceId, Long targetId) {
        delete("source.id = ?1 and target.id = ?2", sourceId, targetId);
    }
}
