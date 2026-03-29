package com.pythonskill.dto;

import lombok.Data;

@Data
public class LinkCreateRequest {
    public Long source;
    public Long target;
    public String type; // default '0' for finish-to-start
}
