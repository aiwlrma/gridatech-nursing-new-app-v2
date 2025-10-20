// 🎨 디자인 시스템 - 에브리타임 + 토스 스타일
export const COLORS = {
  // 메인 브랜딩 (유지)
  primary: '#1884FF',
  
  // 액센트 컬러 (노란색 추가)
  accent: '#FFD166',
  
  // 배경 계층
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  
  // 텍스트 (더 명확한 계층)
  textPrimary: '#191F28',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // 상태 색상
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#1884FF',
  
  // 그라데이션 색상
  primaryGradient: ['#1884FF', '#0D6EFD'],
  accentGradient: ['#FFD166', '#FFC233'],
  lightGradient: ['#E3F2FD', '#BBDEFB'],
};

export const TYPOGRAPHY = {
  // 큰 제목
  h1: {
    fontSize: 28,
    fontWeight: '800' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  
  // 중간 제목
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  
  // 작은 제목
  h3: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  
  // 본문 - 강조
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  
  // 본문 - 일반
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
    letterSpacing: 0,
  },
  
  // 보조 텍스트
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0,
  },
  
  // 작은 텍스트
  small: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // 카드 간격
  cardGap: 16,
  
  // 화면 패딩
  screenPadding: 20,
  
  // 섹션 간격
  sectionGap: 32,
};

export const CARD_STYLES = {
  // 기본 카드
  default: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  
  // 강조 카드 (다음 할 일 카드)
  elevated: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.1)',
  },
};

export const BUTTON_STYLES = {
  // Primary 버튼
  primary: {
    height: 52,
    backgroundColor: '#1884FF',
    borderRadius: 16,
    paddingHorizontal: 24,
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Secondary 버튼 (액센트 컬러)
  secondary: {
    height: 52,
    backgroundColor: '#FFD166',
    borderRadius: 16,
    paddingHorizontal: 24,
    shadowColor: '#FFD166',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Ghost 버튼
  ghost: {
    height: 48,
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    borderRadius: 14,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 132, 255, 0.2)',
  },
};

export const ICON_STYLES = {
  // 아이콘 컨테이너
  container: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  // 아이콘 크기
  size: {
    small: 20,
    medium: 24,
    large: 32,
  },
  
  // 아이콘 색상
  color: '#1884FF',
};
