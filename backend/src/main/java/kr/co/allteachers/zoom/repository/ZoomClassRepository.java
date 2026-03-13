package kr.co.allteachers.zoom.repository;

import kr.co.allteachers.zoom.entity.ZoomClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoomClassRepository extends JpaRepository<ZoomClass, Long> {
    List<ZoomClass> findByCourseIdOrderByStartAtAsc(Long courseId);
}
