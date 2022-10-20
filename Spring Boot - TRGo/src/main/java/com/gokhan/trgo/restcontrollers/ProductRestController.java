package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.Location;
import com.gokhan.trgo.entities.Product;
import com.gokhan.trgo.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductRestController {
    final ProductService productService;


    @PostMapping("/add")
    public ResponseEntity add(@Valid @RequestBody Product product) {
        return productService.add(product);
    }

    @GetMapping("/list")
    public ResponseEntity list() {
        return productService.list();
    }

    @GetMapping("/list/basic")
    public ResponseEntity listBasic() {
        return productService.listBasic();
    }

    @GetMapping("/get")
    public ResponseEntity get(Integer id) {
        return productService.get(id);
    }

    @PostMapping("/list/tax")
    public ResponseEntity listByTax(@RequestBody List<Integer> id) {
        return productService.listByTax(id);
    }

    @PostMapping("/list/loc")
    public ResponseEntity listByLoc(@RequestBody List<Integer> id) {
        return productService.listByLoc(id);
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam Integer id) {
        return productService.delete(id);
    }


}
