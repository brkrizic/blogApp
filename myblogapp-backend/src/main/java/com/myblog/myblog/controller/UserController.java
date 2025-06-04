package com.myblog.myblog.controller;


import com.myblog.myblog.model.User;
import com.myblog.myblog.service.FollowService;
import com.myblog.myblog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        return userService.verify(user);
    }

    @DeleteMapping("/{id}")
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
