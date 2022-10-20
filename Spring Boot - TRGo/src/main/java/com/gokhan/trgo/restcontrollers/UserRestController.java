package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.User;
import com.gokhan.trgo.props.JWTLogin;
import com.gokhan.trgo.services.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserRestController {

    final UserService service;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/auth")
    public ResponseEntity auth(@RequestBody JWTLogin jwtLogin) {
        return service.auth(jwtLogin);
    }

    @PutMapping("/changepassword")
    public ResponseEntity changePassword(@RequestParam String oldPassword, @RequestParam @NotBlank(message = "password can not be blank") String newPassword){
        return  service.changePassword(oldPassword,newPassword);
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestParam  @Length(message = "firstName  must contain min 2 max  50 character.", min = 2, max = 50) String firstName, @RequestParam @Length(message = "firstName  must contain min 2 max  50 character.", min = 2, max = 50)  String lastName, @RequestParam @Email(message = "E-mail Format error") String email ){
        return service.update(firstName, lastName,email);
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        return service.list();
    }

    @GetMapping("/getuser")
    public ResponseEntity getUser(@RequestParam String username) {
        return service.getUserById(username);
    }


    @GetMapping("/total")
    public ResponseEntity total() {
        return service.getTotal();
    }

}