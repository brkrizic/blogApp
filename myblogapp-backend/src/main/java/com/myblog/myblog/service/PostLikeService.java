package com.myblog.myblog.service;

import com.myblog.myblog.model.Post;
import com.myblog.myblog.model.PostLike;
import com.myblog.myblog.model.User;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.repo.PostLikeRepo;
import com.myblog.myblog.repo.PostRepo;
import com.myblog.myblog.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PostLikeService {

    @Autowired
    PostLikeRepo postLikeRepo;
    @Autowired
    UserRepo userRepo;
    @Autowired
    PostRepo postRepo;

    public void likePost(Long postId){
        Long userId = getCurrentUserId();
        if(postLikeRepo.existsByUserIdAndPostId(userId, postId)){
            throw new RuntimeException("Already liked");
        }

        User user = userRepo.findById(userId).orElseThrow();
        Post post = postRepo.findById(postId).orElseThrow();

        postLikeRepo.save(new PostLike(user, post));
    }

    @Transactional
    public void unlikePost(Long postId) {
        Long userId = getCurrentUserId();
        postLikeRepo.deleteByUserIdAndPostId(userId, postId);
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
        return userDetails.getId();
    }

}
