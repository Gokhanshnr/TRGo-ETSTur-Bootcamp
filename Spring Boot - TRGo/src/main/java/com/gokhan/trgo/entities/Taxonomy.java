package com.gokhan.trgo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Taxonomy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer taxid;


    @NotBlank(message = "Name can not be blank")
    @Length(message = "Name must contain min 2 max  20 character.", min = 2, max = 20)
    private String name;

    @NotBlank(message = "Description  name can not be blank")
    @Length(message = "Description  must contain min 2 max  200 character.", min = 2, max = 200)
    private String description;


    @ManyToMany(mappedBy = "taxonomies")
    @JsonIgnore
    List<Product> product;

}
