package fr.iai.planner.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class DiscordApiService {

    private final DiscordApiInterface discordClient;

    @Autowired
    public DiscordApiService(DiscordApiInterface discordClient) {
        this.discordClient = discordClient;
    }

    public Optional<DiscordUser> getDiscordFromToken(String token) {
        try {
            return Optional.ofNullable(discordClient.getUserInfo(token).execute().body());
        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

}
