package com.gokhan.trgo.services;

import com.gokhan.trgo.dto.TaxonomyDTO;
import com.gokhan.trgo.entities.Taxonomy;
import com.gokhan.trgo.repositories.TaxonomyRepository;
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
import java.util.Optional;


@Transactional
@Service
@RequiredArgsConstructor
public class TaxonomyService {

    final TaxonomyRepository tRepository;



    public ResponseEntity add(Taxonomy taxonomy) {
        Map<REnum, Object> hm = new LinkedHashMap();
        //Optional<Taxonomy> optionalTaxonomy = tRepository.findByNameEqualsIgnoreCase(taxonomy.getName());
        if (true) {
            String capitalizedName = Util.capitalizedWords(taxonomy.getName());
            taxonomy.setName(capitalizedName);
            Taxonomy sTaxonomy = tRepository.save(taxonomy);
            hm.put(REnum.STATUS, true);
            hm.put(REnum.RESULT, 3232);
            return new ResponseEntity( hm , HttpStatus.OK);
        } else {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, "There is already a taxonomy with this name");
            return new ResponseEntity<>(hm, HttpStatus.NOT_ACCEPTABLE);
        }
    }


    public ResponseEntity delete(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            tRepository.deleteById(id);
            hm.put(REnum.STATUS, true);
            return new ResponseEntity<>(hm, HttpStatus.OK);
        } catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.ERROR, ex.getMessage());
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
    }


    public ResponseEntity list() {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<TaxonomyDTO> taxonomyList = tRepository.getTaxonomyList();
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, taxonomyList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }


    public ResponseEntity update(Taxonomy taxonomy) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            Optional<Taxonomy> oldTaxonomy = tRepository.findById(taxonomy.getTaxid());
            Optional<Taxonomy> optionalTaxonomy = tRepository
                    .findByNameEqualsIgnoreCase(taxonomy.getName());
            if (oldTaxonomy.isPresent() && !optionalTaxonomy.isPresent()) {
                String capitalizedName = Util.capitalizedWords(taxonomy.getName());
                taxonomy.setName(capitalizedName);
                tRepository.saveAndFlush(taxonomy);
                hm.put(REnum.STATUS, true);
                hm.put(REnum.MESSAGE, "Update is successful");
                hm.put(REnum.RESULT, taxonomy);
                return new ResponseEntity<>(hm, HttpStatus.OK);
            }else {
                hm.put(REnum.STATUS, false);
                hm.put(REnum.MESSAGE, "There is no record with this id or there is a record with a new record");
                return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
            }
        }catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, ex.getMessage());
        }
        return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
    }


}
