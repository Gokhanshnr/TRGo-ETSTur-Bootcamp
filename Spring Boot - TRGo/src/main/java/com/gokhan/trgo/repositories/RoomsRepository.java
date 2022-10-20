package com.gokhan.trgo.repositories;

import com.gokhan.trgo.entities.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface RoomsRepository extends JpaRepository<Rooms, Integer> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE rooms SET p_id = ?2 WHERE room_id = ?1 ", nativeQuery = true)
    void setProductId( int room_id, int p_id );
}