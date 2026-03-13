package kr.co.allteachers.course.controller;

import kr.co.allteachers.course.dto.CategoryDto;
import kr.co.allteachers.course.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * 대분류 카테고리 목록
     * GET /api/categories/main
     */
    @GetMapping("/main")
    public ResponseEntity<List<CategoryDto>> getMajorCategories() {
        return ResponseEntity.ok(categoryService.getMajorCategories());
    }
}
