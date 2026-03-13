package kr.co.allteachers.episode.repository;

import kr.co.allteachers.episode.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {
    List<Episode> findByCourseIdOrderByPriorityAsc(Long courseId);
}
