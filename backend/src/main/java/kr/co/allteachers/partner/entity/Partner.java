package kr.co.allteachers.partner.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "partners")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partners_id")
    private Long id;

    @Column(name = "partners_url", nullable = false, columnDefinition = "text")
    private String partnersUrl;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "priority", nullable = false)
    private Integer priority = 0;
}
