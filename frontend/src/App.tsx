import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Join from './pages/Auth/Join';
import FindId from './pages/Auth/FindId';
import FindPass from './pages/Auth/FindPass';
import NoticeList from './pages/Notice/NoticeList';
import Partnership from './pages/Notice/Partnership';
import FAQ from './pages/Notice/FAQ';
import CourseList from './pages/Education/CourseList';
import CourseDetail from './pages/Education/CourseDetail';
import ZoomClassList from './pages/Education/ZoomClassList';
import LevelTest from './pages/Education/LevelTest';
import EducationGuide from './pages/Education/EducationGuide';
import MyPage from './pages/Info/MyPage';
import EmploymentRefund from './pages/Info/EmploymentRefund';
import Policy from './pages/Info/Policy';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-pass" element={<FindPass />} />
          <Route path="/notice/list" element={<NoticeList />} />
          <Route path="/notice/partnership" element={<Partnership />} />
          <Route path="/notice/faq" element={<FAQ />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/education/course-list/*" element={<CourseList />} />
          <Route path="/education/course-list" element={<CourseList />} />
          <Route path="/education/course-detail/:id" element={<CourseDetail />} />
          <Route path="/education/zoom-class-list" element={<ZoomClassList />} />
          <Route path="/education/level-test" element={<LevelTest />} />
          <Route path="/education/education-guide" element={<EducationGuide />} />
          <Route path="/info/mypage" element={<MyPage />} />
          <Route path="/info/employment-refund" element={<EmploymentRefund />} />
          <Route path="/info/policy" element={<Policy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
