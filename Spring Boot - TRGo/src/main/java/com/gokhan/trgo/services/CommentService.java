package com.gokhan.trgo.services;


import com.gokhan.trgo.dto.CommentDTO;
import com.gokhan.trgo.entities.Comment;
import com.gokhan.trgo.entities.User;
import com.gokhan.trgo.props.JoinUserComment;
import com.gokhan.trgo.repositories.CommentRepository;
import com.gokhan.trgo.repositories.JoinUserCommentRepository;
import com.gokhan.trgo.repositories.ProductRepository;
import com.gokhan.trgo.repositories.UserRepository;
import com.gokhan.trgo.utils.JwtUtil;
import com.gokhan.trgo.utils.REnum;
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
public class CommentService {

    final UserRepository userRepository;
    final CommentRepository cRepository;
    final ProductRepository pRepository;
    final JwtUtil jwtUtil;



    public ResponseEntity listByPid(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<CommentDTO> commentList = cRepository.listCommentByPid(id);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, commentList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }



    public ResponseEntity add(Comment comment) {
        Map<REnum, Object> hm = new LinkedHashMap();
        Long authUserId = userRepository.getIdByUserName(JwtUtil.getAuthUserName());
        if(authUserId != null) {
            Boolean isProId = pRepository.existsByPidEquals(comment.getProid());
            if (isProId) {
                User newUser = new User();
                newUser.setId(authUserId);
                comment.setUser(newUser);
                Comment sComment = cRepository.save(comment);
                hm.put(REnum.STATUS, true);
                hm.put(REnum.RESULT, sComment);
                return new ResponseEntity(hm, HttpStatus.OK);
            } else {
                hm.put(REnum.STATUS, false);
                hm.put(REnum.MESSAGE, "Product id is wrong");
                return new ResponseEntity(hm, HttpStatus.BAD_REQUEST);
            }
        }else{
            hm.put(REnum.STATUS, false);
            hm.put(REnum.MESSAGE, "User id is wrong");
            return new ResponseEntity(hm, HttpStatus.FORBIDDEN);
        }
    }


    public ResponseEntity delete(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        try {
            cRepository.deleteById(id);
            hm.put(REnum.STATUS, true);
            return new ResponseEntity<>(hm, HttpStatus.OK);
        } catch (Exception ex) {
            hm.put(REnum.STATUS, false);
            hm.put(REnum.ERROR, ex.getMessage());
            return new ResponseEntity<>(hm, HttpStatus.BAD_REQUEST);
        }
    }



    public ResponseEntity listByUid(Integer id) {
        Map<REnum, Object> hm = new LinkedHashMap<>();
        List<CommentDTO> commentList = cRepository.listCommentByUid(id);
        hm.put(REnum.STATUS, true);
        hm.put(REnum.RESULT, commentList);
        return new ResponseEntity<>(hm, HttpStatus.OK);
    }

}