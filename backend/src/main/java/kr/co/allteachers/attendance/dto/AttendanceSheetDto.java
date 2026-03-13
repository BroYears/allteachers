package kr.co.allteachers.attendance.dto;

import kr.co.allteachers.attendance.entity.AttendanceLog;
import kr.co.allteachers.attendance.entity.OfflineSession;
import kr.co.allteachers.enrollment.entity.Enrollment;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 출석부 응답 DTO
 * 클라이언트(강사/관리자 화면)와 Excel 생성 모두 이 구조 사용
 */
@Getter
public class AttendanceSheetDto {

    private final Long courseId;
    private final String courseTitle;
    private final String instructor;
    private final String level;
    private final List<SessionColumn> sessions;  // 날짜별 컬럼
    private final List<StudentRow> students;     // 학생별 행

    public AttendanceSheetDto(Long courseId, String courseTitle, String instructor, String level,
                              List<SessionColumn> sessions, List<StudentRow> students) {
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.instructor = instructor;
        this.level = level;
        this.sessions = sessions;
        this.students = students;
    }

    @Getter
    public static class SessionColumn {
        private final Long sessionId;
        private final LocalDate date;
        private final int order;
        private final String note;

        public SessionColumn(OfflineSession s) {
            this.sessionId = s.getId();
            this.date = s.getSessionDate();
            this.order = s.getSessionOrder();
            this.note = s.getNote();
        }
    }

    @Getter
    public static class StudentRow {
        private final Long userId;
        private final String name;
        private final Map<Long, String> attendance; // sessionId → status label

        public StudentRow(Enrollment enrollment, List<AttendanceLog> logs) {
            this.userId = enrollment.getUser().getId();
            this.name = enrollment.getUser().getNickname();
            this.attendance = logs.stream()
                .filter(l -> l.getOfflineSession() != null)
                .collect(Collectors.toMap(
                    l -> l.getOfflineSession().getId(),
                    l -> l.getStatus().toExcelLabel()
                ));
        }
    }
}
