package com.techelp.api.exception;

public class InvalidTempPasswordException extends RuntimeException {
    public InvalidTempPasswordException(String message) {
        super(message);
    }
}
