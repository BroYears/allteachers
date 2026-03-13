package kr.co.allteachers.attendance.entity;

/**
 * 통합 출석 상태 코드
 * Excel 표시값과 DB 저장값 매핑
 */
public enum AttendanceStatus {
    O,       // 출석
    O_M,     // 보강출석  O(M)
    O_S,     // 보강수업  O(S)
    ABSENT,  // 결석      B
    X_R,     // 정기취소  X(R)
    X_T,     // 강사취소  X(T)
    X_S,     // 학생취소  - or X(S)
    H,       // 공휴일    H
    V;       // 휴가      V

    /** Excel 셀에 표시할 문자열 */
    public String toExcelLabel() {
        return switch (this) {
            case O      -> "O";
            case O_M    -> "O(M)";
            case O_S    -> "O(S)";
            case ABSENT -> "B";
            case X_R    -> "X(R)";
            case X_T    -> "X(T)";
            case X_S    -> "-";
            case H      -> "H";
            case V      -> "V";
        };
    }
}
