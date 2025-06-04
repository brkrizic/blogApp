package com.myblog.myblog.service;

import com.myblog.myblog.model.User;
import com.myblog.myblog.model.UserFollow;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.repo.UserFollowRepo;
import com.myblog.myblog.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class FollowService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserFollowRepo userFollowRepo;

    @Transactional
    public void followUser(Long targetUserId) {
        Long currentUserId = getCurrentUserId();

        if (userFollowRepo.existsByFollower_IdAndFollowing_Id(currentUserId, targetUserId)) {
            throw new RuntimeException("Already following");
        }

        User currentUser = userRepo.findById(currentUserId).orElseThrow();
        User targetUser = userRepo.findById(targetUserId).orElseThrow();

        UserFollow follow = new UserFollow();
        follow.setFollower(currentUser);
        follow.setFollowing(targetUser);

        userFollowRepo.save(follow);
    }

    @Transactional
    public void unfollowUser(Long targetUserId) {
        Long currentUserId = getCurrentUserId();
        userFollowRepo.deleteByFollower_IdAndFollowing_Id(currentUserId, targetUserId);
    }


    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userDetails = (UserPrincipal) auth.getPrincipal();
        return userDetails.getId();
    }
}
