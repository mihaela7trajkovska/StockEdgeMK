package mk.ukim.finki.stockedgemk.web;

import mk.ukim.finki.stockedgemk.model.User;
import mk.ukim.finki.stockedgemk.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok(Map.of("message", "Registration successful!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email,@RequestParam  String password ) {
//        String email = loginData.get("email");
//        String password = loginData.get("password");

        // Validate user credentials (mocked for now)
        if ("test@example.com".equals(email) && "password123".equals(password)) {
            String token = "JWT_GENERATED_TOKEN";
            return ResponseEntity.ok(Map.of("token", token, "message", "Login successful"));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }

    @GetMapping("/login")
    public ResponseEntity<?> getLoginPage() {
        return ResponseEntity.ok(Map.of("message", "Please login with POST /api/auth/login"));
    }
}

/*
import mk.ukim.finki.stockedgemk.model.User;
import mk.ukim.finki.stockedgemk.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String token = "JWT_GENERATED_TOKEN";
        return ResponseEntity.ok(Map.of("token", token));
    }
}


 */