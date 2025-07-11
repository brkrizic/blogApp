package com.myblog.myblog.repo;

import com.myblog.myblog.model.Comment;
import com.myblog.myblog.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {

    List<Comment> findByPostId(Long postId);
    List<Comment> findByUserId(Long userId);
}
