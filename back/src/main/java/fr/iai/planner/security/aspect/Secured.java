package fr.iai.planner.security.aspect;

import fr.iai.planner.security.SecurityLevel;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Secured {

    SecurityLevel value();

}
