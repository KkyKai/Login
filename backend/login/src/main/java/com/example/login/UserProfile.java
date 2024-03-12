package com.example.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import com.example.login.SQLConnection;

public class UserProfile {
    // Checks if table has been created
    private Integer id = -1;
    private String profileName = "";
    private String permission = "";

    public UserProfile() {
        id = -1;
        profileName = "";
        permission = "";
    }

    // To accept existing profile ids
    public UserProfile(Integer id) {
        this.id = id;
    }

    // For updating userProfile names, only id and profileName are required
    public UserProfile(Integer id, String profileName) {
        this.id = id;
        this.profileName = profileName;
    }

    public UserProfile(String profileName, String permission) {
        this.profileName = profileName;
        this.permission = permission;
    }

    // To map the results from the database
    public UserProfile(Integer id, String profileName, String permission) {
        this.id = id;
        this.profileName = profileName;
        this.permission = permission;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProfileName() {
        return profileName;
    }

    public void setProfileName(String profileName) {
        this.profileName = profileName;
    }

    public String getPermission() {
        return permission;
    }

    public String save(UserProfile userProfile) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "INSERT INTO UserProfiles (profileName, permission) VALUES (?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, userProfile.profileName);
            statement.setString(2, userProfile.permission);
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
    public UserProfile get(Integer id) throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, id);
            statement.setMaxRows(1);
            ResultSet resultSet = statement.executeQuery();
            if (!resultSet.next()) {
                return null;
            }
            String profileName = resultSet.getString("profileName");
            String permission = resultSet.getString("permission");
            UserProfile result = new UserProfile(id, profileName, permission);
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

    public Boolean update(UserProfile userProfile)
            throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "UPDATE UserProfiles SET profileName= ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, userProfile.profileName);
            statement.setInt(2, userProfile.id);
            statement.executeUpdate();
            return true;
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }

    public ArrayList<UserProfile> listAll() throws SQLException {
        Connection connection = null;
        try {
            SQLConnection sqlConnection = new SQLConnection();
            connection = sqlConnection.getConnection();
            String query = "SELECT * FROM UserProfiles";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            ArrayList<UserProfile> results = new ArrayList<>();
            while (resultSet.next()) {
                // Get the data from the current row
                Integer id = resultSet.getInt("id");
                String profileName = resultSet.getString("profileName");
                String permission = resultSet.getString("permission");
                // Convert the data into an object that can be sent back to boundary
                UserProfile result = new UserProfile(id, profileName, permission);
                results.add(result);
            }
            return results;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            if (connection != null) {
                connection.close();
            }
        }
    }
}