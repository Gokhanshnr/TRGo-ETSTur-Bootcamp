package com.gokhan.trgo.services;


import com.gokhan.trgo.dto.TotalDTO;
import com.gokhan.trgo.dto.UserDTO;
import com.gokhan.trgo.entities.Role;
import com.gokhan.trgo.entities.Taxonomy;
import com.gokhan.trgo.entities.User;
import com.gokhan.trgo.props.JWTLogin;
import com.gokhan.trgo.repositories.UserRepository;
import com.gokhan.trgo.utils.JwtUtil;

import com.gokhan.trgo.utils.REnum;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Transactional
@Service

public class UserService implements UserDetailsService {

    final UserRepository userRepository;

    final PasswordEncoder passwordEncoder;
    final JwtUtil jwtUtil;
    final AuthenticationManager authenticationManager;
    public UserService(UserRepository userRepository,@Lazy PasswordEncoder passwordEncoder, JwtUtil jwtUtil, @Lazy AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalJWTUser = userRepository.findByEmailEqualsIgnoreCase(username);
        if (optionalJWTUser.isPresent()) {
            User u = optionalJWTUser.get();
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    u.getEmail(),
                    u.getPassword(),
                    u.isEnabled(),
                    u.isTokenExpired(),
                    true,
                    true,
                    roles(u.getRoles())
            );
            return userDetails;
        }else {
            throw new UsernameNotFoundException("Böyle bir kullanıcı yok");
        }
    }


    public Collection roles(List<Role> rolex ) {
        List<GrantedAuthority> ls = new ArrayList<>();
        for ( Role role : rolex ) {
            ls.add( new SimpleGrantedAuthority( role.getName() ));
        }
        return ls;
    }

    public ResponseEntity register(User jwtUser) {
        Optional<User> optionalJWTUser = userRepository.findByEmailEqualsIgnoreCase(jwtUser.getEmail());
        List<Role> newRoleList = new ArrayList<>();
        Role newRole = new Role();
        newRole.setId(1L);
        newRoleList.add(newRole);
        jwtUser.setRoles(newRoleList);

        Map<REnum, Object> hm = new LinkedHashMap();
        if ( !optionalJWTUser.isPresent() ) {
            jwtUser.setPassword(  encoder().encode( jwtUser.getPassword() )  );
            User user = userRepository.save(jwtUser);
            //user.setPassword("Secur0");
            hm.put(REnum.STATUS, true);
            hm.put(REnum.RESULT, user);
            return new ResponseEntity( hm , HttpStatus.OK);
        }else {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, "Bu mail daha önce kayıt edilmiş");
            hm.put(REnum.RESULT, jwtUser);
            return new ResponseEntity( hm, HttpStatus.OK );
        }
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    // aut
    // jwt almak için login işlemi yaparak bu fonksiyon tetiklenmeldir.
    public ResponseEntity auth(JWTLogin jwtLogin) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(
                    jwtLogin.getUsername(), jwtLogin.getPassword()
            ) );
            UserDetails userDetails = loadUserByUsername(jwtLogin.getUsername());
            String jwt = jwtUtil.generateToken(userDetails);
            hm.put(REnum.STATUS, true);
            hm.put( REnum.JWT, jwt );
            hm.put(REnum.RESULT, userDetails);
            return new ResponseEntity(hm, HttpStatus.OK);
        }catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put( REnum.ERROR, ex.getMessage() );
            return new ResponseEntity(hm, HttpStatus.NOT_ACCEPTABLE);
        }
    }


    public ResponseEntity changePassword(String oldPassword, String newPassword) {
        Map<REnum, Object> hm = new LinkedHashMap();
        long authUserId = userRepository.getIdByUserName(JwtUtil.getAuthUserName());
        if(authUserId != 0L) {
            Optional<User> user = userRepository.findByIdEquals(authUserId);
            if (this.passwordEncoder.matches(oldPassword, user.get().getPassword())) {
                user.get().setPassword(passwordEncoder.encode(newPassword));
                User updatedCustomer = userRepository.saveAndFlush(user.get());
                hm.put(REnum.STATUS, "true");
                return new ResponseEntity<>(hm, HttpStatus.OK);
            } else {
                hm.put(REnum.MESSAGE, "Please check again current password");
                hm.put(REnum.STATUS, "false");
                return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
            }

        }else{
            hm.put(REnum.MESSAGE, "Session customer is null");
            hm.put(REnum.STATUS, "false");
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity update( String firstName, String lastName, String email) {
        Map<REnum, Object> hm = new LinkedHashMap();
        try {
            long authUserId = userRepository.getIdByUserName(JwtUtil.getAuthUserName());
            if(authUserId != 0L) {
                Optional<User> user = userRepository.findByEmailEqualsIgnoreCase(email);
                if(user.get().getId() == authUserId){
                    user.get().setFirstName(firstName);
                    user.get().setLastName(lastName);
                    User updatedCustomer = userRepository.saveAndFlush(user.get());
                    hm.put(REnum.STATUS, true);
                    hm.put(REnum.MESSAGE, updatedCustomer);
                    return new ResponseEntity<>(hm, HttpStatus.OK);
                }else{
                    hm.put(REnum.STATUS, false);
                    hm.put(REnum.MESSAGE, "Forbidden Error");
                    return new ResponseEntity<>(hm, HttpStatus.FORBIDDEN);
                }
            }
        } catch (Exception exception) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, "Hata Oluştu");
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
    }


    public ResponseEntity list() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<UserDTO> userList = userRepository.getUserList();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, userList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity getUserById(String username) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        UserDTO userList = userRepository.getUserByUserName(username);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, userList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity getTotal() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        TotalDTO total = userRepository.getTotal();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, total);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }




}
