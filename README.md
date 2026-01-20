# 📝 To-Do Manager

심플하고 모던한 할일 관리 웹앱입니다. React와 Vite를 기반으로 제작되었습니다.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 주요 기능

### 📋 할일 관리
- **추가/수정/삭제**: 할일을 쉽게 추가하고 관리할 수 있습니다
- **완료 체크**: 클릭 한 번으로 할일 완료 처리
- **날짜 & 시간 설정**: 기한을 날짜와 시간으로 설정 가능

### 📁 폴더 시스템
- 비슷한 유형의 할일을 폴더로 그룹화
- 기본 폴더: 업무, 개인, 공부
- 새 폴더 추가 및 색상 커스터마이징 가능

### 🗂️ 카테고리 탭
| 탭 | 설명 |
|---|---|
| 전체 | 모든 할일 보기 |
| 오늘 | 오늘 마감인 할일 |
| 이번주 | 이번 주 내 마감인 할일 |
| 나중에 | 이번 주 이후 또는 날짜 미설정 |

### 📊 대시보드
- 오늘의 일정 요약
- 완료/대기 중인 할일 수 표시
- 시간대별 인사말

### 💾 데이터 영속성
- LocalStorage를 이용한 자동 저장
- 새로고침해도 데이터 유지

### 📱 반응형 디자인
- 데스크톱, 태블릿, 모바일 지원
- 모바일에서 햄버거 메뉴로 자동 전환

## 🎨 디자인

- **스타일**: 심플하고 모던한 UI
- **색상**: 흰색 배경 + 파스텔 톤 포인트 색상
- **폴더 색상**: 각 폴더별 다른 파스텔 색상 적용
- **애니메이션**: hover 시 부드러운 트랜지션 효과

### 컬러 팔레트
```
Primary:     #74B9FF (소프트 블루)
업무 폴더:    #FFB3BA (파스텔 핑크)
개인 폴더:    #BAFFC9 (파스텔 그린)
공부 폴더:    #BAE1FF (파스텔 스카이)
```

## 🚀 시작하기

### 필수 조건
- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/kangkl3123/TodoApp.git

# 디렉토리 이동
cd TodoApp

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📂 프로젝트 구조

```
todo-manager/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # 오늘의 일정 대시보드
│   │   ├── TodoList.jsx       # 할일 목록 컴포넌트
│   │   ├── TodoItem.jsx       # 개별 할일 항목
│   │   ├── TodoForm.jsx       # 할일 추가/수정 모달
│   │   ├── CategoryTabs.jsx   # 카테고리 탭 (오늘/이번주/나중에)
│   │   ├── FolderSidebar.jsx  # 폴더 사이드바
│   │   └── FolderManager.jsx  # 폴더 추가/수정 모달
│   ├── hooks/
│   │   ├── useLocalStorage.js # LocalStorage 커스텀 훅
│   │   └── useTodos.js        # 할일/폴더 상태 관리 훅
│   ├── utils/
│   │   └── dateUtils.js       # 날짜 관련 유틸리티 함수
│   ├── styles/
│   │   └── index.css          # 전역 스타일 (CSS Variables)
│   ├── App.jsx                # 메인 앱 컴포넌트
│   └── main.jsx               # 엔트리 포인트
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | React 18, JavaScript (ES6+) |
| **Build Tool** | Vite 5 |
| **Styling** | CSS3, CSS Variables |
| **Date Library** | date-fns |
| **ID Generation** | uuid |
| **Storage** | LocalStorage API |

## 📝 데이터 구조

### Todo 항목
```javascript
{
  id: "uuid",
  title: "할일 제목",
  memo: "메모 내용",
  dueDate: "2026-01-20",
  dueTime: "14:00",
  folderId: "folder-uuid",
  completed: false,
  createdAt: "2026-01-20T06:00:00.000Z"
}
```

### 폴더
```javascript
{
  id: "folder-uuid",
  name: "업무",
  color: "#FFB3BA"
}
```

## 🖼️ 스크린샷

### 데스크톱
- 사이드바 + 메인 콘텐츠 레이아웃
- 대시보드에서 오늘의 일정 한눈에 확인

### 모바일
- 햄버거 메뉴로 사이드바 토글
- 터치 친화적인 UI

## 📄 라이선스

MIT License

## 👤 Author

**kangkl3123**

- GitHub: [@kangkl3123](https://github.com/kangkl3123)
