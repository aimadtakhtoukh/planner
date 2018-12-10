package fr.iai.planner.security.aspect;

import fr.iai.planner.beans.SecurityUser;
import fr.iai.planner.security.DiscordUser;
import fr.iai.planner.security.SecurityLevel;
import fr.iai.planner.security.exception.ForbiddenException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
@ConditionalOnProperty(name = "server.ssl.enabled", havingValue = "true")
public class SecurityAspect {

    private final HttpServletRequest request;
    private final DiscordUser discordUser;
    private final SecurityUser securityUser;

    @Autowired
    public SecurityAspect(HttpServletRequest request,
                          DiscordUser discordUser,
                          SecurityUser securityUser) {
        this.request = request;
        this.discordUser = discordUser;
        this.securityUser = securityUser;
    }

    @Before("@annotation(Secured) && execution(* *(..))")
    private void throwExceptionIfUnauthorized(JoinPoint joinPoint) throws Throwable {
        if (request != null) {
            SecurityLevel securityLevel = ((MethodSignature) joinPoint.getSignature()).getMethod().getAnnotation(Secured.class).value();
            if (!securityLevel.isAllowed(discordUser, securityUser)) {
                throw new ForbiddenException("Not Allowed at level " + securityLevel);
            }
        }
    }
}
