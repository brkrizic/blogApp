package com.myblog.myblog.controller;

import com.myblog.myblog.model.Student;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentController {

    private List<Student> students = new ArrayList<>(List.of(
            new Student(1, "Bruno", 50),
            new Student(2, "Makro", 34)
    ));

    @GetMapping("/api/student")
    public List<Student> getStudents(){
        return students;
    };

    @GetMapping("/csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @PostMapping("/api/student")
    public Student addStudent(@RequestBody Student student){
        students.add(student);
        return student;
    }
}
