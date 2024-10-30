package com.techelp.api.service;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class NewPasswordService {

    public static String generateNewRandomPassword(){
        Random random = new Random();
        int randomNumber = random.nextInt(10000);
        return String.format("%04d", randomNumber);
    }
}
