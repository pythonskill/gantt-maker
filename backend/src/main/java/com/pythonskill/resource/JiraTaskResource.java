package com.pythonskill.resource;

import com.pythonskill.dto.TaskCreateRequest;
import com.pythonskill.dto.TaskUpdateRequest;
import com.pythonskill.entity.JiraTask;
import com.pythonskill.service.JiraTaskService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/jira-tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JiraTaskResource {
    
    @Inject
    JiraTaskService taskService;
    
    @GET
    public List<JiraTask> getAllTasks() {
        return taskService.getAllTasks();
    }
    
    @GET
    @Path("/{id}")
    public JiraTask getTaskById(@PathParam("id") Long id) {
        return taskService.getTaskById(id);
    }
    
    @POST
    public Response createTask(@Valid TaskCreateRequest request) {
        JiraTask task = taskService.createTask(request);
        return Response.status(Response.Status.CREATED)
            .entity(task)
            .build();
    }
    
    @PUT
    @Path("/{id}")
    public JiraTask updateTask(@PathParam("id") Long id, @Valid TaskUpdateRequest request) {
        return taskService.updateTask(id, request);
    }
    
    @DELETE
    @Path("/{id}")
    public Response deleteTask(@PathParam("id") Long id) {
        taskService.deleteTask(id);
        return Response.noContent().build();
    }
}
