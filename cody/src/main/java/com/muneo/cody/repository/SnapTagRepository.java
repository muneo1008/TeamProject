package com.muneo.cody.repository;

import com.muneo.cody.entity.Snap;
import com.muneo.cody.entity.SnapTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SnapTagRepository extends JpaRepository<SnapTag, Long> {
    List<SnapTag> findByCategori_CategoryName(String categoryName);
    List<SnapTag> findBySnap(Snap snap);
    void deleteAllBySnap(Snap snap);
}
