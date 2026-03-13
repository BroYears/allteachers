-- ────────────────────────────────────────────────────────────────────────────
-- 초기화 (개발 환경 전체 재생성용)
-- CASCADE: FK 의존 순서를 신경 쓰지 않고 한 번에 삭제
-- ────────────────────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS email_send_logs        CASCADE;
DROP TABLE IF EXISTS attendance_logs        CASCADE;
DROP TABLE IF EXISTS offline_sessions       CASCADE;
DROP TABLE IF EXISTS reviews                CASCADE;
DROP TABLE IF EXISTS categories_enrollments CASCADE;
DROP TABLE IF EXISTS progresses             CASCADE;
DROP TABLE IF EXISTS zoom_classes           CASCADE;
DROP TABLE IF EXISTS boards                 CASCADE;
DROP TABLE IF EXISTS enrollments            CASCADE;
DROP TABLE IF EXISTS episodes               CASCADE;
DROP TABLE IF EXISTS courses                CASCADE;
DROP TABLE IF EXISTS banners                CASCADE;
DROP TABLE IF EXISTS partners               CASCADE;
DROP TABLE IF EXISTS site_configs           CASCADE;
DROP TABLE IF EXISTS users_profiles         CASCADE;
DROP TABLE IF EXISTS users                  CASCADE;
DROP TABLE IF EXISTS categories             CASCADE;
DROP TABLE IF EXISTS companies              CASCADE;

-- ────────────────────────────────────────────────────────────────────────────
-- 테이블 생성
-- ────────────────────────────────────────────────────────────────────────────

-- 유저
CREATE TABLE users (
    users_id        BIGSERIAL    PRIMARY KEY,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR(255),
    nickname        VARCHAR(50)  NOT NULL UNIQUE,
    phone           VARCHAR(20)  NOT NULL UNIQUE,
    role            VARCHAR(20)  NOT NULL DEFAULT 'USER'
        CONSTRAINT chk_role CHECK (role IN ('USER', 'ADMIN')),
    provider        VARCHAR(20)  NOT NULL DEFAULT 'LOCAL'
        CONSTRAINT chk_provider CHECK (provider IN ('LOCAL', 'KAKAO', 'GOOGLE', 'NAVER')),
    has_all_access  BOOLEAN      NOT NULL DEFAULT FALSE,
    is_deleted      BOOLEAN      NOT NULL DEFAULT FALSE,
    deleted_at      TIMESTAMP,

    CONSTRAINT chk_password_or_oauth
        CHECK (provider != 'LOCAL' OR password IS NOT NULL)
);

-- 유저 프로필
CREATE TABLE users_profiles (
    users_id       BIGINT PRIMARY KEY,
    belong         VARCHAR(100),
    position       VARCHAR(100),
    address        VARCHAR(255),
    address_detail VARCHAR(255),
    mailing_agreed BOOLEAN   NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_user_profiles_users
        FOREIGN KEY (users_id) REFERENCES users (users_id) ON DELETE CASCADE
);

-- 카테고리 (4-level self-referencing tree: root → major → minor → detail)
CREATE TABLE categories (
    categories_id BIGSERIAL PRIMARY KEY,
    parent_id     BIGINT NULL,
    name          VARCHAR(50) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (categories_id)
);

