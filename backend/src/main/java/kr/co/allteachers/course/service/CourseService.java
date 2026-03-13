package kr.co.allteachers.course.service;

import kr.co.allteachers.course.dto.CourseDto;
import kr.co.allteachers.course.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseService {

    private final CourseRepository courseRepository;

    /** 인기 강의 상단 N개 (categoryId = null → 전체) */
    public List<CourseDto> getPopularCourses(int limit, Long categoryId) {
        return courseRepository.findByPopularity(categoryId, PageRequest.of(0, limit))
                .getContent()
                .stream()
                .map(CourseDto::new)
                .toList();
    }

    /** 전체 강의 인기순 페이지네이션 (무한스크롤용, categoryId = null → 전체) */
    public Page<CourseDto> getCourseList(int page, int size, Long categoryId) {
        return courseRepository.findByPopularity(categoryId, PageRequest.of(page, size))
                .map(CourseDto::new);
    }

    /** 신규 등록 강의 */
    public List<CourseDto> getRecentCourses(int limit) {
        return courseRepository.findRecentCourses(PageRequest.of(0, limit))
                .stream()
                .map(CourseDto::new)
                .toList();
    }
}
