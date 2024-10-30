package com.techelp.api.dto.response;

import java.util.HashMap;
import java.util.Map;

public class ValidationErrorResponse {
    private String message;
    private Map<String, String> errors = new HashMap<>();

    public ValidationErrorResponse(String message) {
        this.message = message;
    }

    public void addError(String field, String error) {
        errors.put(field, error);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
