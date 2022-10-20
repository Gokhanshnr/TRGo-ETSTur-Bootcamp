package com.gokhan.trgo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer room_id;

    private Integer product_id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="p_id",referencedColumnName = "pid")
    private Product product;

    @NotBlank(message = "Name can not be blank")
    @Length(message = "Name must contain min 2 max  20 character.", min = 2, max = 20)
    private String name;

    @NotBlank(message = "Description can not be blank")
    @Length(message = "Description must contain min 2 max  255 character.", min = 2, max = 255)
    private String description;


    @PositiveOrZero(message = "Star ratings must be positive")
    @NotNull(message = "Bed not null")
    private Integer bed;

    @PositiveOrZero(message = "Price must be positive")
    @NotNull(message = "price not null")
    private Integer price;

    @PositiveOrZero(message = "Price must be positive")
    @NotNull(message = "price not null")
    private Integer quantity;

    @ManyToMany
    private List<Pictures> pictures;

}
