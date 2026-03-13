package kr.co.allteachers.course.dto;

import kr.co.allteachers.course.entity.Course;
import lombok.Getter;

import java.math.BigDecimal;

/**
 * 메인 페이지 강의 카드용 응답 DTO.
 * 목록 API에서만 사용하므로 thumbnail, 제목, 강사, 카테고리명, 조회수만 포함.
 */
@Getter
public class CourseDto {

    private final Long id;
    private final String title;
    private final String instructor;
    private final String level;
    private final String thumbnailUrl;
    private final BigDecimal price;
    private final Long viewCount;
    private final Integer lessonCount;
    private final String categoryName;   // category.name (소분류명)

    public CourseDto(Course course) {
        this.id           = course.getId();
        this.title        = course.getTitle();
        this.instructor   = course.getInstructor();
        this.level        = course.getLevel();
        this.thumbnailUrl = course.getThumbnailUrl();
        this.price        = course.getPrice();
        this.viewCount    = course.getViewCount();
        this.lessonCount  = course.getLessonCount();
        this.categoryName = course.getCategory() != null
                ? course.getCategory().getName()
                : null;
    }
}
