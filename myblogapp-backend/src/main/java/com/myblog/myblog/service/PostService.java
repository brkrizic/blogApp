package com.myblog.myblog.service;


import com.myblog.myblog.model.Post;
import com.myblog.myblog.model.User;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.repo.PostRepo;
import com.myblog.myblog.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        UserPrincipal user = (UserPrincipal) authentication.getPrincipal();
        return user.getId();
    }

    // Create or update a post
    public Post savePost(Post post) {
        Long userId = getCurrentUserId();

        User user = userRepo.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User Not Found"));

        post.setUser(user);

        user.getPosts().add(post);

        userRepo.save(user);

        return post;
    }

    // Get a post by ID
    public Optional<Post> getPostById(Long id) {
        return postRepo.findById(id);
    }

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    // Get posts by user ID
    public List<Post> getPostsByUserId(Long userId) {
        return postRepo.findByUserId(userId);
    }

    // Get posts by status
    public List<Post> getPostsByStatus(String status) {
        return postRepo.findByStatus(status);
    }

    // Search posts by keyword in title
    public List<Post> searchPostsByTitle(String keyword) {
        return postRepo.findByTitleContainingIgnoreCase(keyword);
    }

    // Get recent 10 posts
    public List<Post> getRecentPosts() {
        return postRepo.findTop10ByOrderByCreatedAtDesc();
    }

    // Delete a post by ID
    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }
}
