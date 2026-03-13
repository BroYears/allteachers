package kr.co.allteachers.course.entity;

import jakarta.persistence.*;
import kr.co.allteachers.company.entity.Company;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "courses_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categories_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companies_id")
    private Company company;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "instructor", nullable = false, length = 150)
    private String instructor;

    @Column(name = "level", nullable = false, length = 20)
    private String level;

    @Column(name = "thumbnail_url", nullable = false, columnDefinition = "text")
    private String thumbnailUrl;

    @Column(name = "price", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "intro_text", columnDefinition = "text")
    private String introText;

    @Column(name = "intro_image_url", columnDefinition = "text")
    private String introImageUrl;

    @Column(name = "textbook_name", length = 255)
    private String textbookName;

    @Column(name = "textbook_url", columnDefinition = "text")
    private String textbookUrl;

    @Column(name = "view_count", nullable = false)
    private Long viewCount = 0L;

    @Column(name = "lesson_count", nullable = false)
    private Integer lessonCount = 0;

    @Column(name = "priority", nullable = false)
    private Integer priority = 0;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    @Column(name = "course_type", nullable = false, length = 10)
    private String courseType = "ONLINE";   // ONLINE | OFFLINE

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;
}
