package kr.co.allteachers.course.repository;

import kr.co.allteachers.course.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    /**
     * 소분류(depth-2) 조회: 기업교육 → 언어교육/직무교육 → 영어회화/중국어/인공지능 등
     * parent 존재 AND parent.parent 존재 AND parent.parent.parent IS NULL
     * → 기업교육 하위 2단계 카테고리 (메인 페이지 탭 필터용)
     */
    @Query("""
        SELECT c FROM Category c
        WHERE c.parent IS NOT NULL
          AND c.parent.parent IS NOT NULL
          AND c.parent.parent.parent IS NULL
        ORDER BY c.parent.parent.id, c.parent.id, c.id
        """)
    List<Category> findMajorCategories();
}
