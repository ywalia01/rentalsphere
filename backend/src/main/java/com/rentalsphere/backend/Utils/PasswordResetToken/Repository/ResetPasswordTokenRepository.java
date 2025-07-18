package com.rentalsphere.backend.Utils.PasswordResetToken.Repository;

import com.rentalsphere.backend.Utils.PasswordResetToken.Model.ResetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, UUID> {
    Optional<ResetPasswordToken> findByToken(String token);
    void deleteByToken(String token);
}
