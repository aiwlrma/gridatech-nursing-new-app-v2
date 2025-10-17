# New App

React Native와 Expo를 사용하여 개발된 iOS 앱입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js (v16 이상)
- npm 또는 yarn
- Expo CLI
- iOS Simulator (macOS) 또는 실제 iOS 기기

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. Expo 개발 서버 시작:
```bash
npm start
```

3. iOS에서 실행:
```bash
npm run ios
```

## 📱 기능

- **홈 화면**: 앱의 메인 화면
- **검색 화면**: 실시간 검색 기능
- **프로필 화면**: 사용자 정보 관리

## 🛠 기술 스택

- **React Native**: 크로스 플랫폼 모바일 앱 개발
- **Expo**: React Native 개발 플랫폼
- **TypeScript**: 타입 안전성
- **React Navigation**: 네비게이션 관리
- **React Native SVG**: SVG 아이콘 지원
- **Expo Vector Icons**: 아이콘 라이브러리

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Icon.tsx
│   └── index.ts
├── screens/            # 화면 컴포넌트
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── ProfileScreen.tsx
│   └── index.ts
├── navigation/         # 네비게이션 설정
├── utils/             # 유틸리티 함수
├── types/             # TypeScript 타입 정의
└── constants/         # 상수 정의
```

## 🎨 디자인 시스템

앱은 일관된 디자인 시스템을 사용합니다:

- **색상**: iOS 디자인 가이드라인을 따르는 색상 팔레트
- **타이포그래피**: 다양한 크기의 폰트 스타일
- **간격**: 일관된 spacing 시스템
- **컴포넌트**: 재사용 가능한 UI 컴포넌트

## 📦 빌드

### iOS 빌드
```bash
npm run build:ios
```

### Android 빌드
```bash
npm run build:android
```

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
1. `src/components/` 폴더에 컴포넌트 파일 생성
2. `src/components/index.ts`에 export 추가
3. TypeScript 타입 정의 확인

### 새로운 화면 추가
1. `src/screens/` 폴더에 화면 파일 생성
2. `src/screens/index.ts`에 export 추가
3. 네비게이션 설정 업데이트

### 스타일링
- `src/constants/index.ts`의 COLORS, SIZES 사용
- 일관된 스타일링을 위해 기존 컴포넌트 참고

### 🎨 SVG 아이콘 시스템

앱은 완전히 SVG 기반의 아이콘 시스템을 사용합니다. 모든 아이콘은 outline 스타일로 일관성 있게 디자인되었습니다.

#### 기본 사용법
```tsx
import { SvgIcon } from '../components';

// 기본 사용법
<SvgIcon name="home" size={24} color="#9CA3AF" />

// 활성 상태
<SvgIcon name="home" size={24} color="#1884FF" />

// 동적 색상
<SvgIcon 
  name="home" 
  size={24} 
  color={isActive ? '#1884FF' : '#9CA3AF'} 
/>
```

#### 사용 가능한 아이콘
- `email`: 이메일 아이콘
- `lock`: 자물쇠 아이콘
- `eye`: 눈 아이콘
- `eyeOff`: 눈 감김 아이콘
- `person`: 사람 아이콘
- `notifications`: 알림 아이콘
- `message`: 메시지 아이콘
- `megaphone`: 공지사항 아이콘
- `calendar`: 달력 아이콘
- `books`: 학습자료 아이콘
- `home`: 홈 아이콘

#### 아이콘 검증
```bash
# 모든 아이콘 검증
npm run validate:icons

# 또는
npm run check:icons
```

#### 새로운 아이콘 추가
```bash
# 아이콘 생성 도구 사용
node scripts/icon-template.js <아이콘명>

# 예시
node scripts/icon-template.js settings
```

**⚠️ 중요**: 모든 아이콘은 SVG로만 제작해야 하며, 이모지나 다른 아이콘 라이브러리 사용은 금지됩니다. 자세한 내용은 `ICON_GUIDELINES.md`를 참고하세요.

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
