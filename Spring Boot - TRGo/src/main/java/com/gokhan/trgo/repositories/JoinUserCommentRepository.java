package com.gokhan.trgo.repositories;

import com.gokhan.trgo.props.JoinUserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JoinUserCommentRepository extends JpaRepository<JoinUserComment, Integer> {

    @Query(value = "SELECT c.com_id, c.comment, c.rating, c.proid, c.u_id as id, u.first_name, u.last_name FROM comment as c INNER JOIN user as u ON c.u_id = u.id WHERE c.u_id = ?1 ", nativeQuery = true)
    List<JoinUserComment> listCommentByUid(Integer uid );

    @Query(value = "SELECT c.com_id, c.comment, c.rating, c.proid, c.u_id as id, u.first_name, u.last_name FROM comment as c INNER JOIN user as u ON c.u_id = u.id WHERE c.proid = ?1 ", nativeQuery = true)
    List<JoinUserComment> listCommentByPid(Integer pid );
}