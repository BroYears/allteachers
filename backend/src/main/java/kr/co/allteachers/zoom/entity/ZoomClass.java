package kr.co.allteachers.zoom.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "zoom_classes")
public class ZoomClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zoom_classes_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "zoom_link", nullable = false, columnDefinition = "text")
    private String zoomLink;

    @Column(name = "start_at", nullable = false)
    private OffsetDateTime startAt;
}
