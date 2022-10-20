package com.gokhan.trgo.repositories;

import com.gokhan.trgo.dto.LocationDTO;
import com.gokhan.trgo.dto.TaxonomyDTO;
import com.gokhan.trgo.entities.Taxonomy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaxonomyRepository extends JpaRepository<Taxonomy, Integer> {
    Optional<Taxonomy> findByNameEqualsIgnoreCase(String name);

    @Query(value = "SELECT *, (SELECT COUNT(*) FROM pro_tax p WHERE p.t_id = t.taxid ) as count FROM taxonomy t ORDER BY t.taxid DESC", nativeQuery = true)
    List<TaxonomyDTO> getTaxonomyList();

}