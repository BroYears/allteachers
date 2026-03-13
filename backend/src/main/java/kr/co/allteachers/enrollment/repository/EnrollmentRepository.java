package kr.co.allteachers.enrollment.repository;

import kr.co.allteachers.enrollment.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);

    @Query("SELECT e FROM Enrollment e JOIN FETCH e.user WHERE e.course.id = :courseId")
    List<Enrollment> findByCourseIdWithUser(@Param("courseId") Long courseId);

    List<Enrollment> findByUserId(Long userId);
}
