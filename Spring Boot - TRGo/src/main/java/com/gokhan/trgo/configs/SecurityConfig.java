package com.gokhan.trgo.configs;


import com.gokhan.trgo.services.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    final JwtFilter jwtFilter;
    final UserService jwtUserService;
    public SecurityConfig(JwtFilter jwtFilter, UserService jwtUserService) {
        this.jwtFilter = jwtFilter;
        this.jwtUserService = jwtUserService;
    }

    // veritabanında yönetim, kullanıcı varlık denetimi
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(jwtUserService).passwordEncoder( jwtUserService.encoder() );
    }

    // role ve yönetim
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .headers()
                .frameOptions()
                .deny()
                .and()
                .authorizeRequests()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .antMatchers(getAdminRole()).hasRole("admin")
                .antMatchers(getCustomerRole()).hasRole("customer")
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class );
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    private static final String[] AUTH_WHITELIST = {
            "/auth",
            "/register",
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };


    private String[] getCustomerRole(){
        String[] customerRole={"/comment/add","/comment/delete"};
        return customerRole;
    }
    private String[] getAdminRole(){
        String[] adminRole={"/taxonomy/add","/taxonomy/update","/taxonomy/delete",
                "/location/add","/location/update","/location/delete",
                "/image/add","/image/delete","/product/update","/comment/add","/comment/delete",
                "/product/add","/room/add","/room/delete","/admin/setting"};
        return adminRole;
    }




}