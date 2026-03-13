package kr.co.allteachers.email.repository;

import kr.co.allteachers.email.entity.EmailSendLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailSendLogRepository extends JpaRepository<EmailSendLog, Long> {
    List<EmailSendLog> findByCourseId(Long courseId);
    boolean existsByCourseIdAndSendStatus(Long courseId, String sendStatus);
}
