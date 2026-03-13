package kr.co.allteachers.progress.repository;

import kr.co.allteachers.progress.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    Optional<Progress> findByUserIdAndEpisodeId(Long userId, Long episodeId);
}
