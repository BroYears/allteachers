package kr.co.allteachers.board.entity;

import jakarta.persistence.*;
import kr.co.allteachers.user.entity.User;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "boards")
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boards_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Board parent;

    @Column(name = "type", nullable = false, length = 30)
    private String type;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "text")
    private String content;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}
