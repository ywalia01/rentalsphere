package com.rentalsphere.backend.Tenant.Service.IService;

import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import java.util.List;
import java.util.Optional;

public interface ITenantService {

    public TenantResponse saveTenantApplication(TenantRegisterRequest tenantRequest);

    public List<Tenant> getAllTenantApplications();

    public Optional<Tenant> getTenantApplicationById(Long id);


}