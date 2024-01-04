package com.tool_hub.app.exceptions;

public class EmailExistsException extends Exception {
    public EmailExistsException(String msg) {
        super(msg);
    }
}
