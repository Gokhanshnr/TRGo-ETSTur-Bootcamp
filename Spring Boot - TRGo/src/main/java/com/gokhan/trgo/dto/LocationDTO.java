package com.gokhan.trgo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface LocationDTO {
    Integer getLid();
    String getCity();
    String getDistrict();
    Integer getCount();
}

