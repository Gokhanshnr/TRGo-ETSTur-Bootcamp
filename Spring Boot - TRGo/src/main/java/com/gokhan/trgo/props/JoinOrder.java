package com.gokhan.trgo.props;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
public class JoinOrder {
    @Id
    private Integer orderid;

    private Integer id;

    private Integer room_id;

    private String otel_name;

    private String room_name;

    private Date start_date;

    private Date end_Date;

    private Integer person;

    private Integer price;

}
