package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.Location;
import com.gokhan.trgo.services.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/location")
@RequiredArgsConstructor
public class LocationRestController {

    final LocationService locationService;

    @PostMapping("/add")
    public ResponseEntity add(@Valid @RequestBody Location location) {
        return locationService.add(location);
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam Integer id) {
        return locationService.delete(id);
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        return locationService.list();
    }

    @PutMapping("/update")
    public ResponseEntity update(@Valid @RequestBody Location location){
        return locationService.update(location);
    }
}
