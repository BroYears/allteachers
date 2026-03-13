package kr.co.allteachers.email.entity;

import jakarta.persistence.*;
import kr.co.allteachers.course.entity.Course;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Entity
@Table(name = "email_send_logs")
public class EmailSendLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_send_logs_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courses_id", nullable = false)
    private Course course;

    @Column(name = "recipient_email", nullable = false, length = 100)
    private String recipientEmail;

    @Column(name = "recipient_name", length = 50)
    private String recipientName;

    @Column(name = "subject", nullable = false, length = 255)
    private String subject;

    @Column(name = "send_status", nullable = false, length = 10)
    private String sendStatus = "PENDING";

    @Column(name = "sent_at")
    private OffsetDateTime sentAt;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    public static EmailSendLog create(Course course, String recipientEmail, String recipientName, String subject) {
        EmailSendLog log = new EmailSendLog();
        log.course = course;
        log.recipientEmail = recipientEmail;
        log.recipientName = recipientName;
        log.subject = subject;
        log.sendStatus = "PENDING";
        log.createdAt = OffsetDateTime.now();
        return log;
    }

    public void markSent() {
        this.sendStatus = "SENT";
        this.sentAt = OffsetDateTime.now();
    }

    public void markFailed(String errorMessage) {
        this.sendStatus = "FAILED";
        this.errorMessage = errorMessage;
    }
}
