package com.rentalsphere.backend.Admin.Service.IService;

import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import com.rentalsphere.backend.User.Model.User;
import jakarta.mail.MessagingException;

import java.util.List;

public interface IAdminService {
    public PropertyManagerResponse acceptRequest(String email);
    public PropertyManagerResponse rejectRequest(String email);
    public PropertyManagerRequests getAllRequests();
}
