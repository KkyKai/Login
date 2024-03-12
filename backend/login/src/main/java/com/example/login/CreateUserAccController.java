package com.example.login;

import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/createuseraccount") // This means URL's start with /useraccount (after Application path)
public class CreateUserAccController {

    @PostMapping(path = "/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<?> addNewUser(@RequestBody UserAccount user)
            throws SQLException {
        try {
            UserAccount ua = new UserAccount();
            ua.save(user);
            return ResponseEntity.ok("Account has been created successfully");
        } catch (SQLException e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Account creation failed", HttpStatus.INTERNAL_SERVER_ERROR);
            // return ResponseEntity.ok("Account creation failed");
        }
    }
}
