package com.myblog.myblog.service;

import com.myblog.myblog.model.*;
import com.myblog.myblog.repo.CommentRepo;
import com.myblog.myblog.repo.PostRepo;
import com.myblog.myblog.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private PostRepo postRepo;
    @Autowired
    private UserRepo userRepo;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        return userDetails.getId();
    }

    public Comment addComment(Long postId, String content) {
        Long userId = getCurrentUserId();

        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepo.findById(userId).orElseThrow();

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setPost(post);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepo.save(comment);
    }
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepo.findByPostId(postId);
    }

}
