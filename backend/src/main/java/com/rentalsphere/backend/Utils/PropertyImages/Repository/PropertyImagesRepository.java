package com.rentalsphere.backend.Utils.PropertyImages.Repository;

import com.rentalsphere.backend.Utils.PropertyImages.Model.PropertyImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PropertyImagesRepository extends JpaRepository<PropertyImages, UUID> {
}
