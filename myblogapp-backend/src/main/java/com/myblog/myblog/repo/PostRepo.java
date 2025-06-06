package com.myblog.myblog.repo;

import com.myblog.myblog.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    // Find all posts by a specific user ID
    List<Post> findByUserId(Long userId);

    // Optional: Find posts by status (e.g., "PUBLISHED", "DRAFT")
    List<Post> findByStatus(String status);

    // Optional: Search by title containing text (case-insensitive)
    List<Post> findByTitleContainingIgnoreCase(String keyword);

    // Optional: Recent posts
    List<Post> findTop10ByOrderByCreatedAtDesc();

    // CountUser
    long countByUserId(Long id);
}
