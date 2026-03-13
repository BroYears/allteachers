package kr.co.allteachers.attendance.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "offline_sessions",
       uniqueConstraints = @UniqueConstraint(
           name = "uq_offline_sessions_course_date",
           columnNames = {"courses_id", "session_date"}
       ))
public class OfflineSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "offline_sessions_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "session_order", nullable = false)
    private Integer sessionOrder = 0;

    @Column(name = "note", columnDefinition = "text")
    private String note;

    public static OfflineSession create(Course course, LocalDate sessionDate, int sessionOrder) {
        OfflineSession s = new OfflineSession();
        s.course = course;
        s.sessionDate = sessionDate;
        s.sessionOrder = sessionOrder;
        return s;
    }

    public void updateNote(String note) {
        this.note = note;
    }
}
