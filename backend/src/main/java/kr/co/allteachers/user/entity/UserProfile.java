package kr.co.allteachers.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "users_profiles")
public class UserProfile {

    @Id
    @Column(name = "users_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "users_id")
    private User user;

    @Column(name = "belong", length = 100)
    private String belong;

    @Column(name = "position", length = 100)
    private String position;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "address_detail", length = 255)
    private String addressDetail;

    @Column(name = "mailing_agreed", nullable = false)
    private Boolean mailingAgreed = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
