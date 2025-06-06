package com.myblog.myblog.service;

import com.myblog.myblog.model.User;
import com.myblog.myblog.model.UserPrincipal;
import com.myblog.myblog.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        // Allow login with username or email
        User user = userRepo.findByUsername(input);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username/email: " + input);
        }

        System.out.println("Authenticated user: " + user.getUsername() + ", ID: " + user.getId());
        return new UserPrincipal(user);
    }
}
