package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.PropertiesDTO;
import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Property.Model.Property;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyMapper {
    public static List<PropertiesDTO> convertToPropertiesDTO(List<Property> properties) {
        List<PropertiesDTO> propertiesDTOs = new ArrayList<>();
        properties.forEach(property -> {
            propertiesDTOs.add(
                    new PropertiesDTO(
                            property.getPropertyApplicationID(),
                            property.getEmailAddress(),
                            property.getPropertyDescription(),
                            property.getPhoneNumber(),
                            property.getMonthlyRent(),
                            property.getNumBedrooms(),
                            property.getNumBedrooms(),
                            property.getPropertyImages().get(0).getImageUrl()
                    ));
        });
        return propertiesDTOs;
    }

    public static PropertyDTO convertToPropertyDTO(Property property) {
        return new PropertyDTO(
                property.getPropertyApplicationID(),
                property.getPropertyManager().getFirstName() + " " + property.getPropertyManager().getLastName(),
                property.getEmailAddress(),
                property.getPhoneNumber(),
                property.getPropertyDescription(),
                property.getPropertyAddress(),
                property.getCity(),
                property.getState(),
                property.getZipCode(),
                property.getMonthlyRent(),
                property.getAvailableMoveInDate(),
                property.getNumBathrooms(),
                property.getNumBedrooms(),
                property.getPropertyImages().stream().map(image -> image.getImageUrl()).collect(Collectors.toList())
        );
    }
}
