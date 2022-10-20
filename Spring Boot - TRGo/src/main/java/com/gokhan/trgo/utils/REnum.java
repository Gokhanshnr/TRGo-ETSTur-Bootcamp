package com.gokhan.trgo.utils;


public enum REnum {
    STATUS, RESULT, MESSAGE, JWT, ERROR;


    @Override
    public String toString() {
        return name().toLowerCase();
    }
}