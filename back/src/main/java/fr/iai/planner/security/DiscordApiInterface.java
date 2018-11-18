package fr.iai.planner.security;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface DiscordApiInterface {

    @GET("users/@me")
    Call<DiscordUser> getUserInfo(@Header("Authorization") String authorization);

}
