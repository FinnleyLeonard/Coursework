package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import java.util.ArrayList;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("beat/")

public class Beat {
    @POST
    @Path("save")
    public String saveBeat(@CookieParam("saveData") String saveData, @CookieParam("token") String currentToken) {

        System.out.println("Invoked Beat.saveBeat()");
        JSONArray response = new JSONArray();
        String[] saveArray = null;
        System.out.println(saveData);
        saveArray = saveData.split("%2C");
        System.out.println(saveArray[0]);
        String token = currentToken;
        int userID = 0;
        try {
            if (User.validToken(token) == true) {
                PreparedStatement ps1 = Main.db.prepareStatement("SELECT userID FROM Users WHERE Token = ?");
                ps1.setString(1, token);
                ResultSet userIDResults = ps1.executeQuery();
                if (userIDResults.next() == true) {
                    userID = userIDResults.getInt(1);


                    PreparedStatement ps2 = Main.db.prepareStatement("insert into Beat (userID, kickSound, kickButtons, snareSound, snareButtons, hihatSound, hihatButtons, tomSound, tomButtons, tempo, beatName)" + "values (?,?,?,?,?,?,?,?,?,?,?)");
                    ps2.setInt(1, userID);
                    ps2.setString(2, saveArray[0]);
                    ps2.setInt(3, Integer.parseInt(saveArray[1]));
                    ps2.setString(4, saveArray[2]);
                    ps2.setInt(5, Integer.parseInt(saveArray[3]));
                    ps2.setString(6, saveArray[4]);
                    ps2.setInt(7, Integer.parseInt(saveArray[5]));
                    ps2.setString(8, saveArray[6]);
                    ps2.setInt(9, Integer.parseInt(saveArray[7]));
                    ps2.setInt(10, Integer.parseInt(saveArray[8]));
                    ps2.setString(11, saveArray[9]);

                    ps2.executeUpdate();

                    JSONObject userBeatDetails = new JSONObject();
                    userBeatDetails.put("userID", userID);
                    return userBeatDetails.toString();
                } else {
                    return "{\"Error\": \"no userID?\"}";
                }
            }
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage() + "    " + exception.getCause() + User.validToken(token));

            return "{\"Error\": \"Unable to save\"}";
        } return "safe";

    }

    @GET
    @Path("get")
    public String getBeat(@CookieParam("token") String currentToken) {
        System.out.println("Invoked Beat.getBeat()");
        JSONArray response = new JSONArray();
        String token = currentToken;
        int userID = 0;
        int rowCount =0;
        ArrayList<String> rowData = new ArrayList<>();
        ArrayList<ArrayList<String>> finalData = new ArrayList<>();
        try {
            if (User.validToken(token) == true) {
                PreparedStatement ps1 = Main.db.prepareStatement("SELECT userID FROM Users WHERE Token = ?");
                ps1.setString(1, token);
                ResultSet userIDResults = ps1.executeQuery();
                if (userIDResults.next() == true) {
                    userID = userIDResults.getInt(1);
                    System.out.println(userID);


                    PreparedStatement ps2 = Main.db.prepareStatement("SELECT * FROM Beat WHERE userID = ?");
                    ps2.setInt(1, userID);
                    ResultSet beatGetResults = ps2.executeQuery();
                    while (beatGetResults.next() == true){
                        finalData.add(new ArrayList());

                        rowData.add(beatGetResults.getString("kickSound"));
                        System.out.println(beatGetResults.getString(4));
                        rowData.add(Integer.toString(beatGetResults.getInt("kickButtons")));
                        rowData.add(beatGetResults.getString("snareSound"));
                        rowData.add(Integer.toString(beatGetResults.getInt("snareButtons")));
                        rowData.add(beatGetResults.getString("hihatSound"));
                        rowData.add(Integer.toString(beatGetResults.getInt("hihatButtons")));
                        rowData.add(beatGetResults.getString("tomSound"));
                        rowData.add(Integer.toString(beatGetResults.getInt("tomButtons")));
                        rowData.add(Integer.toString(beatGetResults.getInt("tempo")));
                        rowData.add(beatGetResults.getString("beatName"));
                        System.out.println("poogaaasss");
                        finalData.get(rowCount).add(String.join(", ", rowData));
                        System.out.println(finalData.toString());
                        rowCount ++;
                        rowData.clear();

                    }

                    JSONObject userBeatDetails = new JSONObject();
                    userBeatDetails.put("finalData", finalData);
                    System.out.println(userBeatDetails);
                    userBeatDetails.toString();
                    return "{\"yuh\": \"no userID?\"}";
                }  else {
                    return "{\"Error\": \"no userID?\"}";
                }
            } else {return "{\"Error\": \"bad token\"}";}
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage() + "    " + exception.getCause() + User.validToken(token));
            return "{\"Error\": \"Unable to save\"}";
        }

    }
}
