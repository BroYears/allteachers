package kr.co.allteachers.enrollment.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import kr.co.allteachers.user.entity.User;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "enrollments",
       uniqueConstraints = @UniqueConstraint(
           name = "uq_enrollments_user_course",
           columnNames = {"users_id", "courses_id"}
       ))
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollments_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "ONGOING";

    @Column(name = "expected_end_date", nullable = false)
    private LocalDate expectedEndDate;
}
