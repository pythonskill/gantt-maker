package com.pythonskill.service;

import com.pythonskill.dto.LinkCreateRequest;
import com.pythonskill.entity.JiraLink;
import com.pythonskill.entity.JiraTask;
import com.pythonskill.repository.JiraLinkRepository;
import com.pythonskill.repository.JiraTaskRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class JiraLinkService {
    
    @Inject
    JiraLinkRepository linkRepository;
    
    @Inject
    JiraTaskRepository taskRepository;
    
    @Transactional
    public JiraLink createLink(LinkCreateRequest request) {
        JiraTask source = taskRepository.findByIdOptional(request.source)
            .orElseThrow(() -> new NotFoundException("Source task not found: " + request.source));
        
        JiraTask target = taskRepository.findByIdOptional(request.target)
            .orElseThrow(() -> new NotFoundException("Target task not found: " + request.target));
        
        String type = request.type != null ? request.type : "finish-to-start";
        
        JiraLink link = new JiraLink(source, target, type);
        linkRepository.persist(link);
        return link;
    }
    
    @Transactional
    public void deleteLink(Long id) {
        JiraLink link = linkRepository.findByIdOptional(id)
            .orElseThrow(() -> new NotFoundException("Link not found: " + id));
        linkRepository.delete(link);
    }
    
    @Transactional
    public void deleteLinkBySourceAndTarget(Long sourceId, Long targetId) {
        linkRepository.deleteBySourceAndTarget(sourceId, targetId);
    }
}
