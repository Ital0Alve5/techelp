package com.techelp.api.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.DeviceModel;
import com.techelp.api.model.CategoryModel;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceModel, Integer> {
    List<DeviceModel> findByCategory(CategoryModel category);
}
