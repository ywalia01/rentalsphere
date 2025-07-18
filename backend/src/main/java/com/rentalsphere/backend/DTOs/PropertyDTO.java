package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
    private Long propertyId;
    private String propertyManagerName;
    private String contactEmail;
    private String phoneNumber;
    private String propertyDescription;
    private String propertyAddress;
    private String city;
    private String state;
    private String zipCode;
    private Double monthlyRent;
    @JsonFormat(pattern = "yyyy/mm/dd")
    private Date availbaleMoveInDate;
    private Integer numBathrooms;
    private Integer numBedrooms;
    private List<String> imageURLs;
}
