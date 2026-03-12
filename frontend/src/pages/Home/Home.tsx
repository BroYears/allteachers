import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles (already imported globally in main.tsx, but good practice if modularized)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home: React.FC = () => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (!swiperRef) return;
        if (isPlaying) {
            swiperRef.autoplay.stop();
        } else {
            swiperRef.autoplay.start();
        }
        setIsPlaying(!isPlaying);
    };
    // Dummy data arrays for `.map()` rendering
    const categories = [
        {
            title: "영어 일반회화",
            subjects: ["일반회화 초급", "일반회화 중급", "비지니스 프리토킹", "원어민 회화 마스터"]
        },
        {
            title: "중국어 일반회화",
            subjects: ["HSK 기초", "비지니스 중국어", "TSC 준비반", "원어민 발음 교정"]
        },
        {
            title: "일본어 일반회화",
            subjects: ["히라가나/가타카나 완전정복", "JLPT 대비반", "비지니스 일본어", "일본어 프리토킹"]
        },
        {
            title: "영어 자격증",
            subjects: ["TOEIC 700+ 목표반", "TOEIC 900+ 실전반", "OPIc AL 목표반", "TOEFL 기초반"]
        },
        {
            title: "직무강의",
            subjects: ["파이썬 기초", "엑셀 기획서 작성", "리더십 커뮤니케이션", "스프링부트 실전 마스터"]
        }
    ];

    const companies = [
        "삼성전자", "현대자동차", "SK텔레콤", "LG전자", 
        "네이버", "카카오", "쿠팡", "배달의민족", 
        "토스", "당근마켓", "넥슨", "엔씨소프트"
    ];

    return (
        <div id="contents" className="contents main">
            <div className="page_con">
                <div className="main_wrap">
                    
                    {/* Swiper React component - className goes on Swiper's own generated div which is position:relative */}
                    <Swiper
                        className="mainSwiper"
                        onSwiper={setSwiperRef}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={16}
                        slidesPerView={1.15}
                        centeredSlides={true}
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
                        loop={true}
                    >
                        <SwiperSlide className="swiper-slide1">
                            <div className="swiper-slide-content">
                                <h4>AI 2.0 설계 로드맵</h4>
                                <h2>최대 78% 할인전!</h2>
                                <p>(~3/15) 딱 10일 한정 역대급 할인으로<br/>AI 2.0으로 즉시 전환해 보세요!</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide2">
                            <div className="swiper-slide-content">
                                <h4>외국어 마스터 과정</h4>
                                <h2>원어민처럼 말하기</h2>
                                <p>비즈니스부터 일상 회화까지<br/>전문 강사진과 함께하는 맞춤 교육</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide3">
                            <div className="swiper-slide-content">
                                <h4>주요 기업 채용 정보</h4>
                                <h2>취업 필수 자격증</h2>
                                <p>대기업 입사 지원을 위한 필수 코스<br/>단기간 고득점 달성을 보장합니다!</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        {/* Duplicate slides so loop mode always has neighbors on both sides */}
                        <SwiperSlide className="swiper-slide1">
                            <div className="swiper-slide-content">
                                <h4>AI 2.0 설계 로드맵</h4>
                                <h2>최대 78% 할인전!</h2>
                                <p>(~3/15) 딱 10일 한정 역대급 할인으로<br/>AI 2.0으로 즉시 전환해 보세요!</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide2">
                            <div className="swiper-slide-content">
                                <h4>외국어 마스터 과정</h4>
                                <h2>원어민처럼 말하기</h2>
                                <p>비즈니스부터 일상 회화까지<br/>전문 강사진과 함께하는 맞춤 교육</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide3">
                            <div className="swiper-slide-content">
                                <h4>주요 기업 채용 정보</h4>
                                <h2>취업 필수 자격증</h2>
                                <p>대기업 입사 지원을 위한 필수 코스<br/>단기간 고득점 달성을 보장합니다!</p>
                                <Link to="#!">자세히 보기 &gt;</Link>
                            </div>
                        </SwiperSlide>
                        {/* Controls inside Swiper - positioned absolute via .mainSwiper (position:relative from Swiper library) */}
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

                    {/* Main Content Categories */}
                    <div className="main_con">
                        <div className="container">
                            <div className="category-container">
                                {categories.map((category, idx) => (
                                    <div className="category-group" key={idx}>
                                        <div className="category-header">
                                            <h3>{category.title}</h3>
                                            <Link to="#!" className="more-link">더보기 &gt;</Link>
                                        </div>
                                        <ul className="subject-list">
                                            {category.subjects.map((subject, sIdx) => (
                                                <li className="subject-item" key={sIdx}>
                                                    <Link to="/education/course-detail/1" className="subject">
                                                        <div className="view"></div>
                                                        <div className="subject-title">{subject}</div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Companies Slider */}
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
                                    320: { slidesPerView: 2 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 6 },
                                    1440: { slidesPerView: 8 },
                                }}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                loop={true}
                            >
                                {companies.map((company, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="swiper-image">
                                            {company}
                                        </div>
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
