package com.rentalsphere.backend.Tenant.Service;

import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import com.rentalsphere.backend.Tenant.Service.IService.ITenantService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TenantService implements ITenantService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private  PropertyRepository propertyRepository;


    @Override
    public TenantResponse saveTenantApplication(TenantRegisterRequest tenantRequest) {

        Optional<User> user = userRepository.findByEmail(tenantRequest.getEmailAddress());
        Optional<Property> property = propertyRepository.findById(tenantRequest.getPropertyApplicationID());

        if(user.isEmpty()){
            throw new UserNotFoundException("User does not exists.");
        }

        // Assuming there is a mapper method to convert TenantRegisterRequest to Tenant entity
        Tenant tenant = Tenant.builder()
                .emailAddress(tenantRequest.getEmailAddress())
                .phoneNumber(tenantRequest.getPhoneNumber())
                .dateOfBirth(tenantRequest.getDateOfBirth())
                .socialSecurityNumber(tenantRequest.getSocialSecurityNumber())
                .streetAddress(tenantRequest.getStreetAddress())
                .user(user.get())
                .property(property.get())
//                .city(tenantRequest.getCity())
//                .state(tenantRequest.getState())
//                .zipCode(tenantRequest.getZipCode())
             //   .propertyListingID(tenantRequest.getPropertyListingID())
                .desiredMoveInDate(tenantRequest.getDesiredMoveInDate())
                .leaseTermMonths(tenantRequest.getLeaseTermMonths())
//                .monthlyBudget(tenantRequest.getMonthlyBudget())
                .numOccupants(tenantRequest.getNumOccupants())
                .currentEmployer(tenantRequest.getCurrentEmployer())
//                .positionTitle(tenantRequest.getPositionTitle())
//                .monthlyIncome(tenantRequest.getMonthlyIncome())
//                .supervisorName(tenantRequest.getSupervisorName())
//                .supervisorPhoneNumber(tenantRequest.getSupervisorPhoneNumber())
                .lengthOfEmployment(tenantRequest.getLengthOfEmployment())
//                .emergencyContactFullName(tenantRequest.getEmergencyContactFullName())
//                .relationship(tenantRequest.getRelationship())
//                .emergencyContactPhoneNumber(tenantRequest.getEmergencyContactPhoneNumber())
//                .emailContact(tenantRequest.getEmailContact())
//                .phoneContact(tenantRequest.getPhoneContact())
//                .consentGiven(tenantRequest.getConsentGiven())
                .applicationStatus(ApplicationStatus.PENDING)
                .creationDate(tenantRequest.getCreationDate())
                .build();;
        tenantRepository.save(tenant);
        return TenantResponse.builder()
                .isSuccess(true)
                .message("Request made to the PM")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public List<Tenant> getAllTenantApplications() {
        return tenantRepository.findAll();
    }

    @Override
    public Optional<Tenant> getTenantApplicationById(Long id) {
        return tenantRepository.findById(id);
    }



}
