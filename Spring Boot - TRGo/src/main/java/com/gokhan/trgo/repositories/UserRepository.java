package com.gokhan.trgo.repositories;

import com.gokhan.trgo.dto.TotalDTO;
import com.gokhan.trgo.dto.UserDTO;
import com.gokhan.trgo.entities.User;
import com.gokhan.trgo.props.JoinUserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailEqualsIgnoreCase(String email);

    @Query(value = "SELECT u.id FROM user u WHERE u.email = ?1 ", nativeQuery = true)
    Long getIdByUserName(String userName );

    @Query(value = "SELECT u.id, u.first_name,u.last_name, u.email FROM user u WHERE u.email = ?1 ", nativeQuery = true)
    UserDTO getUserByUserName(String userName );

    Optional<User> findByIdEquals(Long id);


    boolean existsByIdEquals(Long id);


    @Query(value = "SELECT * FROM user u ", nativeQuery = true)
    List<UserDTO> getUserList();

    @Query(value = "Select sum(o.price) as total_earn, count(o.orderid) as order_count , (SELECT count(u.id) FROM user u) as user_count FROM orders o", nativeQuery = true)
    TotalDTO getTotal();





}