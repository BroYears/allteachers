package kr.co.allteachers.email.service;

import kr.co.allteachers.attendance.dto.AttendanceSheetDto;
import kr.co.allteachers.attendance.service.AttendanceExcelService;
import kr.co.allteachers.attendance.service.AttendanceService;
import kr.co.allteachers.course.entity.Course;
import kr.co.allteachers.course.repository.CourseRepository;
import kr.co.allteachers.email.entity.EmailSendLog;
import kr.co.allteachers.email.repository.EmailSendLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceEmailService {

    private final JavaMailSender mailSender;
    private final CourseRepository courseRepo;
    private final AttendanceService attendanceService;
    private final AttendanceExcelService excelService;
    private final EmailSendLogRepository emailSendLogRepo;

    /**
     * 매일 자정 실행: 오늘 종료되는 오프라인 강의 → 기업 담당자에게 출석부 메일 자동 발송
     * 오프라인: course.end_date = today
     * 온라인: enrollment.expected_end_date 기준은 별도 Job으로 처리 (향후 확장)
     */
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void sendScheduled() {
        LocalDate today = LocalDate.now();
        List<Course> ending = courseRepo.findOfflineCoursesEndingOn(today);
        for (Course course : ending) {
            if (course.getCompany() == null) continue;
            try {
                sendAttendanceEmail(course.getId());
            } catch (Exception e) {
                log.error("출석부 자동 메일 발송 실패 - courseId={}", course.getId(), e);
            }
        }
    }

    /** 관리자가 수동으로 특정 강의 출석부 메일 발송 */
    @Transactional
    public void sendAttendanceEmail(Long courseId) throws MessagingException, IOException {
        Course course = courseRepo.findById(courseId)
            .orElseThrow(() -> new NoSuchElementException("강의를 찾을 수 없습니다: " + courseId));

        if (course.getCompany() == null) {
            throw new IllegalStateException("해당 강의에 연결된 기업 정보가 없습니다.");
        }

        // 출석부 Excel 생성
        AttendanceSheetDto sheet = attendanceService.getOfflineSheet(courseId);
        byte[] excelBytes = excelService.generate(sheet);

        String subject = String.format("[에듀컴퍼니] %s 강의 출석부", course.getTitle());
        String to = course.getCompany().getContactEmail();
        String toName = course.getCompany().getContactName();
        String filename = "출석부_" + course.getTitle() + ".xlsx";

        // 발송 로그 선저장
        EmailSendLog sendLog = emailSendLogRepo.save(
            EmailSendLog.create(course, to, toName, subject)
        );

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(buildEmailBody(toName, course.getTitle()), true);
            helper.addAttachment(filename,
                new org.springframework.core.io.ByteArrayResource(excelBytes),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            mailSender.send(message);
            sendLog.markSent();
            log.info("출석부 메일 발송 완료 - courseId={}, to={}", courseId, to);
        } catch (Exception e) {
            sendLog.markFailed(e.getMessage());
            throw e;
        }
    }

    private String buildEmailBody(String contactName, String courseTitle) {
        return """
            <p>안녕하세요, %s 담당자님.</p>
            <p>에듀컴퍼니입니다.</p>
            <p><strong>%s</strong> 강의가 종료되어 출석부를 첨부 파일로 보내드립니다.</p>
            <p>확인 후 문의 사항이 있으시면 언제든지 연락 주세요.</p>
            <br/>
            <p>감사합니다.<br/>에듀컴퍼니 드림</p>
            """.formatted(contactName, courseTitle);
    }
}
