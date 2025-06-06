package com.myblog.myblog.controller;


import com.myblog.myblog.dto.LoginRequest;
import com.myblog.myblog.model.User;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.service.FollowService;
import com.myblog.myblog.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private AuthenticationManager authManager;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            System.out.println("authentication: " + authentication);
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);


            request.getSession(true)
                    .setAttribute("SPRING_SECURITY_CONTEXT", securityContext);

            UserPrincipal user = (UserPrincipal) authentication.getPrincipal();

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "message", "Login Successful"
            ));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/private/getUser")
    public ResponseEntity<User> getUser(@RequestParam String username){
        User user = userService.findUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/private/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }

    //Follow the user
    @PostMapping("/{userId}/follow")
    public ResponseEntity<?> follow(@PathVariable Long userId){
        followService.followUser(userId);
        return ResponseEntity.ok("Now following user " + userId);
    }

    //Unfollow the user
    @DeleteMapping("/{userId}/unfollow")
    public ResponseEntity<?> unfollow(@PathVariable Long userId){
        followService.unfollowUser(userId);
        return ResponseEntity.ok("Unfollowed user " + userId);
    }
}
