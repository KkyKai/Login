package com.example.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping(path = "/logout") // This means URL's start with /useraccount (after Application path)
public class LogoutController {
    @PostMapping
    public ResponseEntity<String> logout(HttpSession session) {
        // Get the current session and invalidate it
        if (session != null) {
            session.invalidate();
        }
        // Redirect the user to the login page
        return new ResponseEntity<String>("Logout successful", HttpStatus.OK);
    }
}