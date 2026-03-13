package kr.co.allteachers.course.dto;

import kr.co.allteachers.course.entity.Category;
import lombok.Getter;

@Getter
public class CategoryDto {

    private final Long id;
    private final String name;

    public CategoryDto(Category category) {
        this.id   = category.getId();
        this.name = category.getName();
    }
}
