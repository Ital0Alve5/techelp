package com.techelp.api.dto.response;

import java.util.Optional;

public record SuccessResponse<D>(int status, String message, Optional<D> data) implements ApiResponse {
}
