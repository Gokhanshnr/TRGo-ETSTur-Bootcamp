package com.gokhan.trgo.restcontrollers;

import com.gokhan.trgo.entities.Comment;
import com.gokhan.trgo.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




import javax.validation.Valid;


@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentRestController {

    final CommentService cService;

    @PostMapping("/add")
    public ResponseEntity add(@Valid @RequestBody Comment comment) {
        return cService.add(comment);
    }

    @DeleteMapping("/delete")
    public ResponseEntity delete(@RequestParam Integer id) {
        return cService.delete(id);
    }

    @GetMapping("/product/list")
    public ResponseEntity list(Integer pid) {
        return cService.listByPid(pid);
    }

    @GetMapping("/user/list")
    public ResponseEntity list(int id) {
        return cService.listByUid(id);
    }
}