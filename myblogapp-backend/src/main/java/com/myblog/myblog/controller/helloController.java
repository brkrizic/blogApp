package com.myblog.myblog.controller;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class helloController {

    @GetMapping("/api/hello")
    public String Hello(HttpServletRequest request){
        return "Hello from Spring Boot!" + request.getSession().getId();
    }
}
