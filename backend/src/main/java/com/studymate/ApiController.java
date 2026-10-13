package com.studymate;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class ApiController {

    private final List<Map<String, Object>> tasks = new ArrayList<>();
    private int nextId = 1;

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "success",
            "message", "StudyMate Java backend is running!"
        );
    }

    @GetMapping("/api")
    public Map<String, String> home() {
        return Map.of(
            "application", "StudyMate",
            "version", "1.0",
            "message", "Welcome to StudyMate API"
        );
    }

    @GetMapping("/api/tasks")
    public List<Map<String, Object>> getTasks() {
        return tasks;
    }

    @PostMapping("/api/tasks")
    public Map<String, Object> addTask(
            @RequestBody Map<String, String> request) {

        String title = request.get("title");
        String date = request.get("date");

        if (title == null || title.isBlank()
                || date == null || date.isBlank()) {
            throw new IllegalArgumentException(
                "Task title and due date are required."
            );
        }

        Map<String, Object> task = new LinkedHashMap<>();
        task.put("id", nextId++);
        task.put("title", title);
        task.put("date", date);

        tasks.add(task);
        return task;
    }

    @DeleteMapping("/api/tasks/{id}")
    public Map<String, String> deleteTask(@PathVariable int id) {
        boolean removed = tasks.removeIf(
            task -> (int) task.get("id") == id
        );

        if (!removed) {
            throw new NoSuchElementException("Task not found.");
        }

        return Map.of("message", "Task deleted successfully");
    }
}

