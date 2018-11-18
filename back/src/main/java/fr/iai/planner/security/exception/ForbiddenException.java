package fr.iai.planner.security.exception;

public class ForbiddenException extends Exception {

    public ForbiddenException(String message) {
        super(message);
    }

    public ForbiddenException(String message, Throwable t) {
        super(message, t);
    }
}
