package com.rentalsphere.backend.Tenant.Model;

import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.User.Model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "TenantApplications")
@Table(name = "TenantApplications")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "TenantID")
    private UUID tenantID;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "id")
    private User user;

    @NotBlank(message = "PhoneNumber cannot be blank.")
    @Column(name = "PhoneNumber", nullable = false)
    private String phoneNumber;

    @NotBlank(message = "Email Address cannot be blank.")
    @Column(name = "EmailAddress", nullable = false)
    private String emailAddress;

    @NotNull(message = "DateOfBirth cannot be blank.")
    @Column(name = "DateOfBirth", nullable = false)
    private Date dateOfBirth;

    @NotBlank(message = "SocialSecurityNumber cannot be blank.")
    @Column(name = "SocialSecurityNumber", nullable = false)
    private String socialSecurityNumber;

    @NotBlank(message = "Address cannot be blank.")
    @Column(name = "Address", nullable = false)
    private String streetAddress;

    @NotNull(message = "DesiredMoveInDate cannot be blank.")
    @Column(name = "DesiredMoveInDate", nullable = false)
    private Date desiredMoveInDate;

    @NotNull(message = "LeaseTermMonths cannot be blank.")
    @Positive(message = "LeaseTermMonths must be a positive number.")
    @Column(name = "LeaseTermMonths", nullable = false)
    private Integer leaseTermMonths;

    @NotNull(message = "NumOccupants cannot be blank.")
    @Positive(message = "NumOccupants must be a positive number.")
    @Column(name = "NumOccupants", nullable = false)
    private Integer numOccupants;

    @NotBlank(message = "CurrentEmployer cannot be blank.")
    @Column(name = "CurrentEmployer", nullable = false)
    private String currentEmployer;

    @NotNull(message = "LengthOfEmployment cannot be blank.")
    @Positive(message = "LengthOfEmployment must be a positive number.")
    @Column(name = "LengthOfEmployment", nullable = false)
    private Integer lengthOfEmployment;

//    @NotBlank(message = "ApplicationStatus cannot be blank.")
    @Column(name = "ApplicationStatus", nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    @NotNull(message = "CreationDate cannot be blank.")
    @Column(name = "CreationDate", nullable = false)
    private Date creationDate;

    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "PropertyApplicationID") // This is the foreign key column in PropertyApplications table
    private Property property;


}
