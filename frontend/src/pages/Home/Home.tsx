import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CourseCard from '../../components/CourseCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ─── 타입 ─────────────────────────────────────────────────────────────────────
interface CategoryDto {
    id: number;
    name: string;
}

interface CourseDto {
    id: number;
    title: string;
    instructor: string;
    level: string;
    thumbnailUrl: string;
    price: number;
    viewCount: number;
    lessonCount: number;
    categoryName: string;
}

interface PageResponse<T> {
    content: T[];
    last: boolean;
    totalElements: number;
}

// ─── 카테고리 아이콘 매핑 ──────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, string> = {
    '영어회화':           'fa-comments',
    '비즈니스 영어':      'fa-briefcase',
    '영어 자격증':        'fa-certificate',
    '중국어 회화':        'fa-dragon',
    '비즈니스 중국어':    'fa-briefcase',
    '중국어 자격증':      'fa-certificate',
    '일본어 회화':        'fa-torii-gate',
    '비즈니스 일본어':    'fa-briefcase',
    '일본어 자격증':      'fa-certificate',
    '제 2외국어':         'fa-language',
    '인공지능':           'fa-robot',
    '프로그래밍':         'fa-code',
    '데이터 사이언스':    'fa-chart-bar',
    '리더십/커뮤니케이션':'fa-users',
    '영업/서비스':        'fa-handshake',
    '비즈니스/기획':      'fa-lightbulb',
    '업무 생산성':        'fa-bolt',
    '마케팅':             'fa-bullhorn',
    '디자인':             'fa-pen-nib',
    '영상/미디어':        'fa-video',
};

// ─── 카테고리 경로 매핑 ──────────────────────────────────────────────────────
const CATEGORY_PATHS: Record<string, string> = {
    '영어회화':           '/education/course-list/language/english-conversation',
    '비즈니스 영어':      '/education/course-list/language/business-english',
    '영어 자격증':        '/education/course-list/language/english-certificate',
    '중국어 회화':        '/education/course-list/language/chinese-conversation',
    '비즈니스 중국어':    '/education/course-list/language/business-chinese',
    '중국어 자격증':      '/education/course-list/language/chinese-certificate',
    '일본어 회화':        '/education/course-list/language/japanese-conversation',
    '비즈니스 일본어':    '/education/course-list/language/business-japanese',
    '일본어 자격증':      '/education/course-list/language/japanese-certificate',
    '제 2외국어':         '/education/course-list/language/second-language',
    '인공지능':           '/education/course-list/job/ai',
    '프로그래밍':         '/education/course-list/job/programming',
    '데이터 사이언스':    '/education/course-list/job/data-science',
    '리더십/커뮤니케이션':'/education/course-list/job/leadership',
    '영업/서비스':        '/education/course-list/job/sales-service',
    '비즈니스/기획':      '/education/course-list/job/business-planning',
    '업무 생산성':        '/education/course-list/job/productivity',
    '마케팅':             '/education/course-list/job/marketing',
    '디자인':             '/education/course-list/job/design',
    '영상/미디어':        '/education/course-list/job/media',
};

