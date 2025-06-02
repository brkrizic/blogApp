package com.myblog.myblog;

import com.myblog.myblog.model.User;
import com.myblog.myblog.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MyblogBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyblogBackendApplication.class, args);
	}
}
