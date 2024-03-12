package com.example.login;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class SQLConnection {
    private static Boolean tablesCreated = false;
    private Connection con;

    public SQLConnection() throws SQLException {
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/login", "root",
                            "kaiyang123");
            if (!tablesCreated) {
                    createTablesIfNotExists();
            }
    }

    public void createTablesIfNotExists() throws SQLException {
            String profileQuery = "CREATE TABLE IF NOT EXISTS UserProfiles ("
                            + "id INT AUTO_INCREMENT PRIMARY KEY,"
                            + "profileName VARCHAR(255),"
                            + "permission VARCHAR(255)"
                            + ")";

            String accountQuery = "CREATE TABLE IF NOT EXISTS UserAccounts ("
                            + "id INT AUTO_INCREMENT PRIMARY KEY,"
                            + "email VARCHAR(255),"
                            + "password VARCHAR(255),"
                            + "profileId INT,"
                            + "CONSTRAINT FK_accountProfile FOREIGN KEY (profileId)"
                            + "REFERENCES UserProfiles(id)"
                            + ")";

            PreparedStatement profileStatement = con.prepareStatement(profileQuery);
            profileStatement.executeUpdate();

            PreparedStatement accountStatement = con.prepareStatement(accountQuery);
            accountStatement.executeUpdate();

            tablesCreated = true;
            System.out.println("tables created");
    };

    public Connection getConnection() {
            return con;
    }
}
