package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.Orders;
import com.gokhan.trgo.services.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrdersRestConrtoller {
    final OrdersService ordersService;

    @PostMapping("/add")
    public ResponseEntity add(@Valid @RequestBody Orders order) {
        return ordersService.add(order);
    }

    @GetMapping("/list/all")
    public ResponseEntity list() {
        return ordersService.listall();
    }

    @GetMapping("/list/productid")
    public ResponseEntity listPid(@RequestParam Integer id) {
        return ordersService.listByPid(id);
    }

    @GetMapping("/list/user")
    public ResponseEntity listUid() {
        return ordersService.listByUser();
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam Integer id) {
        return ordersService.delete(id);
    }

}