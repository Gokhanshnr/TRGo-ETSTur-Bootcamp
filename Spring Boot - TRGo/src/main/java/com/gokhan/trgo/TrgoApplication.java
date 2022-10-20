package com.gokhan.trgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TrgoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrgoApplication.class, args);
    }

}
