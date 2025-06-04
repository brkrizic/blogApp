package com.myblog.myblog.dto;

import com.myblog.myblog.model.User;

public class LoginResponse {
    private Long userId;
    private String token;

    public LoginResponse(User user, String token) {
        this.userId = user.getId();
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long id) {
        this.userId = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
