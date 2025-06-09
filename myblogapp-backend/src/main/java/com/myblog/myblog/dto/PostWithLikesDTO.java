package com.myblog.myblog.dto;

import com.myblog.myblog.model.Post;

public class PostWithLikesDTO {
    private Post post;
    private int likes;
    private int comments;

    public PostWithLikesDTO(Post post, int likes, int comments) {
        this.post = post;
        this.likes = likes;
        this.comments = comments;
    }

    // getters and setters
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }
}
