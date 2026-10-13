```java
package com.studymate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ApiController {

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
}
```
