package com.myblog.myblog.controller;

import com.myblog.myblog.model.Comment;
import com.myblog.myblog.model.Post;
import com.myblog.myblog.service.CommentService;
import com.myblog.myblog.service.PostLikeService;
import com.myblog.myblog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private PostLikeService postLikeService;
    @Autowired
    private CommentService commentService;

    // Create or update a post
    @PostMapping
    public ResponseEntity<Post> createOrUpdatePost(@RequestBody Post post) {
        Post savedPost = postService.savePost(post);
        return ResponseEntity.ok(savedPost);
    }

    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Get posts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getPostsByUserId(userId));
    }

    // Get posts by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Post>> getPostsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(postService.getPostsByStatus(status));
    }

    // Search posts by title keyword
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPostsByTitle(@RequestParam String keyword) {
        return ResponseEntity.ok(postService.searchPostsByTitle(keyword));
    }

    // Get 10 most recent posts
    @GetMapping("/recent")
    public ResponseEntity<List<Post>> getRecentPosts() {
        return ResponseEntity.ok(postService.getRecentPosts());
    }

    // Delete post by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    //Like Post
    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        postLikeService.likePost(postId);
        return ResponseEntity.ok("Liked Post");
    }

    //Dislike Post
    @DeleteMapping("/{postId}/like")
    public ResponseEntity<?> unlikePost(@PathVariable Long postId){
        postLikeService.unlikePost(postId);
        return ResponseEntity.ok("Unliked Post");
    }

    // Make a comment
    @PostMapping("/comments/{postId}")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId,
                                              @RequestBody Map<String, String> body) {
        String content = body.get("content");
        Comment comment = commentService.addComment(postId, content);
        return ResponseEntity.ok(comment);
    }

    //Get comments of The Post
    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<Comment>> getCommentsForPost(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

}
