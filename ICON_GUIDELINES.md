# 🎨 SVG 아이콘 작업 가이드라인

## 📋 기본 원칙

### ✅ 반드시 지켜야 할 사항
1. **모든 아이콘은 SVG로만 제작**
2. **이모지나 Ionicons 사용 금지**
3. **일관된 outline 스타일 유지**
4. **오류 방지 시스템 활용**

## 🛠️ 아이콘 추가 프로세스

### 1단계: SVG 아이콘 생성
```typescript
// src/assets/icons/index.ts에 추가
export const NEW_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
```

### 2단계: SVG_ICONS 객체에 등록
```typescript
export const SVG_ICONS = {
  // 기존 아이콘들...
  newIcon: NEW_ICON,
} as const;
```

### 3단계: 개별 SVG 파일 생성
```bash
# src/assets/icons/newIcon.svg 파일 생성
```

### 4단계: 컴포넌트에서 사용
```typescript
import { SvgIcon } from './SvgIcon';

// 사용법
<SvgIcon name="newIcon" size={24} color="#9CA3AF" />
```

## 🎨 디자인 규칙

### 스타일 가이드
- **stroke-width**: `1.5` (일관성 유지)
- **fill**: `none` (outline만 사용)
- **stroke**: `currentColor` (동적 색상)
- **stroke-linecap**: `round`
- **stroke-linejoin**: `round`
- **viewBox**: `0 0 24 24` (표준 크기)

### 색상 규칙
- **기본 색상**: `#9CA3AF` (회색)
- **활성 색상**: `#1884FF` (파란색)
- **primary 색상**: `COLORS.primary`

## 🛡️ 오류 방지 체크리스트

### 필수 검증 항목
- [ ] SVG XML 구조 유효성 확인
- [ ] `currentColor` 사용 확인
- [ ] `stroke-width="1.5"` 확인
- [ ] `fill="none"` 확인
- [ ] SVG_ICONS 객체에 등록 확인
- [ ] 개별 .svg 파일 생성 확인
- [ ] SvgIcon 컴포넌트로 렌더링 확인

### 안전성 검증
- [ ] 잘못된 아이콘 이름 처리 확인
- [ ] 폴백 이모지 표시 확인
- [ ] 콘솔 경고 메시지 확인
- [ ] 메모이제이션 적용 확인

## 📝 사용 예시

### 컴포넌트에서 아이콘 사용
```typescript
// ✅ 올바른 사용법
<SvgIcon name="email" size={20} color="#9CA3AF" />

// ❌ 잘못된 사용법
<Ionicons name="mail" size={20} color="#9CA3AF" />
<Text>📧</Text>
```

### 동적 색상 변경
```typescript
<SvgIcon 
  name="home" 
  size={24} 
  color={isActive ? '#1884FF' : '#9CA3AF'} 
/>
```

### 폴백 처리
```typescript
<SvgIcon 
  name="unknownIcon" 
  size={24} 
  fallback="❓" 
/>
```

## 🔧 유틸리티 함수

### 아이콘 존재 여부 확인
```typescript
import { isValidIconName } from '../assets/icons';

if (isValidIconName('email')) {
  // 안전하게 사용
}
```

### 안전한 아이콘 가져오기
```typescript
import { getSafeIcon } from '../assets/icons';

const iconXml = getSafeIcon('email');
if (iconXml) {
  // 아이콘 사용
}
```

## 🚫 금지 사항

### 사용 금지
- ❌ 이모지 (💬, 📧, 🏠 등)
- ❌ Ionicons
- ❌ MaterialIcons
- ❌ FontAwesome
- ❌ 기타 외부 아이콘 라이브러리

### 스타일 금지
- ❌ `fill` 속성 사용 (채워진 아이콘)
- ❌ `stroke-width` 1.5 이외의 값
- ❌ 하드코딩된 색상값

## 📚 참고 자료

### 기존 아이콘 목록
- `email`: 이메일 아이콘
- `lock`: 자물쇠 아이콘
- `eye`: 눈 아이콘
- `eyeOff`: 눈 감김 아이콘
- `person`: 사람 아이콘
- `notifications`: 알림 아이콘
- `message`: 메시지 아이콘
- `megaphone`: 메가폰 아이콘
- `calendar`: 달력 아이콘
- `books`: 책 아이콘
- `home`: 집 아이콘

### 관련 파일
- `src/assets/icons/index.ts`: 아이콘 정의
- `src/components/SvgIcon.tsx`: SVG 렌더링 컴포넌트
- `src/assets/icons/*.svg`: 개별 SVG 파일들

---

**⚠️ 중요**: 모든 새로운 아이콘은 이 가이드라인을 따라야 하며, 오류 방지 시스템을 활용해야 합니다.
