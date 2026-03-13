package kr.co.allteachers.review.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import kr.co.allteachers.user.entity.User;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "reviews",
       uniqueConstraints = @UniqueConstraint(
           name = "uq_reviews_user_course",
           columnNames = {"users_id", "courses_id"}
       ))
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviews_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "rating", nullable = false)
    private Short rating;

    @Column(name = "content", nullable = false, columnDefinition = "text")
    private String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}
