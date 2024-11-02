package com.techelp.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.ClientModel;
import com.techelp.api.model.DeviceModel;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequestModel, Integer> {
    List<MaintenanceRequestModel> findByClient(ClientModel client);
    List<MaintenanceRequestModel> findByDevice(DeviceModel device);
}
