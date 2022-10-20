package com.gokhan.trgo.repositories;

import com.gokhan.trgo.dto.LocationDTO;
import com.gokhan.trgo.entities.Location;
import com.gokhan.trgo.props.JoinOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    Optional<Location> findByCityEqualsIgnoreCaseAndDistrictEqualsIgnoreCase(String city, String district);

    @Query(value = "SELECT *, (SELECT COUNT(*) FROM product p WHERE p.l_id = l.lid ) as count FROM location l ORDER BY l.lid DESC", nativeQuery = true)
    List<LocationDTO> getLocationList();


}