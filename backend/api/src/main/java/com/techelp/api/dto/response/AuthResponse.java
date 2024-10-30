package com.techelp.api.dto.response;

public record AuthResponse(int id, String name, String token) implements SignUpResponse {
}
