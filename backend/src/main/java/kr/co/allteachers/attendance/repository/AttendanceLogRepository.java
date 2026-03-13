package kr.co.allteachers.attendance.repository;

import kr.co.allteachers.attendance.entity.AttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

    // 특정 강의의 전체 출석 로그 (엑셀용)
    @Query("""
        SELECT a FROM AttendanceLog a
        JOIN FETCH a.user
        WHERE a.course.id = :courseId
        ORDER BY a.user.id, a.createdAt
        """)
    List<AttendanceLog> findByCourseIdWithUser(@Param("courseId") Long courseId);

    // 오프라인 회차별 출석 단건 조회 (upsert용)
    Optional<AttendanceLog> findByUserIdAndOfflineSessionId(Long userId, Long offlineSessionId);

    // VOD 자동 출석 중복 확인
    Optional<AttendanceLog> findByUserIdAndEpisodeId(Long userId, Long episodeId);

    // Zoom 자동 출석 중복 확인
    Optional<AttendanceLog> findByUserIdAndZoomClassId(Long userId, Long zoomClassId);
}
