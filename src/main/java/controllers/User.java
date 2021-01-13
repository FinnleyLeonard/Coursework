package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.CookieParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.UUID;

@Path("user/")
public class User {
    // compares login details to whats stored in the database
    @POST
    @Path("login")
    public String loginUser(@FormDataParam("username") String username, @FormDataParam("password") String password) {
        System.out.println("Invoked loginUser() on path user/login");
        try {
            PreparedStatement ps1 = Main.db.prepareStatement("SELECT Password FROM Users WHERE Username = ?");
            ps1.setString(1, username); // uses username from input and compares it to database
            ResultSet loginResults = ps1.executeQuery();
            if (loginResults.next() == true) { // if it matches
                String correctPassword = loginResults.getString(1);
                if (password.equals(correctPassword)) {
                    String token = UUID.randomUUID().toString(); // generates token
                    PreparedStatement ps2 = Main.db.prepareStatement("UPDATE Users SET Token = ? WHERE Username = ?");
                    ps2.setString(1, token);
                    ps2.setString(2, username);
                    ps2.executeUpdate(); // adds new token to database
                    JSONObject userDetails = new JSONObject();
                    userDetails.put("username", username);
                    userDetails.put("token", token); // sends back username and token
                    return userDetails.toString();
                } else {
                    return "{\"Error\": \"Incorrect password!\"}";
                }
            } else {
                return "{\"Error\": \"Username and password are incorrect.\"}";
            }
        } catch (Exception exception) {
            System.out.println("Database error during /user/login: " + exception.getMessage());
            return "{\"Error\": \"Server side error!\"}";
        }
    }

    @POST // allows user to register for an account
    @Path("register")
    public String registerUser(@FormDataParam("username") String username, @FormDataParam("password") String password) {
        System.out.println("Invoked registerUser() on path user/register");
        String token = UUID.randomUUID().toString(); // generates a token for the new user

        try {
            PreparedStatement ps1 = Main.db.prepareStatement ("SELECT Username FROM Users WHERE Username = ?");
            ps1.setString(1, username); // checks if username doesnt already exist
            ResultSet regResults = ps1.executeQuery();
            if (regResults.next() == false){

                PreparedStatement ps2 = Main.db.prepareStatement("insert into users (Username, Password, Token)" + "values (?,?,?)");
                ps2.setString(1, username);
                ps2.setString(2, password);
                ps2.setString(3, token);
                ps2.executeUpdate(); // adds new details to database

                JSONObject userRegDetails = new JSONObject();
                userRegDetails.put("username", username);
                userRegDetails.put("token", token);
                return userRegDetails.toString(); //returns new details to frontside
            } else { return "{\"Error\": \"Username already used\"}";}
        } catch (Exception exception) {
            System.out.println("Database error during /user/login: " + exception.getMessage());
            return "{\"Error\": \"Server side error!\"}";
        }
    }


    public static boolean validToken(String token) {        // this method MUST be called before any data is returned to the browser
        // token is taken from the Cookie sent back automatically with every HTTP request
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT UserID FROM Users WHERE Token = ?");
            ps.setString(1, token);
            ResultSet logoutResults = ps.executeQuery();
            return logoutResults.next();   //logoutResults.next() will be true if there is a record in the ResultSet
        } catch (Exception exception) {
            System.out.println("Database error" + exception.getMessage());
            return false;
        }
    }
}
