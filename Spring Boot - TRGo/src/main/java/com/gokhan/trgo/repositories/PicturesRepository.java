package com.gokhan.trgo.repositories;

import com.gokhan.trgo.entities.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface PicturesRepository extends JpaRepository<Pictures, Integer> {

}