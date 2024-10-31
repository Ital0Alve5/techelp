package com.techelp.api.dto.response;

import java.util.Map;

public record ErrorResponse1(String message, int status, Map<String, String> errors) implements ApiResponse {
}
