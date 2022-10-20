package com.gokhan.trgo.services;

import com.gokhan.trgo.dto.ProductListDTO;
import com.gokhan.trgo.entities.Product;
import com.gokhan.trgo.repositories.ProductRepository;
import com.gokhan.trgo.utils.REnum;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Transactional
@Service
@RequiredArgsConstructor
public class ProductService {

    final ProductRepository productRepository;


    public ResponseEntity add(Product product) {
        Map<REnum, Object> hm = new LinkedHashMap();
        Product sProduct = productRepository.save(product);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, sProduct);
        return new ResponseEntity( hm , HttpStatus.OK);
    }


    public ResponseEntity list() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<Product> productsList = productRepository.findByOrderByPidDesc();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, productsList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity listBasic() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<ProductListDTO> productsList = productRepository.getProductList();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, productsList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }


    public ResponseEntity get(Integer id){
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Optional<Product> product = productRepository.findByPidEquals(id);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, product);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

    public ResponseEntity listByTax(List<Integer> id){
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Set<Product> product = productRepository.findDistinctByTaxonomies_TaxidIn(id);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, product);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }


    public ResponseEntity listByLoc(List<Integer> id){
        Map<REnum, Object> hm = new LinkedHashMap<>();
        Set<Product> product = productRepository.findDistinctByLocation_LidIn(id);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, product );
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }


    public ResponseEntity delete(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            productRepository.deleteById(id);
            hm.put(REnum.STATUS, true);
            return new ResponseEntity<>(hm, HttpStatus.OK);
        } catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.ERROR, ex.getMessage());
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
    }


}
