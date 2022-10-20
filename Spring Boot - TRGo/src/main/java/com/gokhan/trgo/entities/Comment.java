package com.gokhan.trgo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Comment extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer com_id;

    @NotNull(message = "price not null")
    private Integer proid;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name="u_id",referencedColumnName = "id")
    private User user;

    @PositiveOrZero(message = "Price must be positive")
    @NotNull(message = "price not null")
    private Integer rating;


    @NotBlank(message = "Comment name can not be blank")
    @Length(message = "Comment name must contain min 2 max 400 character.", min = 2, max = 400)
    private String comment;

}
