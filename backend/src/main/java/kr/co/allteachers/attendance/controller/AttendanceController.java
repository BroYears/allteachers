package kr.co.allteachers.attendance.controller;

import jakarta.validation.Valid;
import kr.co.allteachers.attendance.dto.AttendanceSheetDto;
import kr.co.allteachers.attendance.dto.MarkAttendanceRequest;
import kr.co.allteachers.attendance.service.AttendanceExcelService;
import kr.co.allteachers.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final AttendanceExcelService excelService;

    /** 오프라인 출석부 조회 (강사/관리자 화면) */
    @GetMapping("/courses/{courseId}")
    public ResponseEntity<AttendanceSheetDto> getSheet(@PathVariable Long courseId) {
        return ResponseEntity.ok(attendanceService.getOfflineSheet(courseId));
    }

    /** 오프라인 수업 회차 등록 */
    @PostMapping("/sessions")
    public ResponseEntity<Void> createSession(
            @RequestParam Long courseId,
            @RequestParam LocalDate date,
            @RequestParam(defaultValue = "0") int order) {
        attendanceService.createSession(courseId, date, order);
        return ResponseEntity.ok().build();
    }

    /** 회차 메모 수정 */
    @PatchMapping("/sessions/{sessionId}/note")
    public ResponseEntity<Void> updateNote(
            @PathVariable Long sessionId,
            @RequestParam String note) {
        attendanceService.updateSessionNote(sessionId, note);
        return ResponseEntity.ok().build();
    }

    /**
     * 오프라인 출석 마킹 (강사가 호출)
     * TODO: 인증 연동 후 SecurityContextHolder에서 instructorId 추출
     */
    @PostMapping("/mark")
    public ResponseEntity<Void> mark(
            @Valid @RequestBody MarkAttendanceRequest req,
            @RequestParam Long instructorId) {
        attendanceService.markOffline(req, instructorId);
        return ResponseEntity.ok().build();
    }

    /** VOD 자동 출석 (Progress 완료 시 내부 호출) */
    @PostMapping("/auto/vod")
    public ResponseEntity<Void> markVod(
            @RequestParam Long userId,
            @RequestParam Long episodeId) {
        attendanceService.markVodAuto(userId, episodeId);
        return ResponseEntity.ok().build();
    }

    /** Zoom 자동 출석 (Zoom 접속 웹훅 수신 시 호출) */
    @PostMapping("/auto/zoom")
    public ResponseEntity<Void> markZoom(
            @RequestParam Long userId,
            @RequestParam Long zoomClassId) {
        attendanceService.markZoomAuto(userId, zoomClassId);
        return ResponseEntity.ok().build();
    }

    /** 출석부 Excel 다운로드 */
    @GetMapping("/courses/{courseId}/excel")
    public ResponseEntity<byte[]> downloadExcel(@PathVariable Long courseId) throws IOException {
        AttendanceSheetDto sheet = attendanceService.getOfflineSheet(courseId);
        byte[] bytes = excelService.generate(sheet);
        String filename = URLEncoder.encode("출석부_" + sheet.getCourseTitle() + ".xlsx",
                StandardCharsets.UTF_8).replace("+", "%20");
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + filename)
            .body(bytes);
    }
}
