package com.gokhan.trgo.entities;

import com.gokhan.trgo.dto.LocationDTO;
import com.gokhan.trgo.dto.UserDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.jpa.repository.Query;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class User extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "First name  can not be blank")
    @Length(message = "First name  must contain min 2 max 50 character.", min = 2, max = 50)
    private String firstName;

    @NotBlank(message = "Lastname  can not be blank")
    @Length(message = "Lastname  must contain min 2 max 50 character.", min = 2, max = 50)
    private String lastName;


    @NotBlank(message = "Email can not be blank")
    @Email(message = "Email Format Error")
    @Length(message = "Maximum 60", max = 60)
    private String email;

    @NotBlank(message = "Password can not be blank")
    @Pattern(message = "Password must contain min one upper,lower letter and 0-9 digit number ", regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,})")
    private String password;


    private boolean enabled = true;
    private boolean tokenExpired = true;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private List<Role> roles;





}
