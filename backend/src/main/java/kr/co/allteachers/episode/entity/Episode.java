package kr.co.allteachers.episode.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import lombok.Getter;

@Getter
@Entity
@Table(name = "episodes")
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "episodes_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "video_url", nullable = false, columnDefinition = "text")
    private String videoUrl;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "priority", nullable = false)
    private Integer priority = 0;
}
