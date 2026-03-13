package kr.co.allteachers.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "nickname", nullable = false, unique = true, length = 50)
    private String nickname;

    @Column(name = "phone", nullable = false, unique = true, length = 20)
    private String phone;

    @Column(name = "role", nullable = false, length = 20)
    private String role = "USER";

    @Column(name = "provider", nullable = false, length = 20)
    private String provider = "LOCAL";

    @Column(name = "has_all_access", nullable = false)
    private Boolean hasAllAccess = false;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
