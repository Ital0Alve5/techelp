package com.techelp.api.dto.response;

public sealed interface LoginResponse permits AuthResponse, ErrorResponse {}
