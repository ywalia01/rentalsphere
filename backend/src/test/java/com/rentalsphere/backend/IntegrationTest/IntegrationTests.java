package com.rentalsphere.backend.IntegrationTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rentalsphere.backend.Admin.Controller.AdminController;
import com.rentalsphere.backend.Admin.Service.IService.IAdminService;
import com.rentalsphere.backend.Announcement.Controller.AnnouncementController;
import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.Announcement.Service.IService.IAnnouncementService;
import com.rentalsphere.backend.Authentication.Controller.AuthenticationController;
import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Lease.Controller.LeaseController;
import com.rentalsphere.backend.Lease.Service.IService.ILeaseService;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import com.rentalsphere.backend.RequestResponse.Authentication.AuthenticationResponse;
import com.rentalsphere.backend.RequestResponse.Authentication.LoginRequest;
import com.rentalsphere.backend.RequestResponse.Authentication.RegisterRequest;
import com.rentalsphere.backend.ViolationLog.Controller.ViolationLogController;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import com.rentalsphere.backend.ViolationLog.Service.IService.IViolationLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(excludeAutoConfiguration = SecurityAutoConfiguration.class)
@ContextConfiguration(classes = {
        AuthenticationController.class,
        IAuthenticationService.class,
        ViolationLogController.class,
        IViolationLogService.class,
        AnnouncementController.class,
        IAnnouncementService.class,
        AdminController.class,
        IAdminService.class
})
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")

public class IntegrationTests {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private IAuthenticationService authService;
    @MockBean
    private IViolationLogService violationLogService;
    @MockBean
    private IAnnouncementService announcementService;
    @MockBean
    private IAdminService adminService;
    @Autowired
    private ObjectMapper objectMapper;
    private String token;

    @BeforeEach
    void init() {
        MockitoAnnotations.openMocks(this);
        token = "token";
    }

    @Test
    public void testLogin() throws Exception {
        // Mocking the login request and response
        LoginRequest request = new LoginRequest("patelraj10401@gmail.com", "password");
        AuthenticationResponse response = AuthenticationResponse.builder()
                .isSuccess(true)
                .email("email")
                .token("token")
                .roles(List.of(Roles.USER.name()))
                .timeStamp(new Date())
                .build();

        // Mocking the service method
        Mockito.when(authService.login(request)).thenReturn(response);

        // Perform the POST request and validate the response
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }

    @Test
    void testRegister() throws Exception {
        RegisterRequest request = new RegisterRequest("Raj", "Patel", "patelraj10401@gmail.com", "password");
        AuthenticationResponse response = AuthenticationResponse.builder()
                .isSuccess(true)
                .email("email")
                .token("token")
                .roles(List.of(Roles.USER.name()))
                .timeStamp(new Date())
                .build();

        Mockito.when(authService.register(request)).thenReturn(response);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andDo(print())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }

    @Test
    void testGetAllViolationLogs() throws Exception {
        ViolationLog violationLog = new ViolationLog();
        violationLog.setId(1L);
        violationLog.setTitle("violation");
        violationLog.setIntensity("high");
        violationLog.setDescription("description");
        violationLog.setMonetaryDamage(25.00);
        violationLog.setDate(new Date());
        violationLog.setPersonalComments("comments");

        String token = "token";

        Mockito.when(violationLogService.getAllViolationLogs()).thenReturn(List.of(violationLog));

        MvcResult result = mockMvc.perform(get("/api/v1/violationlog/")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }

    @Test
    void testAnnouncementById() throws Exception {
        Announcement announcement = new Announcement();
        announcement.setId(1L);
        announcement.setTitle("announcement");
        announcement.setContent("description");
        announcement.setProperty(null);
        announcement.setAnnouncementDate(new Date());

        Mockito.when(announcementService.getAnnouncementById(1L)).thenReturn(Optional.of(announcement));

        MvcResult result = mockMvc.perform(get("/api/v1/announcements/" + announcement.getId())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }

    @Test
    void testAcceptRequest() throws Exception {
        String email = "patelraj10401@gmail.com";
        PropertyManagerResponse response = new PropertyManagerResponse("Request Accepted");

        Mockito.when(adminService.acceptRequest(email)).thenReturn(response);

        MvcResult result = mockMvc.perform(post("/api/v1/admin/approve/" + email))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }

    @Test
    void testRejectRequest() throws Exception {
        String email = "patelraj10401@gmail.com";
        PropertyManagerResponse response = new PropertyManagerResponse("Request Accepted");

        Mockito.when(adminService.rejectRequest(email)).thenReturn(response);

        MvcResult result = mockMvc.perform(post("/api/v1/admin/reject/" + email))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        assertNotNull(responseBody);
    }
}
