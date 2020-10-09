/*
package controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
@Path("premadebeats/")
@Consumes(MediaType.MULTIPART_FORM_DATA)
@Produces(MediaType.APPLICATION_JSON)

public class PremadeBeats {
    @GET
    @Path("list")
    public String beatList() {
        System.out.println("Invoked premadebeats.premadebeatsList()");
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT * FROM PremadeBeatsORDER BY CONVERT(datetime, BeatDate, 103) ASC");
            ResultSet results = ps.executeQuery();
            while (results.next() == true) {
                JSONObject row = new JSONObject();
                row.put("beatID", results.getInt(1));
                row.put("BeatDate", results.getDate(2));
                response.add(row);
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

}
*/