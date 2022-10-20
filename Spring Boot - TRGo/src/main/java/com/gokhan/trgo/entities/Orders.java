package com.gokhan.trgo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Date;

@Entity
@Data
public class Orders extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer orderid;

    @ManyToOne
    private Rooms room;

    @ManyToOne
    private User user;

    @DateTimeFormat(pattern="dd/MM/yyyy")
    private Date startDate;

    @DateTimeFormat(pattern="dd/MM/yyyy")
    private Date endDate;

    @Min(1)
    private Integer person;

    private Integer price;


}
