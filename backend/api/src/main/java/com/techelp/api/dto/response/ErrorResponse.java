package com.techelp.api.dto.response;

import java.util.Map;

public record ErrorResponse(String message, int status, Map<String, String> errors) implements ApiResponse {
}
