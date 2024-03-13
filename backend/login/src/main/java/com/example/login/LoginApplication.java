package com.example.login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// Allow all /demo requests if origin is http://localhost:5173
				registry.addMapping("/**").allowedOrigins("http://127.0.0.1:3000", "http://localhost:3000/")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}

}
