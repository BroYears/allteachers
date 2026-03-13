package kr.co.allteachers.attendance.service;

import kr.co.allteachers.attendance.dto.AttendanceSheetDto;
import kr.co.allteachers.attendance.dto.MarkAttendanceRequest;
import kr.co.allteachers.attendance.entity.AttendanceLog;
import kr.co.allteachers.attendance.entity.OfflineSession;
import kr.co.allteachers.attendance.repository.AttendanceLogRepository;
import kr.co.allteachers.attendance.repository.OfflineSessionRepository;
import kr.co.allteachers.course.entity.Course;
import kr.co.allteachers.course.repository.CourseRepository;
import kr.co.allteachers.enrollment.entity.Enrollment;
import kr.co.allteachers.enrollment.repository.EnrollmentRepository;
import kr.co.allteachers.episode.entity.Episode;
import kr.co.allteachers.episode.repository.EpisodeRepository;
import kr.co.allteachers.user.entity.User;
import kr.co.allteachers.user.repository.UserRepository;
import kr.co.allteachers.zoom.entity.ZoomClass;
import kr.co.allteachers.zoom.repository.ZoomClassRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AttendanceService {

    private final AttendanceLogRepository attendanceLogRepo;
    private final OfflineSessionRepository offlineSessionRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;
    private final EpisodeRepository episodeRepo;
    private final ZoomClassRepository zoomClassRepo;

    /** 오프라인 강의 출석부 조회 (강사/관리자 화면 + Excel) */
    public AttendanceSheetDto getOfflineSheet(Long courseId) {
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("강의를 찾을 수 없습니다: " + courseId));

        List<OfflineSession> sessions = offlineSessionRepo.findByCourseIdOrderBySessionOrderAsc(courseId);
        List<Enrollment> enrollments = enrollmentRepo.findByCourseIdWithUser(courseId);
        List<AttendanceLog> logs = attendanceLogRepo.findByCourseIdWithUser(courseId);

        // userId → logs 그룹핑
        Map<Long, List<AttendanceLog>> logsByUser = logs.stream()
            .filter(l -> "OFFLINE".equals(l.getSessionType()))
            .collect(Collectors.groupingBy(l -> l.getUser().getId()));

        List<AttendanceSheetDto.SessionColumn> sessionColumns = sessions.stream()
            .map(AttendanceSheetDto.SessionColumn::new)
            .toList();

        List<AttendanceSheetDto.StudentRow> studentRows = enrollments.stream()
            .map(e -> new AttendanceSheetDto.StudentRow(
                e,
                logsByUser.getOrDefault(e.getUser().getId(), List.of())
            ))
            .toList();

        return new AttendanceSheetDto(
            course.getId(), course.getTitle(), course.getInstructor(), course.getLevel(),
            sessionColumns, studentRows
        );
    }

    /** 오프라인 수업 회차 등록 */
    @Transactional
    public OfflineSession createSession(Long courseId, LocalDate date, int order) {
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("강의를 찾을 수 없습니다: " + courseId));
        return offlineSessionRepo.save(OfflineSession.create(course, date, order));
    }

    /** 회차 메모 수정 */
    @Transactional
    public void updateSessionNote(Long sessionId, String note) {
        OfflineSession session = offlineSessionRepo.findById(sessionId)
            .orElseThrow(() -> new NoSuchElementException("회차를 찾을 수 없습니다: " + sessionId));
        session.updateNote(note);
    }

    /** 오프라인 출석 마킹 (강사가 직접, upsert) */
    @Transactional
    public AttendanceLog markOffline(MarkAttendanceRequest req, Long instructorId) {
        User user = userRepo.findById(req.userId())
            .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다"));
        OfflineSession session = offlineSessionRepo.findById(req.offlineSessionId())
            .orElseThrow(() -> new NoSuchElementException("회차를 찾을 수 없습니다"));
        User instructor = userRepo.findById(instructorId)
            .orElseThrow(() -> new NoSuchElementException("강사를 찾을 수 없습니다"));

        Optional<AttendanceLog> existing =
            attendanceLogRepo.findByUserIdAndOfflineSessionId(req.userId(), req.offlineSessionId());

        if (existing.isPresent()) {
            existing.get().updateStatus(req.status(), req.note(), instructor);
            return existing.get();
        }
        return attendanceLogRepo.save(
            AttendanceLog.ofOffline(user, session.getCourse(), session, req.status(), instructor, req.note())
        );
    }

    /** VOD 자동 출석 (Progress.isDone = true 시 호출) */
    @Transactional
    public void markVodAuto(Long userId, Long episodeId) {
        if (attendanceLogRepo.findByUserIdAndEpisodeId(userId, episodeId).isPresent()) return;

        User user = userRepo.findById(userId).orElseThrow();
        Episode episode = episodeRepo.findById(episodeId).orElseThrow();
        attendanceLogRepo.save(AttendanceLog.ofVod(user, episode.getCourse(), episode));
    }

    /** Zoom 자동 출석 (학생이 Zoom 접속 시 호출) */
    @Transactional
    public void markZoomAuto(Long userId, Long zoomClassId) {
        if (attendanceLogRepo.findByUserIdAndZoomClassId(userId, zoomClassId).isPresent()) return;

        User user = userRepo.findById(userId).orElseThrow();
        ZoomClass zoomClass = zoomClassRepo.findById(zoomClassId).orElseThrow();
        attendanceLogRepo.save(AttendanceLog.ofZoom(user, zoomClass.getCourse(), zoomClass));
    }
}
