package com.muneo.cody.repository;

import com.muneo.cody.entity.Member;
import com.muneo.cody.entity.Snap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SnapRepository extends JpaRepository<Snap, Long> {
    List<Snap> findAllByOrderBySnapCreatedDateDesc();
    List<Snap> findByMember(Member member);
}
