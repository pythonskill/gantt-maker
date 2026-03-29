package com.pythonskill.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskCreateRequest {
    public String summary;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    public LocalDateTime startDate;
    
    public Integer duration;
    public Double progress;
    public Long parentId;
    public String status;
    public String assignee;
    public String priority;
    public Integer storyPoints;
}
