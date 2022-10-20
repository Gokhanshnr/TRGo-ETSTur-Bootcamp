package com.gokhan.trgo.repositories;

import com.gokhan.trgo.props.JoinOrder;
import com.gokhan.trgo.props.JoinUserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JoinOrderRepository extends JpaRepository<JoinOrder, Integer> {

    @Query(value = "SELECT o.orderid, u.id, r.room_id, p.otel_name, r.name as room_name, o.start_date , o.end_date , o.person , o.price FROM orders as o INNER JOIN user as u ON o.user_id = u.id INNER JOIN rooms as r ON o.room_room_id = r.room_id INNER JOIN product as p ON p.pid = r.p_id ORDER BY o.orderid DESC", nativeQuery = true)
    List<JoinOrder> listAllOrder();


    @Query(value = "SELECT o.orderid, u.id, r.room_id, p.otel_name, r.name as room_name, o.start_date , o.end_date , o.person , o.price FROM orders as o INNER JOIN user as u ON o.user_id = u.id INNER JOIN rooms as r ON o.room_room_id = r.room_id INNER JOIN product as p ON p.pid = r.p_id where o.user_id = ?1 ORDER BY o.orderid DESC", nativeQuery = true)
    List<JoinOrder> listOrderByUid(Long uid);

    @Query(value = "SELECT o.orderid, u.id, r.room_id, p.otel_name, r.name as room_name, o.start_date , o.end_date , o.person , o.price FROM orders as o INNER JOIN user as u ON o.user_id = u.id INNER JOIN rooms as r ON o.room_room_id = r.room_id INNER JOIN product as p ON p.pid = r.p_id where p.pid = ?1 ORDER BY o.orderid DESC", nativeQuery = true)
    List<JoinOrder> listOrderByPid(Integer pid);

    @Query(value = "SELECT r.price FROM rooms r WHERE r.room_id = ?1", nativeQuery = true)
    Long getRoomPrice(Integer rid);

}