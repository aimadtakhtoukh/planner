package fr.iai.planner.controller;

import fr.iai.planner.beans.SecurityUser;
import fr.iai.planner.beans.User;
import fr.iai.planner.dao.SecurityRepository;
import fr.iai.planner.dao.UserRepository;
import fr.iai.planner.security.DiscordUser;
import fr.iai.planner.security.SecurityLevel;
import fr.iai.planner.security.aspect.Secured;
import fr.iai.planner.security.exception.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/")
public class UserController {

    private final UserRepository userRepository;
    private final SecurityUser securityUser;
    private final DiscordUser discordUser;
    private final SecurityRepository securityRepository;
    @Value("${SECURITY_ENABLED}")
    private boolean securityEnabled;

    @Autowired
    public UserController(UserRepository userRepository, SecurityUser securityUser, DiscordUser discordUser,
                          SecurityRepository securityRepository) {
        this.userRepository = userRepository;
        this.securityUser = securityUser;
        this.discordUser = discordUser;
        this.securityRepository = securityRepository;
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("all")
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/@me")
    public User getConnectedUser() {
        return securityUser.getUser();
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("id/{id}")
    public User id(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() ->
                new NotExistingUserException("id " + id + " n'existe pas."));
    }

    @Secured(SecurityLevel.ANY_USER)
    @GetMapping("name/{name}")
    public User name(@PathVariable String name) {
        User response = userRepository.findByName(name);
        if (response == null) {
            throw new NotExistingUserException(name + " n'existe pas.");
        }
        return response;
    }

    @Secured(SecurityLevel.ANY_TOKEN)
    @PostMapping("add")
    public void create(@RequestBody User user) {
        // TODO Transaction pour ne pas sauver le user en cas d'erreur
        if (securityEnabled) {
            if (discordUser == null  || discordUser.getId() == null) {
                throw new AlreadyExistingUserException("Compte Discord inexistant.");
            }
            if (securityUser != null && securityUser.getUser() != null) {
                throw new AlreadyExistingUserException("Compte déjà créé");
            }
        }
        User existing = userRepository.findByName(user.getName());
        if (existing != null) {
            throw new AlreadyExistingUserException(user.getName() + " existe déjà.");
        }
        userRepository.save(user);
        securityRepository.save(
                new SecurityUser(
                        userRepository.findByName(user.getName()).getId(),
                        "DISCORD",
                        discordUser.getId()
                )
        );
    }

    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> exception(IllegalStateException t) {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 500);
        result.put("message", t.getMessage());
        return result;
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, Object> forbidden(ForbiddenException t) {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 403);
        result.put("message", t.getMessage());
        return result;
    }

    public class AlreadyExistingUserException extends IllegalStateException {
        AlreadyExistingUserException(String s) {
            super(s);
        }
    }

    public class NotExistingUserException extends IllegalStateException {
        NotExistingUserException(String s) { super(s); }
    }
}
