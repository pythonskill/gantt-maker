package com.pythonskill.resource;

import com.pythonskill.dto.LinkCreateRequest;
import com.pythonskill.entity.JiraLink;
import com.pythonskill.service.JiraLinkService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/jira-links")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JiraLinkResource {
    
    @Inject
    JiraLinkService linkService;
    
    @POST
    public Response createLink(@Valid LinkCreateRequest request) {
        JiraLink link = linkService.createLink(request);
        return Response.status(Response.Status.CREATED)
            .entity(link)
            .build();
    }
    
    @DELETE
    @Path("/{id}")
    public Response deleteLink(@PathParam("id") Long id) {
        linkService.deleteLink(id);
        return Response.noContent().build();
    }
}
