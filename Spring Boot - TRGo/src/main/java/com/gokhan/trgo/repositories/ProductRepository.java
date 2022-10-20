package com.gokhan.trgo.repositories;

import com.gokhan.trgo.dto.LocationDTO;
import com.gokhan.trgo.dto.ProductListDTO;
import com.gokhan.trgo.entities.Product;
import com.gokhan.trgo.props.JoinOrder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByPidEquals(Integer pid);

    Set<Product> findDistinctByLocation_LidIn(List<Integer> lid);


    Set<Product> findDistinctByTaxonomies_TaxidIn(List<Integer> taxid);


    List<Product> findAll();

    List<Product> findByOrderByPidDesc();



    boolean existsByPidEquals(Integer pid);


    @Query(value = "SELECT p.pid as pid, p.otel_name as otelName, p.star_ratings as starRatings, l.city as location, (SELECT COUNT(r.room_id) FROM rooms r WHERE r.product_id = p.pid ) as rooms FROM product p LEFT JOIN location l ON l.lid = p.l_id ORDER BY p.pid DESC", nativeQuery = true)
    List<ProductListDTO> getProductList();


}