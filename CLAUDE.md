# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 👤 User Profile & Learning Goals (사용자 프로필 및 답변 규칙)
- 내 이름은 형년이고, 이 프로젝트의 Java 백엔드 개발자야.
- **CS 지식 학습 중:** 컴퓨터 공학 기초와 이론을 깊이 있게 학습하고 있으니, 설명할 때 정확하고 전문적인 CS 용어, 디자인 패턴, 네트워크 지식, DB 아키텍처 명칭 등을 가감 없이 사용해 줘. 모르는 용어는 내가 직접 찾아보며 공부할 거야.
- **백엔드 중심 사고:** 프론트엔드 코드나 인프라 설정을 다룰 때도, 백엔드의 개념(예: Interceptor, Proxy, Caching, 트랜잭션 등)과 빗대어 설명해 주면 더 빠르게 이해할 수 있어.
- **답변 스타일:** 1. 두괄식으로 핵심 코드나 해결책을 먼저 제시해 줘.
    2. 수정된 부분만 파편적으로 주지 말고, 문맥을 파악할 수 있도록 적절한 범위의 전체 코드를 함께 제공해 줘.
    3. 에러 발생 시 `원인 분석 -> 해결 코드 -> CS/아키텍처 관점의 간략한 이유` 순으로 짚어 줘.
    4. 모든 설명은 반드시 한국어(Korean)로 작성해 줘. (단, 코드 문법이나 공식적인 CS/네트워크 용어는 영어를 혼용해도 무방함)
---

## 🎯 Project Overview

**AllTeachers** is a Korean online education platform backend built with Spring Boot 4. It supports video courses, live Zoom classes, user enrollment, progress tracking, and a content management board.

## 🚀 Build & Run Commands

```bash
# Build the project
./gradlew build

# Run the application
./gradlew bootRun

# Run all tests
./gradlew test

# Run a single test class
./gradlew test --tests "kr.co.allteachers.SomeTest"

# Generate QueryDSL Q-classes (run after entity changes)
./gradlew compileJava
```

## 🛠 Tech Stack

- **Java 21**, **Spring Boot 4.0.3**
- **PostgreSQL** with Spring Data JPA + **QueryDSL 5.0** (Jakarta EE 11)
- **Valkey** for session/token storage and heartbeat-based progress tracking
- **Spring Security** + **OAuth2 Client** + **JJWT 0.12.3** for auth
- **Spring Batch** for scheduled tasks (e.g., 30-day deferred account deletion)
- **AWS S3** (via Spring Cloud AWS 4.0) for VOD storage
- **Lombok** for boilerplate reduction
- **Spring Actuator** for monitoring

## 🗄 Database Schema

Core entities and their relationships (see `DDL.sql`):

- **users** — accounts with roles (`USER`, `ADMIN`), soft-delete (`is_deleted`, `deleted_at`), OAuth provider, and `has_all_access` flag for free-pass
- **categories** — 4-level self-referencing tree (root → major → minor → detail)
- **courses** — belong to a category; have episodes, enrollments, reviews
- **episodes** — video lessons with `video_url` (S3) and `duration` (seconds)
- **enrollments** — links users to courses with status (`ONGOING`, etc.)
- **progresses** — per-user per-episode playback position; updated via Redis heartbeat
- **zoom_classes** — live sessions linked to a course
- **boards** — unified board for `NOTICE`, `FAQ`, `QNA`, `POLICY`, `TERMS`, `PRIVACY`; self-referencing for replies
- **banners**, **partners**, **site_configs** — admin-managed site content

Seed data is in `DML.sql` (run after DDL). After manually inserting category IDs, the sequence must be reset:
```sql
SELECT setval('categories_categories_id_seq', (SELECT MAX(categories_id) FROM categories));
```

## 🏗 Architecture Conventions (to follow when building out)

Package structure under `kr.co.allteachers`:
- Feature-based packages (e.g., `user`, `course`, `enrollment`, `progress`, `board`)
- Each feature: `controller` → `service` → `repository` (JPA + QueryDSL)
- DTOs separate from entities; use `@Valid` with Bean Validation on request bodies

Key design points:
- **Soft delete** on `users` — always filter `is_deleted = false` in queries. (DB 설계 및 최적화 관점에서 이 조건을 잊지 말 것)
- **QueryDSL** is configured for complex queries (use Q-classes generated under `build/generated`).
- **Valkey (Redis-compatible)** is used for refresh tokens (stored in `users.refresh_token` column as fallback) and progress heartbeat.
- **Spring Batch** handles the 30-day deletion job — configure `JobLauncher` + `Step` beans accordingly.
- `categories` supports 4 depth levels; access control is extended via `categories_enrollments` for category-level subscriptions alongside course-level `enrollments`.
