# '찾아줘요' 프론트엔드 프로젝트 구조 가이드

**문서 버전: 1.0**
**작성일: 2025-08-26**

## 1. 개요

본 문서는 '찾아줘요' React 프로젝트의 일관성 있는 개발 환경을 위한 폴더 구조 및 컴포넌트 배치 표준안을 정의합니다. 모든 팀원은 이 가이드를 준수하여 개발을 진행해 주시기 바랍니다.

## 2. 최종 폴더 구조

프로젝트의 `src` 폴더는 역할 기반으로 다음과 같이 구성합니다.

```
src/
├── api/              # [API 호출] Axios 인스턴스, 각 기능별 API 함수
│   ├── axiosInstance.js
│   ├── postApi.js
│   └── userApi.js
│
├── components/       # [재사용 UI 조각] 여러 곳에서 쓰이는 작은 부품들
│   ├── common/       # 버튼, 모달, 페이지네이션 등 범용 컴포넌트
│   ├── post/         # 게시글 카드, 이미지 업로더 등 게시글 관련 부품
│   └── comment/      # 댓글 아이템 등 댓글 관련 부품
│
├── constants/        # [상수] API 경로, 설정 값 등 변하지 않는 값
│
├── context/          # [전역 상태] Context API 관련 파일
│   └── AuthContext.jsx
│
├── features/         # [복합 기능 단위] 여러 컴포넌트와 로직이 결합된 큰 기능
│   ├── comment/      # 댓글 목록 + 작성폼 + 로직이 합쳐진 CommentSection
│   └── post/         # 게시글 검색 필터 + 그리드 + 페이지네이션이 합쳐진 PostListFeature
│
├── hooks/            # [커스텀 훅] 재사용 가능한 로직 (예: useFetchPosts)
│
├── layouts/          # [페이지 레이아웃] 헤더, 푸터 등 공통 구조
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── MainLayout.jsx
│
├── pages/            # [페이지 단위] URL과 1:1로 매칭되는 화면
│   ├── MainPage.jsx
│   ├── PostListPage.jsx
│   ├── PostDetailPage.jsx
│   ├── PostFormPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   └── MyPage.jsx
│
├── styles/           # [스타일] 전역 CSS, 테마 등
│
├── App.jsx           # [라우팅] 최상위 라우터 설정
└── main.jsx          # [진입점] 앱 전체 렌더링 시작
```

---

## 3. 파일 교통정리 및 규칙

기존 파일들의 혼재를 막고, 앞으로의 개발 일관성을 위해 아래 규칙에 따라 파일을 재배치하고 중복을 제거합니다.

### 3.1. API 관리 (`src/api/`)

-   **`axiosInstance.js`**: `src/api/` 폴더에 위치하는 것을 원칙으로 합니다. `util` 등 다른 폴더에 생성하지 않습니다.
-   **기능별 분리**: `postApi.js`, `userApi.js` 와 같이 도메인별로 API 호출 함수를 분리하여 관리합니다.

### 3.2. 레이아웃 (`src/layouts/`)

-   **`Header.jsx`, `Footer.jsx`**: `src/components/layout`이 아닌 **`src/layouts/`** 폴더로 이동하여 `MainLayout.jsx`와 함께 관리합니다.
-   **`MainLayout.jsx`**: 모든 페이지의 공통적인 구조(헤더, 푸터, 메인 콘텐츠 영역)를 정의합니다. `react-router-dom`의 `<Outlet />`을 사용하여 자식 페이지를 렌더링합니다.
-   **`Layout.jsx` 등 중복 파일 삭제**: `MainLayout.jsx`와 역할이 겹치는 다른 레이아웃 컴포넌트는 삭제하여 혼란을 방지합니다.

### 3.3. 페이지 (`src/pages/`)

-   **정의**: 페이지는 URL 주소창의 경로와 1:1로 매칭되는 독립적인 화면 단위입니다.
-   **배치**: `MainPage`, `PostListPage` 등 모든 페이지 컴포넌트는 **`src/pages/`** 폴더에 위치합니다. `components` 폴더에 페이지 컴포넌트를 두지 않습니다.
-   **중복 제거**: `Home.jsx`, `components/post/MainPage.jsx` 등 중복되는 페이지 컴포넌트는 삭제하고, `pages/MainPage.jsx`로 통일합니다.
-   **(선택사항)** `LoginPage`, `RegisterPage` 등 기능적으로 연관된 페이지들은 `pages/auth/` 와 같이 하위 폴더로 그룹화할 수 있습니다.

### 3.4. 기능 단위 (`src/features/`)

-   **정의**: 단순 UI를 넘어, 자체적으로 API를 호출하고 상태를 관리하는 등 여러 요소가 결합된 복합적인 기능 단위입니다.
-   **예시**: `CommentComponent.jsx`는 댓글 목록 조회, 작성, 수정, 삭제 로직이 모두 포함되어 있으므로 단순 컴포-   **배치**: `src/components/comment/CommentComponent.jsx`는 **`src/features/comment/CommentSection.jsx`** 와 같이 `features` 폴더로 이동하여 역할을 명확히 합니다.

---

## 4. 최종 코드 예시

아래는 위 규칙을 모두 적용한 핵심 파일의 최종 구조입니다.

### `src/App.jsx`

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from "./layouts/MainLayout";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyPage from './pages/MyPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages- /PostDetailPage';
import PostFormPage from './pages/PostFormPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="mypage" element={<MyPage />} />
                
                {/* 게시판 라우트 */}
                <Route path="board/:type" element={<PostListPage />} />
                <Route path="post/:postId" element={<PostDetailPage />} />
                <Route path="post/new" element={<PostFormPage />} />
                <Route path="post/edit/:postId" element={<PostFormPage />} />
            </Route>
        </Routes>
    );
}

export default App;
```

### `src/layouts/MainLayout.jsx`

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
    return (
        // flex를 이용해 푸터를 항상 하단에 고정하는 CSS 적용
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
```