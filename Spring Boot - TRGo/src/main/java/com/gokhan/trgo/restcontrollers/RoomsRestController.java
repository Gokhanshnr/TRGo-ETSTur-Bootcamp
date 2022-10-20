package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.Rooms;
import com.gokhan.trgo.services.RoomsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomsRestController {

    final RoomsService roomsService;


    @PostMapping("/add")
    public ResponseEntity add(@Valid @RequestBody Rooms rooms) {
        return roomsService.add(rooms);
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam Integer id) {
        return roomsService.delete(id);
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        return roomsService.list();
    }
}
