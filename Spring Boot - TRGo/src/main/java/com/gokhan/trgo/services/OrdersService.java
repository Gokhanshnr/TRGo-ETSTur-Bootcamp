package com.gokhan.trgo.services;

import com.gokhan.trgo.dto.OrderDTO;
import com.gokhan.trgo.entities.Orders;
import com.gokhan.trgo.entities.User;
import com.gokhan.trgo.props.JoinOrder;
import com.gokhan.trgo.repositories.JoinOrderRepository;
import com.gokhan.trgo.repositories.OrdersRepository;
import com.gokhan.trgo.repositories.UserRepository;
import com.gokhan.trgo.utils.JwtUtil;
import com.gokhan.trgo.utils.REnum;
import com.gokhan.trgo.utils.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Transactional
@Service
@RequiredArgsConstructor
public class OrdersService {

    final OrdersRepository ordersRepository;

    final UserRepository userRepository;

    final JoinOrderRepository joinOrderRepository;


    public ResponseEntity add(Orders order) {
        Map<REnum, Object> hm = new LinkedHashMap();
        Long authUserId = userRepository.getIdByUserName(JwtUtil.getAuthUserName());
        if(authUserId != null) {
            /* User İd Set */
            User newUser = new User();
            newUser.setId(authUserId);
            order.setUser(newUser);
            /* Calc Price */
            Long day = Util.getDifferenceDays(order.getStartDate(), order.getEndDate());
            Long roomPrice = joinOrderRepository.getRoomPrice(order.getRoom().getRoom_id());
            Integer totalPrice = (int) (day * roomPrice * order.getPerson());
            order.setPrice(totalPrice);

        ordersRepository.save(order);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, order);
        return new ResponseEntity(hm, HttpStatus.OK);
        }else{
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, "User id is wrong");
            return new ResponseEntity(hm, HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity listall() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<OrderDTO> orderList = ordersRepository.listAllOrder();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, orderList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity listByUser() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Long authUserId = userRepository.getIdByUserName(JwtUtil.getAuthUserName());
        List<JoinOrder> orderList = joinOrderRepository.listOrderByUid(authUserId);
        hm.put(REnum.MESSAGE, authUserId);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, orderList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }


    public ResponseEntity listByPid(Integer pid) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<JoinOrder> orderList = joinOrderRepository.listOrderByPid(pid);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, orderList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity delete(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            ordersRepository.deleteById(id);
            hm.put(REnum.STATUS, true);
            return new ResponseEntity<>(hm, HttpStatus.OK);
        } catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.ERROR, ex.getMessage());
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
    }


}
