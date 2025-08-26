import React from 'react';
import { Outlet } from 'react-router-dom';
// import Header from '../components/layout/Header.jsx';
// import Footer from '../components/layout/Footer';
import Header from '../components/Header'; // 헤더 컴포넌트 경로

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main style={{ padding: '20px' }}> {/* 콘텐츠 영역 스타일링 */}
                {/* 여기에 App.jsx의 자식 라우트들이 렌더링됩니다. */}
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;
