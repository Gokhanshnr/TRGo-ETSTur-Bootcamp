package com.gokhan.trgo.services;

import com.gokhan.trgo.entities.Pictures;
import com.gokhan.trgo.repositories.PicturesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Transactional
@Service
@RequiredArgsConstructor
public class PicturesService {
    final PicturesRepository pRepo;

    public ResponseEntity add(Pictures pictures) {
        pRepo.save(pictures);
        Map<String, Object> hm = new LinkedHashMap<>();
        hm.put("status", true);
        hm.put("result", pictures);
        return new ResponseEntity(hm, HttpStatus.OK);
    }


}
