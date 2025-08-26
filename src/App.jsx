
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';

import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';

import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />

            {/* ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ */}
            {/* 게시판 목록 페이지 (동적 라우트) */}
            {/* :type 부분에 'missing' 또는 'shelter'가 동적으로 들어옵니다. */}
            <Route path="board/:type" element={<PostListPage />} />

            {/* 게시글 상세 페이지 */}
            <Route path="post/:postId" element={<PostDetailPage />} />

            {/* 게시글 작성 및 수정 페이지 (향후 PostFormPage로 교체 예정) */}
            <Route path="post/new" element={<h1>게시글 작성 페이지</h1>} />
            <Route path="post/edit/:postId" element={<h1>게시글 수정 페이지</h1>} />
            {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
        </Route>
        </Routes>

    );
}

export default App;