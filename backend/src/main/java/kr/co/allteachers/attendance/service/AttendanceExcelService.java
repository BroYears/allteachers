package kr.co.allteachers.attendance.service;

import kr.co.allteachers.attendance.dto.AttendanceSheetDto;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AttendanceExcelService {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("MM월 dd일");
    private static final String[] DAY_KO = {"", "월", "화", "수", "목", "금", "토", "일"};

    /**
     * 이미지에서 확인된 양식과 동일한 엑셀 생성
     * 제목: [Attendance] {instructor} 강사님 {days} {level} {time}
     * 컬럼: NO. | 이름 | 날짜1(요일) | 날짜2(요일) | ...
     */
    public byte[] generate(AttendanceSheetDto sheet) throws IOException {
        try (XSSFWorkbook wb = new XSSFWorkbook()) {
            Sheet ws = wb.createSheet("출석부");

            // ── 스타일 정의 ────────────────────────────────────────────
            CellStyle headerStyle = createHeaderStyle(wb);
            CellStyle dateStyle   = createDateStyle(wb);
            CellStyle bodyStyle   = createBodyStyle(wb);
            CellStyle noteStyle   = createNoteStyle(wb);

            // ── 0행: 제목 ──────────────────────────────────────────────
            Row titleRow = ws.createRow(0);
            int totalCols = 2 + sheet.getSessions().size();
            ws.addMergedRegion(new CellRangeAddress(0, 0, 0, totalCols - 1));
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue(String.format("[Attendance] %s 강사님 %s",
                sheet.getInstructor(), sheet.getCourseTitle()));
            titleCell.setCellStyle(headerStyle);

            // ── 1행: 날짜 헤더 ─────────────────────────────────────────
            Row dateRow = ws.createRow(1);
            createStyledCell(dateRow, 0, "NO.",    dateStyle);
            createStyledCell(dateRow, 1, "이름",   dateStyle);
            for (int i = 0; i < sheet.getSessions().size(); i++) {
                AttendanceSheetDto.SessionColumn s = sheet.getSessions().get(i);
                String dateLabel = s.getDate().format(DATE_FMT);
                createStyledCell(dateRow, 2 + i, dateLabel, dateStyle);
            }

            // ── 2행: 요일 헤더 ─────────────────────────────────────────
            Row dayRow = ws.createRow(2);
            createStyledCell(dayRow, 0, "",    dateStyle);
            createStyledCell(dayRow, 1, "",    dateStyle);
            for (int i = 0; i < sheet.getSessions().size(); i++) {
                AttendanceSheetDto.SessionColumn s = sheet.getSessions().get(i);
                int dayOfWeek = s.getDate().getDayOfWeek().getValue(); // 1=Mon
                createStyledCell(dayRow, 2 + i, DAY_KO[dayOfWeek], dateStyle);
            }

            // ── 3행~: 학생 출석 ────────────────────────────────────────
            for (int r = 0; r < sheet.getStudents().size(); r++) {
                AttendanceSheetDto.StudentRow student = sheet.getStudents().get(r);
                Row row = ws.createRow(3 + r);
                createStyledCell(row, 0, String.valueOf(r + 1),   bodyStyle);
                createStyledCell(row, 1, student.getName(),        bodyStyle);
                for (int i = 0; i < sheet.getSessions().size(); i++) {
                    Long sessionId = sheet.getSessions().get(i).getSessionId();
                    String status = student.getAttendance().getOrDefault(sessionId, "");
                    createStyledCell(row, 2 + i, status, bodyStyle);
                }
            }

            // ── 마지막 행: Notes ───────────────────────────────────────
            int notesRowIdx = 3 + sheet.getStudents().size();
            Row notesLabelRow = ws.createRow(notesRowIdx);
            createStyledCell(notesLabelRow, 0, "Notes", noteStyle);
            ws.addMergedRegion(new CellRangeAddress(notesRowIdx, notesRowIdx, 0, 1));

            // 회차별 note가 있으면 해당 컬럼에 표시
            for (int i = 0; i < sheet.getSessions().size(); i++) {
                String note = sheet.getSessions().get(i).getNote();
                if (note != null && !note.isBlank()) {
                    createStyledCell(notesLabelRow, 2 + i, note, noteStyle);
                }
            }

            // 범례 행
            Row legendRow = ws.createRow(notesRowIdx + 1);
            ws.addMergedRegion(new CellRangeAddress(notesRowIdx + 1, notesRowIdx + 1, 0, totalCols - 1));
            Cell legendCell = legendRow.createCell(0);
            legendCell.setCellValue(
                "O : Attendance, O(M) : Make-up Class, O(S) : Supplementary class, " +
                "- : Student cancel, X(R) : Regular cancel, X(T) : Teacher Cancel, H(Holiday), V(Vacation)");
            legendCell.setCellStyle(noteStyle);

            // 컬럼 너비
            ws.setColumnWidth(0, 1500);
            ws.setColumnWidth(1, 4000);
            for (int i = 0; i < sheet.getSessions().size(); i++) {
                ws.setColumnWidth(2 + i, 3000);
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            wb.write(baos);
            return baos.toByteArray();
        }
    }

    // ── 스타일 헬퍼 ────────────────────────────────────────────────────────

    private CellStyle createHeaderStyle(Workbook wb) {
        CellStyle s = wb.createCellStyle();
        Font f = wb.createFont();
        f.setBold(true);
        f.setFontHeightInPoints((short) 13);
        s.setFont(f);
        s.setAlignment(HorizontalAlignment.CENTER);
        s.setVerticalAlignment(VerticalAlignment.CENTER);
        return s;
    }

    private CellStyle createDateStyle(Workbook wb) {
        CellStyle s = wb.createCellStyle();
        Font f = wb.createFont();
        f.setBold(true);
        s.setFont(f);
        s.setAlignment(HorizontalAlignment.CENTER);
        s.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        s.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        setBorder(s, BorderStyle.THIN);
        return s;
    }

    private CellStyle createBodyStyle(Workbook wb) {
        CellStyle s = wb.createCellStyle();
        s.setAlignment(HorizontalAlignment.CENTER);
        setBorder(s, BorderStyle.THIN);
        return s;
    }

    private CellStyle createNoteStyle(Workbook wb) {
        CellStyle s = wb.createCellStyle();
        s.setAlignment(HorizontalAlignment.LEFT);
        setBorder(s, BorderStyle.THIN);
        return s;
    }

    private void setBorder(CellStyle s, BorderStyle b) {
        s.setBorderTop(b); s.setBorderBottom(b);
        s.setBorderLeft(b); s.setBorderRight(b);
    }

    private void createStyledCell(Row row, int col, String value, CellStyle style) {
        Cell cell = row.createCell(col);
        cell.setCellValue(value);
        cell.setCellStyle(style);
    }
}
