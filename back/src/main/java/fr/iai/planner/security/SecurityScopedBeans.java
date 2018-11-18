package fr.iai.planner.security;

import fr.iai.planner.beans.SecurityUser;
import fr.iai.planner.dao.SecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Configuration
public class SecurityScopedBeans {

    private final DiscordApiService discordApiService;
    private final SecurityRepository securityRepository;

    @Autowired
    public SecurityScopedBeans(DiscordApiService discordApiService, SecurityRepository securityRepository) {
        this.discordApiService = discordApiService;
        this.securityRepository = securityRepository;
    }

    @Bean
    @Scope(scopeName = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
    public DiscordUser discordUser(HttpServletRequest request) {
        if (request == null) return new DiscordUser();
        return discordApiService.getDiscordFromToken(request.getHeader("Authorization")).orElse(new DiscordUser());
    }

    @Bean
    @Scope(scopeName = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
    public SecurityUser securityUser(DiscordUser discordUser) {
        if (discordUser == null || discordUser.getId() == null) return new SecurityUser();
        return Optional.ofNullable(securityRepository.findBySecurityId(discordUser.getId())).orElse(new SecurityUser(discordUser.getId()));
    }


}
