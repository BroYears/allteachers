package kr.co.allteachers.progress.entity;

import jakarta.persistence.*;
import kr.co.allteachers.episode.entity.Episode;
import kr.co.allteachers.user.entity.User;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "progresses")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progresses_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "episodes_id", nullable = false)
    private Episode episode;

    @Column(name = "last_position", nullable = false)
    private Integer lastPosition = 0;

    @Column(name = "is_done", nullable = false)
    private Boolean isDone = false;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;
}
