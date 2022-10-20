package com.gokhan.trgo.entities;

import lombok.Data;


import javax.persistence.*;

@Entity
@Data
public class Pictures extends Base{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer lid;

    @Lob
    private String file;
}
