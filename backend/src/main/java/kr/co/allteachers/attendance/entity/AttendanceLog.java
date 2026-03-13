package kr.co.allteachers.attendance.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import kr.co.allteachers.episode.entity.Episode;
import kr.co.allteachers.user.entity.User;
import kr.co.allteachers.zoom.entity.ZoomClass;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "attendance_logs")
public class AttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_logs_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "session_type", nullable = false, length = 10)
    private String sessionType;   // OFFLINE | VOD | ZOOM

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "offline_sessions_id")
    private OfflineSession offlineSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "episodes_id")
    private Episode episode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zoom_classes_id")
    private ZoomClass zoomClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 10)
    private AttendanceStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marked_by")
    private User markedBy;   // null = 시스템 자동

    @Column(name = "note", columnDefinition = "text")
    private String note;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    /** 오프라인 출석 생성 팩토리 (강사가 직접 마킹) */
    public static AttendanceLog ofOffline(User user, Course course,
                                         OfflineSession session,
                                         AttendanceStatus status,
                                         User markedBy, String note) {
        AttendanceLog log = new AttendanceLog();
        log.user = user;
        log.course = course;
        log.sessionType = "OFFLINE";
        log.offlineSession = session;
        log.status = status;
        log.markedBy = markedBy;
        log.note = note;
        log.createdAt = OffsetDateTime.now();
        log.updatedAt = OffsetDateTime.now();
        return log;
    }

    /** 온라인(VOD) 자동 출석 생성 팩토리 */
    public static AttendanceLog ofVod(User user, Course course, Episode episode) {
        AttendanceLog log = new AttendanceLog();
        log.user = user;
        log.course = course;
        log.sessionType = "VOD";
        log.episode = episode;
        log.status = AttendanceStatus.O;
        log.createdAt = OffsetDateTime.now();
        log.updatedAt = OffsetDateTime.now();
        return log;
    }

    /** 온라인(Zoom) 자동 출석 생성 팩토리 */
    public static AttendanceLog ofZoom(User user, Course course, ZoomClass zoomClass) {
        AttendanceLog log = new AttendanceLog();
        log.user = user;
        log.course = course;
        log.sessionType = "ZOOM";
        log.zoomClass = zoomClass;
        log.status = AttendanceStatus.O;
        log.createdAt = OffsetDateTime.now();
        log.updatedAt = OffsetDateTime.now();
        return log;
    }

    public void updateStatus(AttendanceStatus status, String note, User markedBy) {
        this.status = status;
        this.note = note;
        this.markedBy = markedBy;
        this.updatedAt = OffsetDateTime.now();
    }
}
