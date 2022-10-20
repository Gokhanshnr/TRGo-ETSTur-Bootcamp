package com.gokhan.trgo.dto;

import java.util.Date;

public interface OrderDTO {

    Integer getorderid();

    Integer getid();

    Integer getroom_id();

    String getotel_name();

    String getroom_name();

    Date getstart_date();

    Date getend_Date();

    Integer getperson();

    Integer getprice();

}
