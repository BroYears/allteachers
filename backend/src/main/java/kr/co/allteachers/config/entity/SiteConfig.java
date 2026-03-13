package kr.co.allteachers.config.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "site_configs")
public class SiteConfig {

    @Id
    @Column(name = "key", length = 50)
    private String key;

    @Column(name = "value", nullable = false, columnDefinition = "text")
    private String value;
}
