package com.rentalsphere.backend.Authentication.Service;

import com.rentalsphere.backend.Configuration.JwtService;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.EmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.Utils.PasswordResetToken.Model.ResetPasswordToken;
import com.rentalsphere.backend.Utils.PasswordResetToken.Repository.ResetPasswordTokenRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {
    @InjectMocks
    private AuthenticationService authenticationService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserRepository userRepository;
    @Mock
    private User user;
    private User anotherUser;
    @Mock
    private RegisterRequest registerRequest;
    @Mock
    private LoginRequest loginRequest;
    @Mock
    private ForgotPasswordRequest forgotPasswordRequest;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private ResetPasswordTokenRepository resetPasswordTokenRepository;
    @Mock
    private EmailService emailService;
    @Mock
    private JwtService jwtService;
    private ResetPasswordToken resetPasswordTokenValid;
    @Mock
    private ResetPasswordToken resetPasswordTokenInvalid;
    private ForgotPasswordResponse forgotPasswordResponseExpected;
    private ForgotPasswordResponse changePasswordResponseExpected;
    private ChangePasswordRequest changePasswordRequest;
    private Role role;

    @BeforeEach
    void init(){
        role = new Role(UUID.randomUUID(), Roles.USER, null);
        user = User.builder()
                .email("raj@gmail.com")
                .password("raj@123")
                .firstName("Raj")
                .lastName("Patel")
                .roles(List.of(role))
                .build();
        anotherUser = User.builder()
                .email("raj123anoth@gmail.com")
                .password("raj@123")
                .firstName("Raj")
                .lastName("Patel")
                .build();
        registerRequest = new RegisterRequest("Raj", "Patel", "raj@gmail.com", "raj@1235");
        loginRequest = new LoginRequest("raj@gmail.com", "raj@123");
        forgotPasswordRequest = new ForgotPasswordRequest("raj@gmail.com");
        changePasswordRequest = new ChangePasswordRequest("raj@gmail.com","token","raj@12345");
        forgotPasswordResponseExpected = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("email sent")
                .timeStamp(new Date())
                .build();
        changePasswordResponseExpected = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("Password reset successful")
                .timeStamp(new Date())
                .build();
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 10);
        Date nonExpiredTime = cal.getTime();
        resetPasswordTokenValid = new ResetPasswordToken(UUID.randomUUID(),"token", user, nonExpiredTime);
    }

    @Test
    void testRegister(){
        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn(registerRequest.getPassword());
        when(roleRepository.findByName(Roles.USER)).thenReturn(role);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        AuthenticationResponse response = authenticationService.register(registerRequest);

        assertTrue(response.isSuccess());
    }

    @Test
    void testRegisterUserAlreadyExistsException(){
        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyExistsException.class, () ->{
           authenticationService.register(registerRequest);
        });
    }

    @Test
    void testLogin(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginRequest.getPassword(), loginRequest.getPassword())).thenReturn(true);
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        AuthenticationResponse response = authenticationService.login(loginRequest);

        assertTrue(response.isSuccess());
    }

    @Test
    void testLoginNoSuchUserExistsException(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, ()->{
           authenticationService.login(loginRequest);
        });
    }

    @Test
    void testLoginInvalidCredentialsException(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginRequest.getPassword(), loginRequest.getPassword())).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, ()->{
            authenticationService.login(loginRequest);
        });
    }

    @Test
    void testForgotPassword() throws MessagingException {
        when(userRepository.findByEmail(forgotPasswordRequest.getEmail())).thenReturn(Optional.of(user));
        when(resetPasswordTokenRepository.save(any(ResetPasswordToken.class))).thenReturn(resetPasswordTokenValid);

        ForgotPasswordResponse forgotPasswordResponseActual = authenticationService.forgotPassword(forgotPasswordRequest);

        assertEquals(forgotPasswordResponseExpected, forgotPasswordResponseActual);
    }

    @Test
    void testForgotPasswordUserNotFoundException(){
        when(userRepository.findByEmail(forgotPasswordRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
            authenticationService.forgotPassword(forgotPasswordRequest);
        });
    }

    @Test
    void testChangePassword(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));
        when(resetPasswordTokenRepository.findByToken(anyString())).thenReturn(Optional.of(resetPasswordTokenValid));
        when(passwordEncoder.encode(anyString())).thenReturn("raj@12345");

        ForgotPasswordResponse changePasswordResponseActual = authenticationService.changePassword(changePasswordRequest);

        assertEquals(changePasswordResponseExpected, changePasswordResponseActual);
    }

    @Test
    void testChangePasswordUserNotFoundException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testChangePasswordTokenNotFoundException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(resetPasswordTokenRepository.findByToken(anyString())).thenReturn(Optional.empty());

        assertThrows(TokenNotFoundException.class, ()->{
           authenticationService.changePassword(changePasswordRequest);
        });

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(resetPasswordTokenRepository.findByToken(anyString())).thenReturn(Optional.of(resetPasswordTokenInvalid));
        when(resetPasswordTokenInvalid.getUser()).thenReturn(anotherUser);

        assertThrows(TokenNotFoundException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(resetPasswordTokenRepository.findByToken(anyString())).thenReturn(Optional.of(resetPasswordTokenInvalid));
        when(resetPasswordTokenInvalid.getUser()).thenReturn(user);
        when(resetPasswordTokenInvalid.getExpiryDate()).thenReturn(new Date());

        assertThrows(TokenNotFoundException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testSamePasswordException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));
        when(resetPasswordTokenRepository.findByToken(anyString())).thenReturn(Optional.of(resetPasswordTokenValid));
        when(passwordEncoder.encode(anyString())).thenReturn("raj@123");

        assertThrows(SamePasswordException.class, ()->{
           authenticationService.changePassword(changePasswordRequest);
        });
    }
}
