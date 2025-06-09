package com.myblog.myblog.controller;

import com.myblog.myblog.dto.PostWithLikesDTO;
import com.myblog.myblog.model.Comment;
import com.myblog.myblog.model.Post;
import com.myblog.myblog.model.PostLike;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.service.CommentService;
import com.myblog.myblog.service.MyUserDetailsService;
import com.myblog.myblog.service.PostLikeService;
import com.myblog.myblog.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Fallback;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    private static final String UPLOAD_DIR = "postImages/";

    @PostMapping("/private/create")
    public ResponseEntity<Post> createPostWithImage(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setStatus(status != null ? status : "DRAFT");

        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, imageFile.getBytes());
            post.setImage("/images/" + filename); // this will match your resource handler
        }

        System.out.println("Received title: " + title);
        System.out.println("Received image file: " + (imageFile != null ? imageFile.getOriginalFilename() : "null"));


        Post savedPost = postService.savePost(post);
        System.out.println(savedPost);
        return ResponseEntity.ok(savedPost);
    }

    // Create or update a post
    @PostMapping
    public ResponseEntity<Post> createOrUpdatePost(@RequestBody Post post) {
        Post savedPost = postService.savePost(post);
        return ResponseEntity.ok(savedPost);
    }

    // Update post
    @PutMapping("/private/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post post){
        Post updatedPost = postService.updatePost(id, post);
        if (updatedPost == null) {
            return ResponseEntity.notFound().build();  // HTTP 404 with empty body
        }
        postService.savePost(updatedPost);
        return ResponseEntity.ok(updatedPost);
    }

    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostWithLikesDTO> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        int likesCount = postLikeService.getLikesByPost(id).size();
        int commentCount = commentService.getCommentsByPostId(id).size();

        PostWithLikesDTO dto = new PostWithLikesDTO(post.get(), likesCount, commentCount);

        return ResponseEntity.ok(dto);
    }

    // Get all posts
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // Get posts by user ID
    @GetMapping("/private/user/{userId}")
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
    @DeleteMapping("/private/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    //Like Post
    @PostMapping("/private/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        postLikeService.likePost(postId);
        return ResponseEntity.ok("Liked Post");
    }

    //Dislike Post
    @DeleteMapping("/private/{postId}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable Long postId){
        postLikeService.unlikePost(postId);
        return ResponseEntity.ok("Unliked Post");
    }

    // Make a comment
    @PostMapping("/private/comments/{postId}")
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

    @GetMapping("/private/postCount")
    public ResponseEntity<Long> getPostCount(){
        return ResponseEntity.ok(postService.getPostCount());
    }

    @GetMapping("/postLikes/{postId}")
    public ResponseEntity<Integer> getLikesByPost(@PathVariable Long postId){
        Integer likes = postLikeService.getLikesByPost(postId).size();
        return ResponseEntity.ok(likes);
    }

}
