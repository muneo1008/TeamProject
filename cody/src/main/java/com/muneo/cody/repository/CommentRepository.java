package com.muneo.cody.repository;

import com.muneo.cody.entity.Comment;
import com.muneo.cody.entity.Snap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findBySnap_SnapIdOrderByCreateDateAsc(Long snapId);
    void deleteAllBySnap(Snap snap);
}
