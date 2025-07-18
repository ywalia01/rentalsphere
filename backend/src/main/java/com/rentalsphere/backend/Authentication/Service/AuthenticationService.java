package com.rentalsphere.backend.Authentication.Service;

import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.Configuration.JwtService;
import com.rentalsphere.backend.Enums.EmailType;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.EmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.Utils.PasswordResetToken.Model.ResetPasswordToken;
import com.rentalsphere.backend.Utils.PasswordResetToken.Repository.ResetPasswordTokenRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ResetPasswordTokenRepository resetPasswordTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("User with same email already exists");
        }
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Arrays.asList(roleRepository.findByName(Roles.USER)))
                .build();
        userRepository.save(user);
        List<String> userRoles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .isSuccess(true)
                .email(user.getEmail())
                .token(token)
                .roles(userRoles)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public AuthenticationResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->
                new InvalidCredentialsException("No registered user with this email")
        );

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Incorrect Password");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )

        );

        List<String> userRoles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .isSuccess(true)
                .email(user.getEmail())
                .token(jwtToken)
                .roles(userRoles)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) throws MessagingException {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new UserNotFoundException("User does not exist"));
        String token = UUID.randomUUID().toString();
        ResetPasswordToken resetPasswordToken = ResetPasswordToken
                .builder()
                .token(token)
                .user(user)
                .expiryDate(new Date())
                .build();

        resetPasswordTokenRepository.save(resetPasswordToken);
        emailService.sendEmailTemplate(EmailType.PASSWORD_RESET, user.getEmail(), "Forgot Password", user.getFirstName() + " " + user.getLastName(), "Here is your password reset link ", token);

        return ForgotPasswordResponse
                .builder()
                .isSuccess(true)
                .successMessage("email sent")
                .timeStamp(new Date())
                .build();
    }

    @Override
    @Transactional
    public ForgotPasswordResponse changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                ()->new UserNotFoundException("User does not exist")
        );
        ResetPasswordToken token = resetPasswordTokenRepository.findByToken(request.getToken()).orElseThrow(
                ()->new TokenNotFoundException("Invalid token")
        );
        if(!token.getUser().equals(user)){
            throw new TokenNotFoundException("Invalid token");
        }

        if(!new Date().before(token.getExpiryDate())){
            resetPasswordTokenRepository.deleteByToken(token.getToken());
            throw new TokenNotFoundException("Token is expired");
        }

        if(passwordEncoder.encode(request.getNewPassword()).equals(user.getPassword())){
            throw new SamePasswordException("New password cannot be same as old password");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        resetPasswordTokenRepository.deleteByToken(request.getToken());

        return ForgotPasswordResponse
                .builder()
                .isSuccess(true)
                .successMessage("Password reset successful")
                .timeStamp(new Date())
                .build();
    }
}
