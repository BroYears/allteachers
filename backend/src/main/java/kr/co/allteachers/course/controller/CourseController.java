package kr.co.allteachers.course.controller;

import kr.co.allteachers.course.dto.CourseDto;
import kr.co.allteachers.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    /**
     * 인기 강의 상단 목록
     * GET /api/courses/popular?limit=10&categoryId=1
     */
    @GetMapping("/popular")
    public ResponseEntity<List<CourseDto>> getPopularCourses(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(courseService.getPopularCourses(limit, categoryId));
    }

    /**
     * 전체 강의 인기순 페이지네이션 (무한스크롤)
     * GET /api/courses/list?page=0&size=12&categoryId=1
     */
    @GetMapping("/list")
    public ResponseEntity<Page<CourseDto>> getCourseList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(courseService.getCourseList(page, size, categoryId));
    }

    /**
     * 신규 등록 강의
     * GET /api/courses/recent?limit=6
     */
    @GetMapping("/recent")
    public ResponseEntity<List<CourseDto>> getRecentCourses(
            @RequestParam(defaultValue = "6") int limit) {
        return ResponseEntity.ok(courseService.getRecentCourses(limit));
    }
}
