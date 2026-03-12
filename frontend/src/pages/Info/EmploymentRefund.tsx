import React from 'react';
import { useScrollFade } from '../../hooks/useScrollFade';

const EmploymentRefund: React.FC = () => {
    useScrollFade();
    return (
        <div className="contents employment-refund">
            {/* Top Banner */}
            <div className="top_banner">
                <div className="dim"></div>
                <div className="top-title">
                    <h2 className="title">고용보험 환급안내</h2>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <section className="refund-wrapper">
                    <div className="title-wrap scroll-fade">
                        <h2 className="title">01 고용보험 환급 가능 직무 교육</h2>
                    </div>
                    <div className="content-wrap scroll-fade">
                        <h3 className="sub-title">
                            <span className="icon1"></span>
                            <span className="tit">사업주 직업능력개발훈련의 종류</span>
                        </h3>
                        <ol className="desc-list">
                            <li>1. 훈련주체에 따라 : 자체훈련, 위탁훈련
                                <span>사업주가 외부강사를 초빙하더라도, 훈련계획수립, 훈련실시, 훈련생관리 등을
                                    직접 수행하면 자체훈련에 해당</span>
                            </li>
                            <li>2. 훈련대상(내용)에 따라 : 양성훈련, 향상훈련, 전직훈련</li>
                            <li>3. 훈련방법에 따라 : 집체훈련, 인터넷훈련, 혼합훈련</li>
                        </ol>
                    </div>
                    <div className="content-wrap scroll-fade">
                        <h3 className="sub-title">
                            <span className="icon2"></span>
                            <span className="tit">신청서류대행서비스 (무상제공)</span>
                        </h3>
                        <div className="desc-box">
                            <strong className="question">Q1. 과정인정 시 필수 제출서류는?</strong>
                            <ul className="desc-list">
                                <li>시간표</li>
                                <li>훈련강사 증빙서류</li>
                                <li>훈련시설 증빙서류</li>
                                <li>훈련교재</li>
                            </ul>
                            <p className="notice">*인사담당자의 고용보험환급과정 신청에 대한 부담을 대폭 줄여 드립니다.</p>
                        </div>
                    </div>
                    <div className="content-box scroll-fade">
                        <p>정부지원금 = 직종별훈련비용기준단가 x 훈련시간 x 수료인원 x 사업주규모별훈련과정 훈련비 지원율(직무법정의무·외국어 등 훈련 시 50%)</p>
                    </div>
                    <div className="refund-table-wrap scroll-fade">
                        <table className="refund-table">
                            <thead>
                                <tr>
                                    <th>훈련구분</th>
                                    <th>우선지원대상기업 지원율</th>
                                    <th>1,000인 미만 대규모기업 지원율</th>
                                    <th>1,000인 이상 대규모기업 지원율</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>기본직무훈련</td>
                                    <td>
                                        자체훈련 100%<br/>
                                        위탁훈련 90%<br/>
                                        스마트훈련 95%
                                    </td>
                                    <td>
                                        집체훈련 60%<br/>
                                        원격훈련 80%<br/>
                                        스마트훈련 90%
                                    </td>
                                    <td>
                                        집체훈련 40%<br/>
                                        원격훈련 40%<br/>
                                        스마트훈련 60%
                                    </td>
                                </tr>
                                <tr>
                                    <td>직무법정훈련 일반 외국어 훈련</td>
                                    <td>50%</td>
                                    <td>
                                        집체훈련 30%<br/>
                                        원격훈련 40%
                                    </td>
                                    <td>
                                        집체훈련 20%<br/>
                                        원격훈련 20%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="notice letter-spacing scroll-fade">* 기업별 연간지원한도 : 사업주가 납부한 해당연도 고용보험료 중 고용안정/직업능력개발사업 보험료(개산보험료)의
                        100%, 우선지원기업은 240% - 이 금액이 지원한도 최소금액(500만원)에 미달하는 경우 500만원까지 지원</p>
                </section>
                
                <section className="change-wrapper">
                    <div className="title-wrap scroll-fade">
                        <h2 className="title">02 고용보험조건 완화</h2>
                        <p className="sub-title">사업주훈련이 이렇게 달라집니다<br/>(규제근로 대폭 완화)</p>
                    </div>
                    <div className="content-wrap change">
                        <div className="change-list scroll-fade">
                            <h4>01 기업규모에 상관없이 최소훈련시간이 4시간으로 축소됩니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">2022년 2일 이상, 16시간 이상<br/>
                                        (우선지원대상기업 1일 이상, 8시간 이상)</p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">4시간 이상<br/>
                                        * 기업규모에 따른 차등 폐지</p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>02 원격훈련 평가방식이 다양화됩니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">
                                        •2단계 평가(진행단계평가, 최종평가) 실시<br/>
                                        •수료기준 60점 이상<br/>
                                        •평가(시험) 재응시 제한<br/>
                                        •선다형문제 평가만 인정
                                    </p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">훈련기관 재량에 따른 평가 허용</p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>03 원격훈련 교·강사 인정요건이 완화됩니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">
                                        •관련분야 석사학위 이상을 소지한 사람<br/>
                                        •관련분야 실무경력이 3년 이상인 사람<br/>
                                        •관련분야의 법 제33조에 따른 직업능력개발 훈련교사
                                    </p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">근로자 직업능력개발법<br/>
                                        시행령 제27조와 동일하게 적용</p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>04 우수 원격훈련과정 지원을 확대합니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">스마트훈련 훈련과정의 훈련비 지원금<br/>
                                        조정계수와 지원인원 한도 적용 안함</p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">
                                        스마트훈련, 신기술 분야, 기업맞춤형 훈련,<br/>
                                        A등급 등 우수 훈련과정에 대하여 조정계수,<br/>
                                        지원인원 한도 폐지
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="change-wrapper">
                    <div className="content-wrap change">
                        <div className="change-list scroll-fade">
                            <h4>05 미수료 훈련인원도 진도율에 따라 원격훈련 지원금을 지원합니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">수료율에 따른 지원방식<br/>
                                        * 80%이상 이수, 최종평가 통과</p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">
                                        진도율에 따른 지원방식 추가<br/>
                                        * 진도율 50%이상 미수료 훈련인원에<br/>
                                        대하여 진도율의 80%에 해당하는 지원금 지급
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>06 훈련요소 사전심사를 도입하여 과정인정 신청이 간편해 집니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">
                                        •동일 훈련장소, 교사, 장비 등을 활용하여<br/>
                                        여러 훈련과정을 실시 할 경우 각 과정마다<br/>
                                        증빙서류를 제출하고 별도 승인 필요<br/>
                                        •훈련개시 5일전까지 과정인정 신청
                                    </p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">
                                        •훈련교사, 장소, 장비, 교재 등<br/>
                                        훈련요소를 사전심사 받을 경우 과정인정 시<br/>
                                        해당 요건에 대한 심사를 생략<br/>
                                        •사전인정 받은 경우 훈련개시 전일까지 과정인정 신청
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>07 훈련개시 전까지 실시신고가 가능합니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">
                                        •훈련개시 전일까지 실시신고<br/>
                                        •훈련생 변동 여부에 관계없이 확정자신고 필수
                                    </p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">
                                        •훈련개시 직전까지 실시신고<br/>
                                        •확정자신고 폐지
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="change-list scroll-fade">
                            <h4>08 훈련요소를 사전 승인 받은 경우 수료보고전까지 변경신고가 가능합니다</h4>
                            <div className="change-group">
                                <div className="previous-group">
                                    <p className="previous">기존</p>
                                    <p className="desc">
                                        •훈련개시 후 훈련요소 변경사항이 발생한 경우<br/>
                                        변경예정일 전날까지 신고<br/>
                                        •훈련생 명단 변경의 경우 훈련일수에 따라<br/>
                                        최대 14일 이내 신고기간 차등화
                                    </p>
                                </div>
                                <div className="current-group">
                                    <p className="current">현재</p>
                                    <p className="desc">
                                        •훈련요소를 사전승인 받은 경우 변경사항을<br/>
                                        수료보고 전까지 자유롭게 변경하고 신고 가능<br/>
                                        (훈련생명단변경수료보고전까지가능)<br/>
                                        * 단, 변경신고승인시점부터전산출결관리가능
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="training-wrapper">
                    <div className="title-wrap scroll-fade">
                        <h2 className="title">03 사업주 직업능력 개발훈련</h2>
                    </div>
                    <div className="content-wrap scroll-fade">
                        <h3 className="sub-title">
                            <span className="tit">사업주 직업능력 개발훈련이란?</span>
                        </h3>
                        <div className="training-wrap">
                            <p className="desc-text">사업주(사업장 대표)가 소속 근로자 등의 직무수행능력을 향상시키기 위하여 훈련을 실시할 때, 이에 소요되는 비용의 일부를 지원해주는
                                제도<br/>
                                지원대상 : 고용보험이 가입된 사업장의 소속 근로자, 채용이 예정된 자 - 사업주훈련으로 인정(승인)받은 훈련에 한정</p>
                            <ul className="desc-list">
                                <li>* 기업에서 자체적으로 실시하는 자체훈련 </li>
                                <li>* 외부 훈련기관에 위탁하는 위탁훈련</li>
                                <li>훈련시간, 횟수, 장소 등의 제한 없이 훈련 운영 가능</li>
                            </ul>
                            <p className="notice">관련 법령: 고용보험법 제27조, 시행령 제41조(훈련비용의 지원), 근로자직업능력개발법 제20조, 시행령 제52조, 시행규칙, 사업주
                                직업능력개발훈련 지원규정(고시)</p>
                        </div>
                    </div>
                    <div className="training-table-wrap scroll-fade">
                        <h3 className="training-table-title">기본내용</h3>
                        <table className="training-table">
                            <thead>
                                <tr>
                                    <th scope="col">구분</th>
                                    <th scope="col">내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>참여대상</td>
                                    <td>고용보험에 가입되어 있는 사업장의 근로자 및 채용예정자, 구직자</td>
                                </tr>
                                <tr>
                                    <td>훈련시간</td>
                                    <td>최소 4시간 이상 (직무수행능력 향상과 관련된 내용)</td>
                                </tr>
                                <tr>
                                    <td>훈련장소</td>
                                    <td>업무 공간과 분리된 독립된 장소(교육장 및 회의실 등), 1인당 1.5㎡ </td>
                                </tr>
                                <tr>
                                    <td>훈련인원</td>
                                    <td>60명 이내</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EmploymentRefund;
