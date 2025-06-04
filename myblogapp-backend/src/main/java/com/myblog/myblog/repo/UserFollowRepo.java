package com.myblog.myblog.repo;

import com.myblog.myblog.model.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFollowRepo extends JpaRepository<UserFollow, Long> {

    boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);

    void deleteByFollower_IdAndFollowing_Id(Long followerId, Long followingId);

    List<UserFollow> findByFollower_Id(Long followerId);

    List<UserFollow> findByFollowing_Id(Long followingId);

    long countByFollower_Id(Long followerId);

    long countByFollowing_Id(Long followingId);
}
