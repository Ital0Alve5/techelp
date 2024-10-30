package com.techelp.api.dto.response;

import java.util.Map;

public record ErrorResponse(String message, int status, Map<String, String> errors) implements SignUpResponse {

    public ErrorResponse(String message, int status) {
        this(message, status, null);
    }

    public ErrorResponse(String message, int status, Map<String, String> errors) {
        this.message = message;
        this.status = status;
        this.errors = errors;
    }
}