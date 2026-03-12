import React from 'react';
import { useScrollFade } from '../../hooks/useScrollFade';

const EducationGuide: React.FC = () => {
    useScrollFade();
    return (
        <div className="contents education-guide">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">교육안내</h2>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="title-wrap">
                    <h2 className="title">교육안내</h2>
                </div>
                
                <div className="education-features scroll-fade">
                    <ul>
                        <li className="feature-item">
                            <div className="image-wrap">
                                <img src="/img/education/edu1.jpg" alt="올인원 서비스 이미지" />
                            </div>
                            <div className="desc-wrap">
                                <p className="tit gradient2">올인원 서비스</p>
                                <p className="desc">전문적인 교육서비스</p>
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="image-wrap">
                                <img src="/img/education/edu2.jpg" alt="원활한 학습 이미지" />
                            </div>
                            <div className="desc-wrap">
                                <p className="tit gradient3">원활한 학습</p>
                                <p className="desc">4년제 교육시스템</p>
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="image-wrap">
                                <img src="/img/education/edu3.jpg" alt="검증된 강사 이미지" />
                            </div>
                            <div className="desc-wrap">
                                <p className="tit gradient4">검증된 강사</p>
                                <p className="desc">검증된 학습 파트너</p>
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="image-wrap">
                                <img src="/img/education/edu4.jpg" alt="맞춤형 학습경험 이미지" />
                            </div>
                            <div className="desc-wrap">
                                <p className="tit gradient5">맞춤형 학습경험</p>
                                <p className="desc">수업과 교재 모두 맞춤형</p>
                            </div>
                        </li>
                        <li className="feature-item">
                            <div className="image-wrap">
                                <img src="/img/education/edu5.jpg" alt="간편한 운영 이미지" />
                            </div>
                            <div className="desc-wrap">
                                <p className="tit gradient6">간편한 운영</p>
                                <p className="desc">과정 운영 서비스 제공</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="education-types">
                    <div className="type-card scroll-fade">
                        <div className="title-wrap">
                            <h4 className="title gradient gradient1">사내 출강 교육</h4>
                            <p className="sub-title">기업 및 학습자별 맞춤형 언어/직무교육 과정 제공</p>
                        </div>
                        <div className="desc-wrap">
                            <h5 className="desc-title">언어교육</h5>
                            <ul className="desc-list">
                                <li>- 과정당 최소 주2회*1시간*3개월 이상</li>
                                <li>- 그룹(최대 10명 이내, 4~6명 권장) 및 1:1과정(임원진 등)</li>
                                <li>- 초급회화과정 · 중고급회화과정 · 비즈니스회화과정 · 프리토킹과정 · 맞춤형 과정 · 시험대비(토익/오픽 등)</li>
                            </ul>
                        </div>
                        <div className="desc-wrap">
                            <h5 className="desc-title">직무교육</h5>
                            <ul className="desc-list">
                                <li>- 과정당 최소 4시간 이상</li>
                                <li>- 최대 50명 이내(협의 가능)</li>
                                <li>- 서비스 교육 · 리더십 교육 · 조직 교육 · 직무 교육 · AI 교육</li>
                            </ul>
                        </div>
                        <p className="info-desc letter-spacing">장소 및 시간 협의가능(사내교육장, 업무시작 전 등)<br/>
                            전담매니저의 현장 관리, 현장 만족도 조사, 실물 수료증 제공, 현수막 제공 및 단체사진</p>
                    </div>

                    <div className="type-card scroll-fade delay02">
                        <div className="title-wrap">
                            <h4 className="title gradient gradient1">실시간 줌 교육</h4>
                            <p className="sub-title">장소에 구애받지 않고 언제 어디서나 교육에 참여 가능</p>
                        </div>
                        <div className="desc-wrap">
                            <h5 className="desc-title">교육특징</h5>
                            <ul className="desc-list">
                                <li>- 국내 거주 출강교육전문 A급 강사진으로 수업 진행 다양한 강사진 보유</li>
                                <li>- 학습자 별 맞춤형 프로그램 제공 수준별 회화/프리토킹/직무교육/시험대비 등</li>
                                <li>- 검증되고 선호도 높은 최신 교재 사용</li>
                                <li>- 동영상 보충수업/SNS 에러컬렉션 제공</li>
                                <li>- 전담매니저의 실시간 모니터링</li>
                                <li>- 수업 녹화본 저장</li>
                            </ul>
                        </div>
                        <p className="info-desc">줌 교육을 통해 실시간으로 소통 가능<br/>
                            화면 공유 기능을 통해 자료 등을 쉽게 공유할 수 있어 학습 효율 증가 </p>
                    </div>

                    <div className="type-card scroll-fade">
                        <div className="title-wrap">
                            <h4 className="title gradient gradient1">동영상 제작</h4>
                            <p className="sub-title">자율학습과 반복학습이 가능한 동영상 교육<br/>
                                자신의 속도에 맞춰 학습할 수 있는 뛰어난 학습 방법</p>
                        </div>
                        <div className="desc-wrap">
                            <h5 className="desc-title">교육특징</h5>
                            <ul className="desc-list">
                                <li>- 동영상제작에 최적화된 전용 스튜디오에서 진행</li>
                                <li>- 꼼꼼한 컴퓨터 사양 체크/마이크 상태 점검</li>
                                <li>- 전담매니저의 실시간 모니터링으로 영상 품질 체크</li>
                                <li>- 전문인력의 편집/자막/검수 등</li>
                            </ul>
                        </div>
                        <p className="info-desc">원하시는 강의를 VOD형태로 제작/납품</p>
                    </div>

                    <div className="type-card scroll-fade delay02">
                        <div className="title-wrap">
                            <h4 className="title gradient gradient1">블랜디드 교육</h4>
                            <p className="sub-title">학습자 상황에 맞게 온라인/오프라인 교육을 병행<br/>
                                출석률 및 실력 향상 등 블랜디드교육의 장점을 극대화</p>
                        </div>
                        <div className="desc-wrap">
                            <h5 className="desc-title">교육특징</h5>
                            <ul className="desc-list">
                                <li>- 학습자에 실력/상황에 맞는 교육 비율 및 수업스케줄 협의</li>
                                <li>- 레벨테스트 및 강사추천</li>
                                <li>- 프로그램 협의 및 교재 전달</li>
                                <li>- 수업관리 및 학사관리서비스 제공</li>
                            </ul>
                        </div>
                        <p className="info-desc">온라인동영상/전화/화상/출강/모바일학습지/채팅영어 중 선택한 멀티러닝 방식<br/>
                            *블랜디드 교육은 최소 2가지 이상 과정을 병행해야 하며, 세부수업스케줄은 협의 가능</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationGuide;
