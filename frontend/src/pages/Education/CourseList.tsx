import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CourseCard from '../../components/CourseCard';

const CourseList: React.FC = () => {
    // Array to hold multiple selected tabs. Empty implies 'All' are selected.
    const [activeTabs, setActiveTabs] = useState<string[]>([]);
    const { "*": pathParam } = useParams();
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('과정안내');
    const [activePathKey, setActivePathKey] = useState<string>('');

    // Dynamic Tab Mapping
    const routeTabsMap: Record<string, { id: string, label: string }[]> = {
        "job/ai": [ { "id": "ai-deeplearning", "label": "딥러닝" }, { "id": "ai-chatgpt", "label": "ChatGPT" } ],
        "job/business-planning": [ { "id": "business-plan", "label": "사업기획" }, { "id": "business-hr", "label": "인사관리" }, { "id": "business-finance", "label": "재무/회계" } ],
        "job/career": [ { "id": "career-job", "label": "취업" }, { "id": "career-startup", "label": "창업" } ],
        "job/data-science": [ { "id": "data-analysis", "label": "데이터분석" }, { "id": "data-ml", "label": "머신러닝" } ],
        "job/design": [ { "id": "design-tool", "label": "디자인툴" }, { "id": "design-graphic", "label": "그래픽디자인" }, { "id": "design-uiux", "label": "UX/UI" } ],
        "job/leadership": [ { "id": "leadership", "label": "리더십" }, { "id": "leadership-comm", "label": "조직커뮤니케이션" } ],
        "job/marketing": [ { "id": "digital", "label": "디지털마케팅" }, { "id": "content", "label": "콘텐츠마케팅" } ],
        "job/media": [ { "id": "video", "label": "영상/사진" }, { "id": "motion", "label": "모션그래픽" } ],
        "job/path": [ { "id": "university", "label": "대학 대상" }, { "id": "middlehigh", "label": "중고등 대상" }, { "id": "elementary", "label": "초등생 대상" } ],
        "job/productivity": [ { "id": "excel", "label": "엑셀/VBA" }, { "id": "ppt", "label": "PPT/보고서" }, { "id": "writing", "label": "글쓰기" } ],
        "job/programming": [ { "id": "programming-fe", "label": "프론트엔드" }, { "id": "programming-be", "label": "백엔드" }, { "id": "programming-app", "label": "앱개발" }, { "id": "programming-game", "label": "게임개발" } ],
        "job/sales-service": [ { "id": "sales-main", "label": "영업" }, { "id": "sales-service", "label": "서비스" } ],
        "language/business-chinese": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/business-english": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/business-japanese": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/chinese-certificate": [ { "id": "cert-hsk", "label": "HSK" }, { "id": "cert-tsc", "label": "TSC" }, { "id": "cert-etc", "label": "기타 자격증" } ],
        "language/chinese-conversation": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/english-certificate": [ { "id": "cert-toeic", "label": "토익" }, { "id": "cert-toeic-speaking", "label": "토익스피킹" }, { "id": "cert-toefl", "label": "토플" }, { "id": "cert-opic", "label": "오픽" }, { "id": "cert-etc", "label": "기타 자격증" } ],
        "language/english-conversation": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/japanese-certificate": [ { "id": "cert-jlpt", "label": "JLPT" }, { "id": "cert-jpt-sjpt", "label": "JPT/SJPT" }, { "id": "cert-etc", "label": "기타 자격증" } ],
        "language/japanese-conversation": [ { "id": "basic", "label": "입문회화" }, { "id": "elementary", "label": "초급회화" }, { "id": "intermediate", "label": "중급회화" }, { "id": "advanced", "label": "고급회화" } ],
        "language/second-language": [ { "id": "spanish", "label": "스페인어" }, { "id": "portuguese", "label": "포르투갈어" }, { "id": "french", "label": "프랑스어" }, { "id": "russian", "label": "러시아어" }, { "id": "german", "label": "독일어" }, { "id": "vietnamese", "label": "베트남어" }, { "id": "indonesian", "label": "인니어" }, { "id": "thai", "label": "태국어" }, { "id": "arabic", "label": "아랍어" }, { "id": "korean", "label": "한국어" } ],
        "subject/character-growth": [ { "id": "teen", "label": "중등/고등" }, { "id": "child", "label": "유아/초등" } ],
        "subject/concept-knowledge": [ { "id": "preschool", "label": "유아" }, { "id": "elementary", "label": "초등" } ],
        "subject/english-elementary": [ { "id": "preschool", "label": "유아" }, { "id": "elementary", "label": "초등" } ],
        "subject/environment-safety": [ { "id": "preschool", "label": "유아" }, { "id": "elementary", "label": "초등" } ],
        "subject/korean-elementary": [ { "id": "preschool", "label": "유아" }, { "id": "elementary", "label": "초등" } ],
        "subject/liberal-arts": [ { "id": "teen", "label": "중등/고등" }, { "id": "child", "label": "유아/초등" } ],
        "subject/major-deepening": [ { "id": "humanities", "label": "인문계" }, { "id": "science", "label": "이공계" }, { "id": "social", "label": "사회계" }, { "id": "business", "label": "경상계" }, { "id": "arts", "label": "예체능계" } ],
        "subject/science-explore": [ { "id": "preschool", "label": "유아" }, { "id": "elementary", "label": "초등" } ],
        "subject/social-economy": [ { "id": "social", "label": "사회" }, { "id": "economy", "label": "경제" } ],
        "subject/thesis-english": [ { "id": "thesis", "label": "논문" }, { "id": "english-thesis", "label": "영어논문" } ]
    };

    useEffect(() => {
        // Exact mapping based on Header.tsx URL paths
        const routeTitleMap: Record<string, string> = {
            'language/english-conversation': '영어회화',
            'language/business-english': '비지니스 영어',
            'language/english-certificate': '영어 자격증',
            'language/chinese-conversation': '중국어회화',
            'language/business-chinese': '비지니스 중국어',
            'language/chinese-certificate': '중국어 자격증',
            'language/japanese-conversation': '일본어회화',
            'language/business-japanese': '비지니스 일본어',
            'language/japanese-certificate': '일본어 자격증',
            'language/second-language': '제2외국어',
            'job/ai': 'AI인공지능',
            'job/programming': '프로그래밍',
            'job/data-science': '데이터사이언스',
            'job/leadership': '리더십/커뮤니케이션',
            'job/sales-service': '영업/서비스',
            'job/business-planning': '비지니스/기획',
            'job/productivity': '업무 생산성',
            'job/marketing': '마케팅',
            'job/design': '디자인',
            'job/media': '영상/미디어',
            'job/career': '취업/창업',
            'job/path': '진로/적성',
            'subject/thesis-english': '논문/영어논문',
            'subject/major-deepening': '전공심화',
            'subject/english-elementary': '영어',
            'subject/korean-elementary': '국어'
        };

        const path = pathParam || location.pathname;
        
        // Find matching title if the URL contains the exact map key
        let matchedTitle = '과정안내';
        let currentKey = '';
        for (const [key, title] of Object.entries(routeTitleMap)) {
            if (path.includes(key)) {
                matchedTitle = title;
                currentKey = key;
                break;
            }
        }
        setPageTitle(matchedTitle);
        setActivePathKey(currentKey);
        // Reset selected tabs when route changes to avoid invalid filters
        setActiveTabs([]);
    }, [pathParam, location.pathname]);

    const toggleTab = (tabValue: string) => {
        if (tabValue === 'all') {
            setActiveTabs([]);
        } else {
            setActiveTabs((prev) => {
                if (prev.includes(tabValue)) {
                    return prev.filter(t => t !== tabValue);
                } else {
                    return [...prev, tabValue];
                }
            });
        }
    };

    const isTabActive = (tabValue: string) => {
        if (tabValue === 'all') return activeTabs.length === 0;
        return activeTabs.includes(tabValue);
    };

    // Mock data based on the extracted HTML structure
    const mockCourses = [
        { id: 1, category: 'basic', title: '입문1' },
        { id: 2, category: 'basic', title: '입문2' },
        { id: 3, category: 'basic', title: '입문3' },
        { id: 4, category: 'basic', title: '입문4' },
        { id: 5, category: 'basic', title: '입문5' },
        { id: 6, category: 'basic', title: '입문6' },
        { id: 7, category: 'basic', title: '입문7' },
        { id: 8, category: 'basic', title: '입문8' },
        { id: 9, category: 'basic', title: '입문9' },
        { id: 10, category: 'elementary', title: '패턴1' },
        { id: 11, category: 'elementary', title: '패턴2' },
        { id: 12, category: 'elementary', title: '패턴3' },
        { id: 13, category: 'elementary', title: '패턴4' },
        { id: 14, category: 'elementary', title: '패턴5' },
        { id: 15, category: 'intermediate', title: '중급1' },
        { id: 16, category: 'intermediate', title: '중급2' },
        { id: 17, category: 'intermediate', title: '중급3' },
        { id: 18, category: 'intermediate', title: '중급4' },
        { id: 19, category: 'intermediate', title: '중급5' },
        { id: 20, category: 'intermediate', title: '중급6' },
        { id: 21, category: 'intermediate', title: '중급7' },
        { id: 22, category: 'advanced', title: '고급1' },
        { id: 23, category: 'advanced', title: '고급2' },
        { id: 24, category: 'advanced', title: '고급3' },
        { id: 25, category: 'advanced', title: '고급4' },
        { id: 26, category: 'advanced', title: '고급5' },
        { id: 27, category: 'advanced', title: '고급6' }
    ];

    // Filter courses based on active tabs array
    const filteredCourses = activeTabs.length === 0 
        ? mockCourses 
        : mockCourses.filter(course => activeTabs.includes(course.category));

    return (
        <div className="contents education course-list">
            {/* Top Banner */}
            <div className="top_banner"></div>
            
            <div className="course-title">
                <div className="container">
                    <h3 className="page_tit">
                        <span>{pageTitle}</span>
                    </h3>
                </div>
            </div>
            
            {/* Tab Menu */}
            <div className="category-tabs">
                <ul>
                    <li>
                        <button 
                            type="button" 
                            className={`tab-item course-tab ${isTabActive('all') ? 'active' : ''}`}
                            onClick={() => toggleTab('all')}
                        >
                            전체
                        </button>
                    </li>
                    {activePathKey && routeTabsMap[activePathKey] && routeTabsMap[activePathKey].map(tab => (
                        <li key={tab.id}>
                            <button 
                                type="button" 
                                className={`tab-item course-tab ${isTabActive(tab.id) ? 'active' : ''}`}
                                onClick={() => toggleTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="tab-contents">
                <div className="container">
                    <div className="tab-content active">
                        <div className="course-list">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map(course => (
                                    <CourseCard 
                                        key={course.id}
                                        id={course.id}
                                        category={course.category}
                                        title={course.title}
                                    />
                                ))
                            ) : (
                                <div style={{ padding: '50px', textAlign: 'center', width: '100%' }}>
                                    해당 카테고리의 강의가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseList;
