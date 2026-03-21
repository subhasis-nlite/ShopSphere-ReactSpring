package com.shopsphere.common.exception;

import com.shopsphere.common.dto.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(404)
                .error("NOT_FOUND")
                .message(ex.getMessage())
                .build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidation(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(e ->
                errors.put(e.getField(), e.getDefaultMessage())
        );

        return ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(400)
                .error("VALIDATION_ERROR")
                .message("Validation failed")
                .validationErrors(errors)
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiErrorResponse handleGeneric(Exception ex) {
        return ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(500)
                .error("INTERNAL_ERROR")
                .message(ex.getMessage())
                .build();
    }
}