package kr.co.allteachers.banner.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "banners")
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "banners_id")
    private Long id;

    @Column(name = "position_name", nullable = false, length = 20)
    private String positionName;

    @Column(name = "banner_url", nullable = false, columnDefinition = "text")
    private String bannerUrl;

    @Column(name = "link_url", columnDefinition = "text")
    private String linkUrl;

    @Column(name = "priority", nullable = false)
    private Integer priority = 0;

    @Column(name = "view_count", nullable = false)
    private Long viewCount = 0L;
}
