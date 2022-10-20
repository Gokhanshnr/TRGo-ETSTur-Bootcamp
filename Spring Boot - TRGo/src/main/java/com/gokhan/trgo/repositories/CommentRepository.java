package com.gokhan.trgo.repositories;

import com.gokhan.trgo.dto.CommentDTO;
import com.gokhan.trgo.entities.Comment;
import com.gokhan.trgo.props.JoinUserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    //List<Comment> findByProidEquals(Integer proid);

    //List<Comment> findByUser_IdEquals(Long id);

    @Query(value = "SELECT c.com_id, c.comment, c.rating, c.proid, c.u_id as id, c.created_date as cdate ,u.first_name, u.last_name FROM comment as c INNER JOIN user as u ON c.u_id = u.id WHERE c.u_id = ?1 ORDER BY c.com_id DESC ", nativeQuery = true)
    List<CommentDTO> listCommentByUid(Integer uid );

    @Query(value = "SELECT c.com_id, c.comment, c.rating, c.proid, c.u_id as id , c.created_date as cdate , u.first_name, u.last_name FROM comment as c INNER JOIN user as u ON c.u_id = u.id WHERE c.proid = ?1 ORDER BY c.com_id DESC ", nativeQuery = true)
    List<CommentDTO> listCommentByPid(Integer pid );

}