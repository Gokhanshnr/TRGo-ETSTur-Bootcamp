package com.gokhan.trgo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

import static javax.persistence.CascadeType.ALL;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class Product extends Base{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer pid;

    @NotBlank(message = "Otel name can not be blank")
    @Length(message = "Otel name must contain min 2 max 50", min = 2, max=50)
    private String otel_name;

    @OneToMany(mappedBy = "product")
    private List<Rooms> rooms;

    @Lob
    private String description;

    @ManyToOne
    @JoinColumn(name="lId",referencedColumnName = "lid")
    private Location location;


    @ManyToMany
    private List<Pictures> pictures;


    @ManyToMany
    @JoinTable(
            name = "pro_tax",
            joinColumns = @JoinColumn(
                    name = "p_id", referencedColumnName = "pid"),
            inverseJoinColumns = @JoinColumn(
                    name = "t_id", referencedColumnName = "taxid"))
    private List<Taxonomy> taxonomies;


    @PositiveOrZero(message = "Star ratings must be between 0 5")
    @NotNull(message = "Star ratings must be between 0 5")
    @Max(value = 5, message = "Star ratings must be between 0 5")
    private Integer star_ratings;

}
