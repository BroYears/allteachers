package kr.co.allteachers.course.repository;

import kr.co.allteachers.course.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(value = """
            SELECT c FROM Course c JOIN FETCH c.category cat
            WHERE c.isPublic = true
              AND (:categoryId IS NULL
                   OR cat.id = :categoryId
                   OR cat.parent.id = :categoryId
                   OR cat.parent.parent.id = :categoryId)
            ORDER BY c.viewCount DESC
            """,
           countQuery = """
            SELECT COUNT(c) FROM Course c JOIN c.category cat
            WHERE c.isPublic = true
              AND (:categoryId IS NULL
                   OR cat.id = :categoryId
                   OR cat.parent.id = :categoryId
                   OR cat.parent.parent.id = :categoryId)
            """)
    Page<Course> findByPopularity(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT c FROM Course c JOIN FETCH c.category WHERE c.isPublic = true ORDER BY c.id DESC")
    List<Course> findRecentCourses(Pageable pageable);

    /** 자동 메일 발송용: 오늘 종료되는 오프라인 강의 조회 */
    @Query("SELECT c FROM Course c JOIN FETCH c.company WHERE c.courseType = 'OFFLINE' AND c.endDate = :today AND c.company IS NOT NULL")
    List<Course> findOfflineCoursesEndingOn(@Param("today") LocalDate today);
}
