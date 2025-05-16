package com.example.eventmanagement.controller;

import com.example.eventmanagement.model.User;
import com.example.eventmanagement.payload.LoginRequest;
import com.example.eventmanagement.payload.LoginResponse;
import com.example.eventmanagement.payload.RegisterRequest;
import com.example.eventmanagement.repository.UserRepository;
import com.example.eventmanagement.security.JwtTokenUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;
private final AuthenticationManager authenticationManager;
private final JwtTokenUtil jwtTokenUtil;

public AuthController(UserRepository userRepository,
PasswordEncoder passwordEncoder,
AuthenticationManager authenticationManager,
JwtTokenUtil jwtTokenUtil) {
this.userRepository = userRepository;
this.passwordEncoder = passwordEncoder;
this.authenticationManager = authenticationManager;
this.jwtTokenUtil = jwtTokenUtil;
}

@PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
    try {
        System.out.println("Received registration request - Username: " + registerRequest.getUsername() + 
                          ", Email: " + registerRequest.getEmail());
        
        if (registerRequest.getUsername() == null || registerRequest.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }
        if (registerRequest.getPassword() == null || registerRequest.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        if (registerRequest.getEmail() == null || registerRequest.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email is already in use.");
        }
        
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("ROLE_USER");

        userRepository.save(user);
        System.out.println("User registered successfully: " + user.getUsername());
        return ResponseEntity.ok("User registered successfully.");
    } catch (Exception e) {
        System.err.println("Registration failed: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.status(500).body("Registration failed: " + e.getMessage());
    }
}

@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword())
        );
    } catch (Exception e) {
        return ResponseEntity.status(401).body("Invalid username or password.");
        }
        final String token = jwtTokenUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(new LoginResponse(token));
    }
}
