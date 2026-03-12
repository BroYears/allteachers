-- ────────────────────────────────────────────────────────────────────────────
-- 초기화 (개발 환경 전체 재생성용)
-- CASCADE: FK 의존 순서를 신경 쓰지 않고 한 번에 삭제
-- ────────────────────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS reviews             CASCADE;
DROP TABLE IF EXISTS categories_enrollments CASCADE;
DROP TABLE IF EXISTS progresses          CASCADE;
DROP TABLE IF EXISTS zoom_classes        CASCADE;
DROP TABLE IF EXISTS boards              CASCADE;
DROP TABLE IF EXISTS enrollments         CASCADE;
DROP TABLE IF EXISTS episodes            CASCADE;
DROP TABLE IF EXISTS courses             CASCADE;
DROP TABLE IF EXISTS banners             CASCADE;
DROP TABLE IF EXISTS partners            CASCADE;
DROP TABLE IF EXISTS site_configs        CASCADE;
DROP TABLE IF EXISTS users_profiles      CASCADE;
DROP TABLE IF EXISTS users               CASCADE;
DROP TABLE IF EXISTS categories          CASCADE;

-- ────────────────────────────────────────────────────────────────────────────
-- 테이블 생성
-- ────────────────────────────────────────────────────────────────────────────

-- 유저 테이블
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

-- users
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



-- 카테고리 테이블
CREATE TABLE IF NOT EXISTS categories (
    categories_id bigserial PRIMARY KEY,
    parent_id bigint NULL, -- NULL 허용으로 수정 (최상위 분류용)
    name varchar(50) NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories (categories_id)
);

-- 강의 테이블
CREATE TABLE IF NOT EXISTS courses (
    courses_id bigserial PRIMARY KEY,
    categories_id bigint NOT NULL, -- FK 타입 수정
    title varchar(255) NOT NULL,
    instructor varchar(150) NOT NULL,
    level varchar(20) NOT NULL,
    thumbnail_url text NOT NULL,
    price numeric(12, 2) NOT NULL DEFAULT 0.00, -- 정밀도 보장 타입 수정
    intro_text text NULL,
    intro_image_url text NULL,
    textbook_name varchar(255) NULL,
    textbook_url text NULL,
    view_count bigint NOT NULL DEFAULT 0,
    lesson_count integer NOT NULL DEFAULT 0,
    priority integer NOT NULL DEFAULT 0, -- 수동 순서 관리
    is_public boolean NOT NULL DEFAULT TRUE,
    FOREIGN KEY (categories_id) REFERENCES categories (categories_id)
);

-- 수강 신청 테이블
CREATE TABLE IF NOT EXISTS enrollments (
    enrollments_id bigserial PRIMARY KEY,
    users_id bigint NOT NULL,
    courses_id bigint NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'ONGOING',
    expected_end_date date NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

ALTER TABLE enrollments
    ADD CONSTRAINT uq_enrollments_user_course UNIQUE (users_id, courses_id);

-- 회차 테이블
CREATE TABLE IF NOT EXISTS episodes (
    episodes_id bigserial PRIMARY KEY,
    courses_id bigint NOT NULL,
    title varchar(255) NOT NULL,
    video_url text NOT NULL,
    duration integer NOT NULL, -- 초 단위
    priority integer NOT NULL DEFAULT 0,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

-- 진도 테이블
CREATE TABLE IF NOT EXISTS progresses (
    progresses_id bigserial PRIMARY KEY,
    users_id bigint NOT NULL,
    episodes_id bigint NOT NULL,
    last_position integer NOT NULL DEFAULT 0,
    is_done boolean NOT NULL DEFAULT FALSE,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (episodes_id) REFERENCES episodes (episodes_id)
);

-- 줌 라이브
CREATE TABLE IF NOT EXISTS zoom_classes (
    zoom_classes_id bigserial PRIMARY KEY,
    courses_id bigint NOT NULL,
    title varchar(200) NOT NULL,
    zoom_link text NOT NULL,
    start_at timestamptz NOT NULL,
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id)
);

-- 통합 게시판
CREATE TABLE IF NOT EXISTS boards (
    boards_id bigserial PRIMARY KEY,
    users_id bigint NOT NULL,
    parent_id bigint NULL, -- NULL 허용으로 수정 (원글용)
    type varchar(30) NOT NULL, -- NOTICE, FAQ, QNA, POLICY
    title varchar(255) NOT NULL,
    content text NOT NULL,
    status varchar(20) NULL, -- QNA 답변 상태
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES boards (boards_id),
    FOREIGN KEY (users_id) REFERENCES users (users_id)
);

-- 배너 및 설정
CREATE TABLE IF NOT EXISTS banners (
    banners_id bigserial PRIMARY KEY,
    position_name varchar(20) NOT NULL,
    banner_url text NOT NULL,
    link_url text NULL,
    priority integer NOT NULL DEFAULT 0,
    view_count bigint NOT NULL DEFAULT 0
);

-- 제휴사
CREATE TABLE IF NOT EXISTS partners (
    partners_id bigserial PRIMARY KEY,
    partners_url text NOT NULL,
    name varchar(100) NOT NULL,
    priority integer NOT NULL DEFAULT 0
);

-- 사이트 설정
CREATE TABLE IF NOT EXISTS site_configs (
    key varchar(50) PRIMARY KEY,
    value text NOT NULL
);

-- 카테고리 권한 확장
CREATE TABLE IF NOT EXISTS categories_enrollments (
    categories_enrollments_id bigserial PRIMARY KEY,
    users_id bigint NOT NULL,
    categories_id bigint NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users (users_id),
    FOREIGN KEY (categories_id) REFERENCES categories (categories_id)
);

-- 리뷰
CREATE TABLE IF NOT EXISTS reviews (
    reviews_id bigserial PRIMARY KEY,
    users_id bigint NOT NULL,
    courses_id bigint NOT NULL,
    rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 오타 수정
    FOREIGN KEY (courses_id) REFERENCES courses (courses_id),
    FOREIGN KEY (users_id) REFERENCES users (users_id)
);

ALTER TABLE reviews
    ADD CONSTRAINT uq_reviews_user_course UNIQUE (users_id, courses_id);

