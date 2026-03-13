package kr.co.allteachers.enrollment.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Category;
import kr.co.allteachers.user.entity.User;
import lombok.Getter;

@Getter
@Entity
@Table(name = "categories_enrollments")
public class CategoriesEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categories_enrollments_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categories_id", nullable = false)
    private Category category;
}
