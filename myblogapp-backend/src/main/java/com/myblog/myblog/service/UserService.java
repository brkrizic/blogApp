package com.myblog.myblog.service;


import com.myblog.myblog.model.User;
import com.myblog.myblog.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public User findUserByUsername(String username){
        return repo.findByUsername(username);
    }

    public User findUserById(Long id){
        User user = repo.findById(id).orElseThrow(null);
        return user;
    }

    public void deleteUser(Long id){
        repo.deleteById(id);
    }
}
