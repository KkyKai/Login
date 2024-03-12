package com.example.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import com.example.login.SQLConnection;
import com.example.login.UserProfile;

@Service
public class UserAccount {
    // Checks if table has been created
    private Integer id = -1;
    private String email = "";
    private String password = "";
    // Foreign Key to UserProfile table
    private UserProfile profile = null;

    public UserAccount() {
        email = "";
        password = "";
        profile = null;
    }

    public UserAccount(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // To map the results from the database
    public UserAccount(Integer id, String email, String password, UserProfile profile) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
    }

    // To hold login details
    public UserAccount(String email, String password, UserProfile profile) throws SQLException {
        this.email = email;
        this.password = password;
        this.profile = profile;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserProfile getProfile() {
        return profile;
    }

    public void setProfile(UserProfile profile) {
        this.profile = profile;
    }

    public String save(UserAccount user) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO UserAccounts (email, password, profileId) VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setString(2, user.password);
            statement.setInt(3, user.profile.getId());
            statement.executeUpdate();
            return "Success";
        } catch (SQLException e) {
            System.out.println(e);
            return "Failure";
        } finally {
            // Close SQL connection when not in use
            if (connection != null) {
                connection.close();
            }
        }
    }

    // Read One
    public UserAccount get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT *,"
                    + " ua.id AS ua_id, up.id AS up_id,"
                    + " ua.email as email,"
                    + " ua.password AS password,"
                    + " up.permission AS permission, up.profileName AS profileName,"
                    + " FROM UserAccounts ua"
                    + " INNER JOIN UserProfiles up"
                    + " ON ua.profileId = up.id"
                    + " WHERE ua.id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");
            Integer profileId = resultSet.getInt("profileId");
            String permission = resultSet.getString("permission");
            String profileName = resultSet.getString("profileName");
            UserProfile userProfile = new UserProfile(profileId, profileName, permission);
            UserAccount result = new UserAccount(id, email, password, userProfile);
            return result;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    // Read One
    public String login(UserAccount user) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT *,"
            + " ua.id AS ua_id, up.id AS up_id,"
            + " ua.email as email,"
            + " ua.password AS password,"
            + " up.permission AS permission, up.profileName AS profileName"
            + " FROM UserAccounts ua"
            + " INNER JOIN UserProfiles up"
            + " ON ua.profileId = up.id"
            + " WHERE ua.email = ? AND up.id = ?";
    
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.email);
            statement.setInt(2, user.profile.getId());
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return "User/Profile is invalid";
            }
            Integer accountId = resultSet.getInt("ua_id");
            String email = resultSet.getString("email");
            String password = resultSet.getString("password");
            Integer profileId = resultSet.getInt("profileId");
            String permission = resultSet.getString("permission");
            String profileName = resultSet.getString("profileName");
            if (!user.password.equals(password)) {
                return "Incorrect Password";
            }
            JwtBuilder builder = Jwts.builder();
            builder.claim("role", permission)
                    .claim("profileName", profileName)
                    .claim("id", accountId);
            builder.setIssuer("login")
                    .setSubject(email);
            String secretKey = "kyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy";
            builder.signWith(Keys.hmacShaKeyFor(secretKey.getBytes()));
            String jwt = builder.compact();
            return jwt;
        } catch (SQLException e) {
            System.out.println(e);
            return "Error";
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
}