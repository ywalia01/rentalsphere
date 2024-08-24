package com.rentalsphere.backend.Property.Service;

import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.RentedStatus;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Mappers.LeaseMapper;
import com.rentalsphere.backend.Mappers.PropertyMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.PropertyImages.Repository.PropertyImagesRepository;
import com.rentalsphere.backend.RequestResponse.Property.GetAllPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.GetPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterResponse;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Services.Cloudinary.CloudinaryService;
import com.rentalsphere.backend.Services.Cloudinary.IService.ICloudinaryService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PropertyServiceTest {
    @InjectMocks
    private PropertyService propertyService;
    @Mock
    private PropertyRepository propertyRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private Property property;
    @Mock
    private User user;
    @Mock
    private CloudinaryService cloudinaryService;
    @Mock
    private PropertyImagesRepository propertyImagesRepository;
    @Mock
    private MockMultipartFile multipartFile;
    @Mock
    private PropertyDTO propertyDTO;

    private PropertyDTO dummyProperty;
    private PropertyRegisterRequest request;

    @BeforeEach
    void init(){
        Role role = new Role(UUID.randomUUID(), Roles.USER, List.of(user));
        user.setRoles(List.of(role));
        this.dummyProperty = new PropertyDTO();
        dummyProperty.setPropertyId(123L);
        dummyProperty.setPropertyManagerName("John Doe");
        dummyProperty.setContactEmail("john.doe@example.com");
        dummyProperty.setPhoneNumber("123-456-7890");
        dummyProperty.setPropertyDescription("Spacious apartment with great views");
        dummyProperty.setPropertyAddress("123 Main St");
        dummyProperty.setCity("Exampleville");
        dummyProperty.setState("XY");
        dummyProperty.setZipCode("12345");
        dummyProperty.setMonthlyRent(1500.0);
        dummyProperty.setAvailableMoveInDate(new Date()); // Current date
        dummyProperty.setNumBathrooms(2);
        dummyProperty.setNumBedrooms(3);
        List<String> imageURLs = new ArrayList<>();
        imageURLs.add("https://example.com/image1.jpg");
        imageURLs.add("https://example.com/image2.jpg");
        dummyProperty.setImageURLs(imageURLs);

        request = PropertyRegisterRequest.builder()
                .email("example@example.com")
                .phoneNumber("1234567890")
                .propertyAddress("123 Example St")
                .city("Example City")
                .state("Example State")
                .zipCode("12345")
                .monthlyRent(1500.0)
                .availableMoveInDate("2024-04-01")
                .numBedrooms(2)
                .numBathrooms(2)
                .licenseNumber("ABC123")
                .images(List.of(multipartFile))
                .propertyDescription("This is an example property description.")
                .build();
    }

    @Test
    void testGetAllPropertyApplications(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();

        GetAllPropertyResponse response;

        when(propertyRepository.findAllByApplicationStatusAndRentedStatus(any(ApplicationStatus.class), any(RentedStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesDTO(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyApplications();
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyForManager(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();

        GetAllPropertyResponse response;

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(propertyRepository.findAllByPropertyManagerAndApplicationStatus(any(User.class), any(ApplicationStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesDTO(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyForManager("test@gmail.com", ApplicationStatus.PENDING.name());
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyForManagerNotFoundException(){
        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
           propertyService.getAllPropertyForManager("test@gmail.com", ApplicationStatus.PENDING.name());
        });
    }

    @Test
    void testGetAllPropertyWithTenant(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();
        GetAllPropertyResponse response;

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(propertyRepository.findAllByPropertyManagerAndRentedStatus(any(User.class), any(RentedStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesWithTenant(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyWithTenant("test@gmail.com");
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyWithTenantNotFoundException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
           propertyService.getAllPropertyWithTenant("test@gmail.com");
        });
    }

    @Test
    void testSavePropertyApplication() throws IOException, ParseException {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(propertyRepository.save(any(Property.class))).thenReturn(property);
        when(cloudinaryService.upload(any(MultipartFile.class))).thenReturn(new HashMap<>());
        when(propertyImagesRepository.saveAll(anyList())).thenReturn(new ArrayList<>());

        PropertyRegisterResponse response = propertyService.savePropertyApplication(request);

        assertTrue(response.isSuccess());
    }

    @Test
    void testSavePropertyApplicationNotFound(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
            propertyService.savePropertyApplication(request);
        });
    }

    @Test
    void testGetProperty(){
        GetPropertyResponse expectedResponse = GetPropertyResponse.builder()
                .isSuccess(true)
                .property(propertyDTO)
                .timeStamp(new Date())
                .build();

        GetPropertyResponse response;

        when(propertyRepository.findById(anyLong())).thenReturn(Optional.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertyDTO(any(Property.class))).thenReturn(propertyDTO);
            response = propertyService.getProperty(1L);
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetPropertyNotFound(){
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(PropertyNotFoundException.class, ()->{
            propertyService.getProperty(1L);
        });
    }
}
