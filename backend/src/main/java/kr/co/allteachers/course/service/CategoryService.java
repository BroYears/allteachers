package kr.co.allteachers.course.service;

import kr.co.allteachers.course.dto.CategoryDto;
import kr.co.allteachers.course.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getMajorCategories() {
        return categoryRepository.findMajorCategories()
                .stream()
                .map(CategoryDto::new)
                .toList();
    }
}
