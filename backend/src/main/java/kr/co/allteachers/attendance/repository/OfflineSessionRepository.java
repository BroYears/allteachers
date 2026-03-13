package kr.co.allteachers.attendance.repository;

import kr.co.allteachers.attendance.entity.OfflineSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfflineSessionRepository extends JpaRepository<OfflineSession, Long> {
    List<OfflineSession> findByCourseIdOrderBySessionOrderAsc(Long courseId);
}
