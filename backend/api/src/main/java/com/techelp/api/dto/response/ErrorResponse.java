package com.techelp.api.dto.response;

public record ErrorResponse(String message, int status) implements SignUpResponse {
}