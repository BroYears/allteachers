package kr.co.allteachers.company.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "companies_id")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "contact_name", nullable = false, length = 50)
    private String contactName;

    @Column(name = "contact_email", nullable = false, length = 100)
    private String contactEmail;

    @Column(name = "contact_phone", length = 20)
    private String contactPhone;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;
}
