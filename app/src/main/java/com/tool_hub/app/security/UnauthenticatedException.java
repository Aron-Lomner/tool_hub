package com.tool_hub.app.security;

public class UnauthenticatedException extends Exception {
    public UnauthenticatedException(String msg) {
        super(msg);
    }
}
