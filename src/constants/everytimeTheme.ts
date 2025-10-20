// 🎨 에브리타임 스타일 디자인 시스템
export const EVERYTIME_COLORS = {
  // 브랜딩 컬러 유지
  primary: '#1884FF',
  
  // 에브리타임 스타일 배경
  background: '#FAFAFA', // 더 연한 회색
  surface: '#FFFFFF',
  
  // 구분선 (에브리타임처럼)
  divider: '#EEEEEE',
  border: '#E0E0E0',
  lightBorder: '#F5F5F5',
  
  // 텍스트 (더 진하게)
  textPrimary: '#000000', // 더 진한 검정
  textSecondary: '#757575', // 더 진한 회색
  textTertiary: '#BDBDBD',
  
  // 강조 (파란색 유지)
  accent: '#1884FF',
  accentLight: '#E3F2FD',
  
  // 상태
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

export const EVERYTIME_TYPOGRAPHY = {
  // 헤더 제목
  h1: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  
  // 섹션 제목
  h2: {
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
  
  // 리스트 제목
  listTitle: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  
  // 보조 텍스트
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  
  // 작은 텍스트
  small: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
};

export const EVERYTIME_SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  
  // 리스트 아이템 패딩
  listItemV: 12, // 상하
  listItemH: 16, // 좌우
  
  // 섹션 간격
  sectionGap: 8, // 구분선으로 대체
  
  // 화면 패딩
  screenPadding: 16, // 20 → 16
};

export const EVERYTIME_STYLES = {
  // 컨테이너
  container: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 헤더
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: EVERYTIME_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.divider,
  },
  
  // 구분선 (에브리타임 스타일)
  divider: {
    height: 8,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 리스트 아이템
  listItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  // 섹션 헤더
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: EVERYTIME_COLORS.surface,
  },
};