// ─── 컴포넌트 ─────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [isPlaying, setIsPlaying] = useState(true);

    const [categories, setCategories]       = useState<CategoryDto[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [catExpanded, setCatExpanded]     = useState(false);
    const catDropdownRef                    = useRef<HTMLDivElement>(null);

    const CAT_VISIBLE = 9; // 한 줄에 표시할 카테고리 수 (데스크톱 기준)

    const [popularCourses, setPopularCourses] = useState<CourseDto[]>([]);
    const [recentCourses, setRecentCourses]   = useState<CourseDto[]>([]);
    const [allCourses, setAllCourses]         = useState<CourseDto[]>([]);

    const [loading, setLoading]         = useState(true);   // 초기 skeleton
    const [popularLoading, setPopularLoading] = useState(false);
    const [allLoading, setAllLoading]   = useState(false);
    const [hasMore, setHasMore]         = useState(true);

    // IntersectionObserver에서 stale closure 방지용 refs
    const sentinelRef    = useRef<HTMLDivElement>(null);
    const pageRef        = useRef(0);
    const loadingRef     = useRef(false);
    const hasMoreRef     = useRef(true);
    const categoryIdRef  = useRef<number | null>(null);

    // ── 초기 로드: 카테고리 + 신규 강의 ────────────────────────────────────
    useEffect(() => {
        Promise.all([
            fetch('/api/categories/main').then(r => r.json()),
            fetch('/api/courses/recent?limit=6').then(r => r.json()),
        ])
            .then(([cats, recent]) => {
                setCategories(cats);
                setRecentCourses(recent);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // ── 인기 강의: 카테고리 변경 시 재요청 ─────────────────────────────────
    useEffect(() => {
        setPopularLoading(true);
        const params = new URLSearchParams({ limit: '10' });
        if (selectedCategoryId !== null) params.set('categoryId', String(selectedCategoryId));
        fetch(`/api/courses/popular?${params}`)
            .then(r => r.json())
            .then(setPopularCourses)
            .catch(console.error)
            .finally(() => setPopularLoading(false));
    }, [selectedCategoryId]);

    // ── 전체 강의 한 페이지 로드 ────────────────────────────────────────────
    const loadAllCourses = useCallback((page: number, catId: number | null, replace: boolean) => {
        if (loadingRef.current || (!hasMoreRef.current && !replace)) return;
        loadingRef.current = true;
        setAllLoading(true);

        const params = new URLSearchParams({ page: String(page), size: '12' });
        if (catId !== null) params.set('categoryId', String(catId));

        fetch(`/api/courses/list?${params}`)
            .then(r => r.json())
            .then((data: PageResponse<CourseDto>) => {
                setAllCourses(prev => replace ? data.content : [...prev, ...data.content]);
                hasMoreRef.current = !data.last;
                setHasMore(!data.last);
                pageRef.current = page + 1;
            })
            .catch(console.error)
            .finally(() => {
                loadingRef.current = false;
                setAllLoading(false);
            });
    }, []); // 의도적 empty deps — 모든 필요값을 파라미터로 전달

    // ── 카테고리 변경 → 전체 강의 초기화 후 재로드 ──────────────────────────
    useEffect(() => {
        categoryIdRef.current = selectedCategoryId;
        pageRef.current = 0;
        hasMoreRef.current = true;
        setAllCourses([]);
        setHasMore(true);
        loadAllCourses(0, selectedCategoryId, true);
    }, [selectedCategoryId, loadAllCourses]);

    // ── IntersectionObserver: sentinel 진입 시 다음 페이지 로드 ─────────────
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMoreRef.current && !loadingRef.current) {
                loadAllCourses(pageRef.current, categoryIdRef.current, false);
            }
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [loadAllCourses]); // loadAllCourses는 stable ref

    // ── 드롭다운 바깥 클릭 시 닫기 ─────────────────────────────────────────
    useEffect(() => {
        if (!catExpanded) return;
        const handler = (e: MouseEvent) => {
            if (catDropdownRef.current && !catDropdownRef.current.contains(e.target as Node)) {
                setCatExpanded(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [catExpanded]);

    const togglePlay = () => {
        if (!swiperRef) return;
        if (isPlaying) swiperRef.autoplay.stop();
        else           swiperRef.autoplay.start();
        setIsPlaying(!isPlaying);
    };

    const handleCategorySelect = (id: number | null) => {
        setSelectedCategoryId(id);
    };

    const bannerData = [
        { id: 1, title: "AI 2.0 설계 로드맵", subtitle: "최대 78% 할인전!", desc: "(~3/15) 딱 10일 한정 역대급 할인으로<br/>AI 2.0으로 즉시 전환해 보세요!", className: "swiper-slide1" },
        { id: 2, title: "외국어 마스터 과정", subtitle: "원어민처럼 말하기", desc: "비즈니스부터 일상 회화까지<br/>전문 강사진과 함께하는 맞춤 교육", className: "swiper-slide2" },
        { id: 3, title: "주요 기업 채용 정보", subtitle: "취업 필수 자격증", desc: "대기업 입사 지원을 위한 필수 코스<br/>단기간 고득점 달성을 보장합니다!", className: "swiper-slide3" }
    ];
    const doubleBanners = [...bannerData, ...bannerData]; // 3개 -> 6개로 확장 (루프 안정성)

    const companies = [
        "삼성전자", "현대자동차", "SK텔레콤", "LG전자",
        "네이버", "카카오", "쿠팡", "배달의민족",
        "토스", "당근마켓", "넥슨", "엔씨소프트"
    ];

    return (
        <div id="contents" className="contents main">
            <div className="page_con">
                <div className="main_wrap mainSwiper-wrap">

                    {/* ── 메인 배너 Swiper ───────────────────────────────── */}
                    <Swiper
                        className="mainSwiper"
                        onSwiper={setSwiperRef}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={16}
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        loop={true}
                        navigation={{
                            prevEl: '.custom-swiper-prev',
                            nextEl: '.custom-swiper-next',
                        }}
                        pagination={{
                            el: '.swiper-pagination',
                            clickable: true,
                            type: 'fraction',
                            formatFractionCurrent: (n) => ((n - 1) % 3) + 1,
                            formatFractionTotal: () => 3,
                        }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                    >
                        {doubleBanners.map((banner, idx) => (
                            <SwiperSlide key={`${banner.id}-${idx}`} className={banner.className}>
                                <div className="swiper-slide-content">
                                    <h4>{banner.title}</h4>
                                    <h2>{banner.subtitle}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: banner.desc }} />
                                    <Link to="#!">자세히 보기 &gt;</Link>
                                </div>
                            </SwiperSlide>
                        ))}

                        {/* navi-content */}
                        <div className="swiper-navi-content">
                            <div className="swiper-pagination-wrap">
                                <div className="swiper-pagination"></div>
                                <button className="swiper-button-pause" onClick={togglePlay}>
                                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                                </button>
                            </div>
                            <div className="swiper-button-wrap">
                                <div className="custom-swiper-prev"><i className="fa-solid fa-chevron-left"></i></div>
                                <div className="custom-swiper-next"><i className="fa-solid fa-chevron-right"></i></div>
                            </div>
                        </div>
                    </Swiper>

                    {/* ── 카테고리 탐색 ─────────────────────────────────── */}
                    {!loading && categories.length > 0 && (
                        <section className="main_section category-nav-section">
                            <div className="container">
                                <div className="section-header">
                                    <h2 className="section-title">
                                        <i className="fa-solid fa-layer-group"></i> 카테고리
                                    </h2>
                                </div>
                                <div className="category-nav-grid">
                                    {categories.slice(0, CAT_VISIBLE).map(cat => (
                                        <Link
                                            key={cat.id}
                                            to={CATEGORY_PATHS[cat.name] || `/education/course-list?categoryId=${cat.id}`}
                                            className="category-nav-item"
                                        >
                                            <span className="category-nav-icon">
                                                <i className={`fa-solid ${CATEGORY_ICONS[cat.name] ?? 'fa-book'}`}></i>
                                            </span>
                                            <span className="category-nav-name">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                                {categories.length > CAT_VISIBLE && (
                                    <div className="category-nav-more-wrap" ref={catDropdownRef}>
                                        <button
                                            className={`category-nav-more${catExpanded ? ' active' : ''}`}
                                            onClick={() => setCatExpanded(prev => !prev)}
                                        >
                                            <i className={`fa-solid fa-chevron-${catExpanded ? 'up' : 'down'}`}></i>
                                            {catExpanded ? '접기' : `더보기 (${categories.length - CAT_VISIBLE}개)`}
                                        </button>
                                        {catExpanded && (
                                            <div className="category-nav-dropdown">
                                                {categories.slice(CAT_VISIBLE).map(cat => (
                                                    <Link
                                                        key={cat.id}
                                                        to={CATEGORY_PATHS[cat.name] || `/education/course-list?categoryId=${cat.id}`}
                                                        className="category-nav-item"
                                                        onClick={() => setCatExpanded(false)}
                                                    >
                                                        <span className="category-nav-icon">
                                                            <i className={`fa-solid ${CATEGORY_ICONS[cat.name] ?? 'fa-book'}`}></i>
                                                        </span>
                                                        <span className="category-nav-name">{cat.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* ── 인기 강의 ──────────────────────────────────────── */}
                    <section className="main_section popular-section">
                        <div className="container">
                            {/* 카테고리 필터 탭 (인기순/전체 강의 필터용) */}
                            <div className="main-category-tabs">
                                <button
                                    className={`main-category-tab${selectedCategoryId === null ? ' active' : ''}`}
                                    onClick={() => handleCategorySelect(null)}
                                >
                                    <i className="fa-solid fa-border-all"></i>
                                    <span>전체</span>
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`main-category-tab${selectedCategoryId === cat.id ? ' active' : ''}`}
                                        onClick={() => handleCategorySelect(cat.id)}
                                    >
                                        <i className={`fa-solid ${CATEGORY_ICONS[cat.name] ?? 'fa-book'}`}></i>
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="section-header">
                                <h2 className="section-title">
                                    <i className="fa-solid fa-fire"></i> 인기 강의
                                </h2>
                                <Link
                                    to={`/education/course-list${selectedCategoryId !== null ? `?categoryId=${selectedCategoryId}` : ''}`}
                                    className="section-more"
                                >
                                    전체 보기 &gt;
                                </Link>
                            </div>

                            {loading || popularLoading ? (
                                <div className="course-grid-skeleton">
                                    {Array.from({ length: 10 }).map((_, i) => (
                                        <div key={i} className="skeleton-card" />
                                    ))}
                                </div>
                            ) : popularCourses.length > 0 ? (
                                <div className="course-grid">
                                    {popularCourses.map(c => (
                                        <CourseCard
                                            key={c.id}
                                            id={c.id}
                                            title={c.title}
                                            instructor={c.instructor}
                                            level={c.level}
                                            thumbnailUrl={c.thumbnailUrl}
                                            categoryName={c.categoryName}
                                            viewCount={c.viewCount}
                                            lessonCount={c.lessonCount}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">등록된 강의가 없습니다.</p>
                            )}
                        </div>
                    </section>

                    {/* ── 신규 등록 강의 ─────────────────────────────────── */}
                    <section className="main_section recent-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <i className="fa-solid fa-star"></i> 신규 등록 강의
                                </h2>
                                <Link to="/education/course-list" className="section-more">전체 보기 &gt;</Link>
                            </div>
                            {loading ? (
                                <div className="course-grid-skeleton course-grid-skeleton--3col">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="skeleton-card" />
                                    ))}
                                </div>
                            ) : recentCourses.length > 0 ? (
                                <div className="course-grid course-grid--3col">
                                    {recentCourses.map(c => (
                                        <CourseCard
                                            key={c.id}
                                            id={c.id}
                                            title={c.title}
                                            instructor={c.instructor}
                                            level={c.level}
                                            thumbnailUrl={c.thumbnailUrl}
                                            categoryName={c.categoryName}
                                            viewCount={c.viewCount}
                                            lessonCount={c.lessonCount}
                                            isNew={true}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">등록된 강의가 없습니다.</p>
                            )}
                        </div>
                    </section>

                    {/* ── 전체 강의 인기순 (무한스크롤) ─────────────────── */}
                    <section className="main_section all-courses-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">
                                    <i className="fa-solid fa-trophy"></i> 전체 강의
                                </h2>
                                <Link
                                    to={`/education/course-list${selectedCategoryId !== null ? `?categoryId=${selectedCategoryId}` : ''}`}
                                    className="section-more"
                                >
                                    전체 보기 &gt;
                                </Link>
                            </div>
                            <div className="course-grid">
                                {allCourses.map(c => (
                                    <CourseCard
                                        key={c.id}
                                        id={c.id}
                                        title={c.title}
                                        instructor={c.instructor}
                                        level={c.level}
                                        thumbnailUrl={c.thumbnailUrl}
                                        categoryName={c.categoryName}
                                        viewCount={c.viewCount}
                                        lessonCount={c.lessonCount}
                                    />
                                ))}
                            </div>

                            {/* 로딩 스피너 */}
                            {allLoading && (
                                <div className="infinite-loading">
                                    <span className="infinite-spinner" />
                                </div>
                            )}

                            {/* 더 이상 데이터 없음 */}
                            {!hasMore && allCourses.length > 0 && (
                                <p className="infinite-end">모든 강의를 불러왔습니다.</p>
                            )}

                            {/* IntersectionObserver sentinel */}
                            <div ref={sentinelRef} className="infinite-sentinel" />
                        </div>
                    </section>

                    {/* ── 주요 고객사 ─────────────────────────────────────── */}
                    <div className="main_con_bottom full-width">
                        <div className="companies-header-wrapper">
                            <div className="container">
                                <div className="companies-header">
                                    <h3>주요고객사</h3>
                                    <p>외국어교육 성공파트너 에듀컴퍼니와 함께하세요</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper mainBoardSwiper companies-list full-width-slider">
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={4}
                                breakpoints={{
                                    320:  { slidesPerView: 2 },
                                    768:  { slidesPerView: 4 },
                                    1024: { slidesPerView: 6 },
                                    1440: { slidesPerView: 8 },
                                }}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                loop={true}
                            >
                                {companies.map((company, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="swiper-image">{company}</div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
