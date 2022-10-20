package com.gokhan.trgo.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Data
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer lid;

    @NotBlank(message = "City name can not be blank")
    @Length(message = "City name must contain min 2 max  20 character.", min = 2, max = 20)
    private String city;

    @NotBlank(message = "District name can not be blank")
    @Length(message = "District name must contain min 2 max  20 character.", min = 2, max = 20)
    private String district;


}
