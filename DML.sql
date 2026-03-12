-- 관리자 계정 생성
INSERT INTO users (email, password, nickname, name, organization, role, phone, address, provider, birth_date, is_deleted, created_at)
VALUES ('admin@allteachers.io', 'admin123!', '관리자', '마스터', '에듀컴퍼니', 'ADMIN', '010-0000-0000', '서울특별시 서초구 서초대로', 'LOCAL', '1990-01-01', FALSE, NOW());

-- 사이트 전역 설정
INSERT INTO site_configs (key, value) VALUES
                                          ('BUSINESS_HOURS', '09:00 ~ 18:00'),
                                          ('COMPANY_NAME', '(주)에듀컴퍼니'),
                                          ('REPRESENTATIVE', '윤주훈'),
                                          ('BUSINESS_NUMBER', '513-87-03047'),
                                          ('CONTACT_PHONE', '02-2135-7870'),
                                          ('CONTACT_EMAIL', 'help@educompany.co.kr'),
                                          ('ADDRESS', '서울특별시 서초구 서초대로 50길 62-9 한림빌딩 3층(서초동 1567-5)'),
                                          ('COPYRIGHT', 'Copyright ©2023 (주)에듀컴퍼니 All Rights Reserved.'),
                                          ('THEME_COLOR', '#f0861a');

-- 1. 최상위 대분류 (Root Categories)
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (1, NULL, '기업교육'),
                                                            (2, NULL, '대학/대학원 교육'),
                                                            (3, NULL, '중등/고등 교육'),
                                                            (4, NULL, '유아/초등교육'),
                                                            (5, NULL, '화상교육(줌Live)'),
                                                            (6, NULL, '레벨테스트'),
                                                            (7, NULL, '수업점검');

-- 2. [기업교육] 하위 중분류
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (11, 1, '언어 교육'),
                                                            (12, 1, '직무교육');

-- 3. [기업교육-언어 교육] 하위 소분류
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (1101, 11, '영어회화'),
                                                            (1102, 11, '비즈니스 영어'),
                                                            (1103, 11, '영어 자격증'),
                                                            (1104, 11, '중국어 회화'),
                                                            (1105, 11, '비즈니스 중국어'),
                                                            (1106, 11, '중국어 자격증'),
                                                            (1107, 11, '일본어 회화'),
                                                            (1108, 11, '비즈니스 일본어'),
                                                            (1109, 11, '일본어 자격증'),
                                                            (1110, 11, '제 2외국어');

-- 4. [기업교육-직무교육] 하위 소분류
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (1201, 12, '인공지능'),
                                                            (1202, 12, '프로그래밍'),
                                                            (1203, 12, '데이터 사이언스'),
                                                            (1204, 12, '리더십/커뮤니케이션'),
                                                            (1205, 12, '영업/서비스'),
                                                            (1206, 12, '비즈니스/기획'),
                                                            (1207, 12, '업무 생산성'),
                                                            (1208, 12, '마케팅'),
                                                            (1209, 12, '디자인'),
                                                            (1210, 12, '영상/미디어');

-- 5. [대학/대학원 교육] 하위 소분류 (2번 산하)
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (201, 2, '취업/창업'),
                                                            (202, 2, '진로/적성'),
                                                            (203, 2, '논문/영어논문'),
                                                            (204, 2, '전공심화'),
                                                            (205, 2, '인공지능'),
                                                            (206, 2, '프로그래밍'),
                                                            (207, 2, '마케팅'),
                                                            (208, 2, '디자인'),
                                                            (209, 2, '영어회화'),
                                                            (210, 2, '영어 자격증');

-- 6. [중등/고등 교육] 하위 소분류 (3번 산하)
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (301, 3, '진로/적성'),
                                                            (302, 3, '취업/창업'),
                                                            (303, 3, '인공지능'),
                                                            (304, 3, '프로그래밍'),
                                                            (305, 3, '디자인'),
                                                            (306, 3, '인성/자아'),
                                                            (307, 3, '사회/경제'),
                                                            (308, 3, '인문학/교양'),
                                                            (309, 3, '영어회화'),
                                                            (310, 3, '영어자격증');

-- 7. [유아/초등 교육] 하위 소분류 (4번 산하)
INSERT INTO categories (categories_id, parent_id, name) VALUES
                                                            (401, 4, '영어'),
                                                            (402, 4, '국어'),
                                                            (403, 4, '진로/적성'),
                                                            (404, 4, '인공지능'),
                                                            (405, 4, '프로그래밍'),
                                                            (406, 4, '인성/자아'),
                                                            (407, 4, '인문학/교양'),
                                                            (408, 4, '개념/지식'),
                                                            (409, 4, '과학/탐구'),
                                                            (410, 4, '환경/안전교육');

-- 시퀀스 현재값 조정 (ID 수동 삽입 이후 자동 증가 충돌 방지)
SELECT setval('categories_categories_id_seq', (SELECT MAX(categories_id) FROM categories));


-- 8. [상세 페이지 목록] - 주요 과목별 상세 분류 (Level 4)
-- 영어회화
INSERT INTO categories (parent_id, name) VALUES
                                             (1101, '전체보기'), (1101, '입문회화'), (1101, '초급회화'), (1101, '중급회화'), (1101, '고급회화');
-- 인공지능
INSERT INTO categories (parent_id, name) VALUES
                                             (1201, '전체보기'), (1201, '딥러닝'), (1201, 'Chat GPT');
-- 프로그래밍
INSERT INTO categories (parent_id, name) VALUES
                                             (1202, '전체보기'), (1202, '프론트엔드'), (1202, '백엔드'), (1202, '앱개발'), (1202, '게임개발');
-- 마케팅
INSERT INTO categories (parent_id, name) VALUES
                                             (1208, '전체보기'), (1208, '디지털마케팅'), (1208, '콘텐츠마케팅');


-- 9. 법적 약관 초기 데이터 (Boards)
INSERT INTO boards (users_id, type, title, content, status, created_at) VALUES
                                                                            (1, 'TERMS', '이용약관', '올티쳐스 서비스 이용약관 본문입니다...', NULL, NOW()),
                                                                            (1, 'PRIVACY', '개인정보처리방침', '개인정보 처리방침 본문입니다...', NULL, NOW());

COMMIT;