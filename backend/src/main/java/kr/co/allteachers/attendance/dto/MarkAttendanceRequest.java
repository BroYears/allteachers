package kr.co.allteachers.attendance.dto;

import jakarta.validation.constraints.NotNull;
import kr.co.allteachers.attendance.entity.AttendanceStatus;

public record MarkAttendanceRequest(
    @NotNull Long userId,
    @NotNull Long offlineSessionId,
    @NotNull AttendanceStatus status,
    String note
) {}
