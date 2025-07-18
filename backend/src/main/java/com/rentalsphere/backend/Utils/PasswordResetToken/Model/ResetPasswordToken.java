package com.rentalsphere.backend.Utils.PasswordResetToken.Model;

import com.rentalsphere.backend.User.Model.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Entity(name = "ResetPasswordToken")
@Table(name = "ResetPasswordToken")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordToken {
    private static final int EXPIRY_TIME = 60 * 60 * 1000;
    @Id@GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String token;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id", referencedColumnName = "id")
    private User user;
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;

    public static class ResetPasswordTokenBuilder{
        public ResetPasswordTokenBuilder expiryDate(Date expiryDate){
            this.expiryDate = new Date(expiryDate.getTime() + EXPIRY_TIME);
            return this;
        }
    }
}
