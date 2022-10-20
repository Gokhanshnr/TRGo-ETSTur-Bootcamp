package com.gokhan.trgo.props;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class JoinUserComment {

    @Id
    private Integer com_id;
    private Integer id;
    private String firstName;
    private String lastName;
    private String comment;
    private Integer rating;
    private Integer proid;
}
