package fr.iai.planner.config;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import fr.iai.planner.security.DiscordApiInterface;
import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

@Configuration
public class RetrofitConfig {

    @Bean
    public DiscordApiInterface retrofitHttpClient() {
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        Gson gson = new GsonBuilder()
                .setLenient()
                .create();
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://discordapp.com/api/")
                .addConverterFactory(GsonConverterFactory.create(gson))
                .client(httpClient.build())
                .build();
        return retrofit.create(DiscordApiInterface.class);
    }

}
