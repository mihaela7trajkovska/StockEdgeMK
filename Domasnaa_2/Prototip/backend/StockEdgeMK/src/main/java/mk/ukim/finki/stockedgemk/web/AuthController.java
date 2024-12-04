package mk.ukim.finki.stockedgemk.web;

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
        // Validate username and password, then generate JWT
        String token = "JWT_GENERATED_TOKEN";  // Replace with logic for generating token
        return ResponseEntity.ok(Map.of("token", token));
    }
}