-- 기업 (B2B 클라이언트)
CREATE TABLE companies (
    companies_id  BIGSERIAL    PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    contact_name  VARCHAR(50)  NOT NULL,
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(20),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 강의
CREATE TABLE courses (
    courses_id      BIGSERIAL    PRIMARY KEY,
    categories_id   BIGINT       NOT NULL,
    companies_id    BIGINT,                          -- B2B 기업 연결 (NULL = 일반 강의)
    title           VARCHAR(255) NOT NULL,
    instructor      VARCHAR(150) NOT NULL,
    level           VARCHAR(20)  NOT NULL,
    thumbnail_url   TEXT         NOT NULL,
    price           NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    intro_text      TEXT,
    intro_image_url TEXT,
    textbook_name   VARCHAR(255),
    textbook_url    TEXT,
    view_count      BIGINT       NOT NULL DEFAULT 0,
    lesson_count    INTEGER      NOT NULL DEFAULT 0,
    priority        INTEGER      NOT NULL DEFAULT 0,
    is_public       BOOLEAN      NOT NULL DEFAULT TRUE,
    course_type     VARCHAR(10)  NOT NULL DEFAULT 'ONLINE'
        CONSTRAINT chk_course_type CHECK (course_type IN ('ONLINE', 'OFFLINE')),
    start_date      DATE,
    end_date        DATE,
    FOREIGN KEY (categories_id) REFERENCES categories (categories_id),
    FOREIGN KEY (companies_id)  REFERENCES companies  (companies_id)
);

-- 수강 신청
CREATE TABLE enrollments (
    enrollments_id   BIGSERIAL   PRIMARY KEY,
    users_id         BIGINT      NOT NULL,
    courses_id       BIGINT      NOT NULL,
    status           VARCHAR(20) NOT NULL DEFAULT 'ONGOING',
    expected_end_date DATE       NOT NULL,
    FOREIGN KEY (users_id)   REFERENCES users   (users_id),
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

ALTER TABLE enrollments
    ADD CONSTRAINT uq_enrollments_user_course UNIQUE (users_id, courses_id);

-- 회차 (VOD 에피소드)
CREATE TABLE episodes (
    episodes_id BIGSERIAL    PRIMARY KEY,
    courses_id  BIGINT       NOT NULL,
    title       VARCHAR(255) NOT NULL,
    video_url   TEXT         NOT NULL,
    duration    INTEGER      NOT NULL,  -- 초 단위
    priority    INTEGER      NOT NULL DEFAULT 0,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

-- 진도 (VOD 재생 위치 및 완료 여부)
CREATE TABLE progresses (
    progresses_id BIGSERIAL   PRIMARY KEY,
    users_id      BIGINT      NOT NULL,
    episodes_id   BIGINT      NOT NULL,
    last_position INTEGER     NOT NULL DEFAULT 0,
    is_done       BOOLEAN     NOT NULL DEFAULT FALSE,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id)    REFERENCES users    (users_id),
    FOREIGN KEY (episodes_id) REFERENCES episodes (episodes_id)
);

-- 줌 라이브
CREATE TABLE zoom_classes (
    zoom_classes_id BIGSERIAL    PRIMARY KEY,
    courses_id      BIGINT       NOT NULL,
    title           VARCHAR(200) NOT NULL,
    zoom_link       TEXT         NOT NULL,
    start_at        TIMESTAMPTZ  NOT NULL,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

-- 오프라인 수업 회차 (날짜별 수업 1건)
CREATE TABLE offline_sessions (
    offline_sessions_id BIGSERIAL PRIMARY KEY,
    courses_id          BIGINT    NOT NULL,
    session_date        DATE      NOT NULL,
    session_order       INTEGER   NOT NULL DEFAULT 0,
    note                TEXT,                        -- 보강 메모 등
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id),
    UNIQUE (courses_id, session_date)
);

-- 통합 출석 로그
--   session_type = OFFLINE → offline_sessions_id 사용
--   session_type = VOD     → episodes_id 사용
--   session_type = ZOOM    → zoom_classes_id 사용
CREATE TABLE attendance_logs (
    attendance_logs_id  BIGSERIAL   PRIMARY KEY,
    users_id            BIGINT      NOT NULL,
    courses_id          BIGINT      NOT NULL,
    session_type        VARCHAR(10) NOT NULL
        CONSTRAINT chk_att_session_type CHECK (session_type IN ('OFFLINE', 'VOD', 'ZOOM')),
    offline_sessions_id BIGINT,
    episodes_id         BIGINT,
    zoom_classes_id     BIGINT,
    status              VARCHAR(10) NOT NULL
        CONSTRAINT chk_att_status CHECK (
            status IN ('O', 'O_M', 'O_S', 'ABSENT', 'X_R', 'X_T', 'X_S', 'H', 'V')
        ),
    marked_by           BIGINT,                      -- NULL = 시스템 자동
    note                TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id)            REFERENCES users            (users_id),
    FOREIGN KEY (courses_id)          REFERENCES courses          (courses_id),
    FOREIGN KEY (offline_sessions_id) REFERENCES offline_sessions (offline_sessions_id),
    FOREIGN KEY (episodes_id)         REFERENCES episodes         (episodes_id),
    FOREIGN KEY (zoom_classes_id)     REFERENCES zoom_classes     (zoom_classes_id),
    FOREIGN KEY (marked_by)           REFERENCES users            (users_id)
);

-- 세션 타입별 중복 방지 (Partial Unique Index)
CREATE UNIQUE INDEX uq_att_offline ON attendance_logs (users_id, offline_sessions_id)
    WHERE offline_sessions_id IS NOT NULL;
CREATE UNIQUE INDEX uq_att_vod     ON attendance_logs (users_id, episodes_id)
    WHERE episodes_id IS NOT NULL;
CREATE UNIQUE INDEX uq_att_zoom    ON attendance_logs (users_id, zoom_classes_id)
    WHERE zoom_classes_id IS NOT NULL;

-- 이메일 발송 이력
CREATE TABLE email_send_logs (
    email_send_logs_id BIGSERIAL    PRIMARY KEY,
    courses_id         BIGINT       NOT NULL,
    recipient_email    VARCHAR(100) NOT NULL,
    recipient_name     VARCHAR(50),
    subject            VARCHAR(255) NOT NULL,
    send_status        VARCHAR(10)  NOT NULL DEFAULT 'PENDING'
        CONSTRAINT chk_send_status CHECK (send_status IN ('PENDING', 'SENT', 'FAILED')),
    sent_at            TIMESTAMPTZ,
    error_message      TEXT,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

-- 통합 게시판
CREATE TABLE boards (
    boards_id  BIGSERIAL   PRIMARY KEY,
    users_id   BIGINT      NOT NULL,
    parent_id  BIGINT,
    type       VARCHAR(30) NOT NULL,  -- NOTICE, FAQ, QNA, POLICY, TERMS, PRIVACY
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    status     VARCHAR(20),           -- QNA 답변 상태
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES boards (boards_id),
    FOREIGN KEY (users_id)  REFERENCES users  (users_id)
);

-- 배너
CREATE TABLE banners (
    banners_id    BIGSERIAL   PRIMARY KEY,
    position_name VARCHAR(20) NOT NULL,
    banner_url    TEXT        NOT NULL,
    link_url      TEXT,
    priority      INTEGER     NOT NULL DEFAULT 0,
    view_count    BIGINT      NOT NULL DEFAULT 0
);

-- 제휴사
CREATE TABLE partners (
    partners_id  BIGSERIAL    PRIMARY KEY,
    partners_url TEXT         NOT NULL,
    name         VARCHAR(100) NOT NULL,
    priority     INTEGER      NOT NULL DEFAULT 0
);

-- 사이트 설정
CREATE TABLE site_configs (
    key   VARCHAR(50) PRIMARY KEY,
    value TEXT        NOT NULL
);

-- 카테고리 권한 확장 (카테고리 단위 수강권)
CREATE TABLE categories_enrollments (
    categories_enrollments_id BIGSERIAL PRIMARY KEY,
    users_id                  BIGINT    NOT NULL,
    categories_id             BIGINT    NOT NULL,
    FOREIGN KEY (users_id)      REFERENCES users      (users_id),
    FOREIGN KEY (categories_id) REFERENCES categories (categories_id)
);

-- 리뷰
CREATE TABLE reviews (
    reviews_id BIGSERIAL  PRIMARY KEY,
    users_id   BIGINT     NOT NULL,
    courses_id BIGINT     NOT NULL,
    rating     SMALLINT   NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content    TEXT       NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id),
    FOREIGN KEY (users_id)   REFERENCES users   (users_id)
);

ALTER TABLE reviews
    ADD CONSTRAINT uq_reviews_user_course UNIQUE (users_id, courses_id);

-- ────────────────────────────────────────────────────────────────────────────
-- 시퀀스 리셋 (카테고리 수동 삽입 후 실행)
-- SELECT setval('categories_categories_id_seq', (SELECT MAX(categories_id) FROM categories));
-- ────────────────────────────────────────────────────────────────────────────
