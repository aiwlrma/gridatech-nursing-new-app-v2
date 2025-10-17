// Toss 스타일 디자인 시스템
export const TOSS_THEME = {
  // 색상 시스템
  colors: {
    // 메인
    primary: '#1884FF',      // Toss 블루
    primaryLight: '#E3F2FD',
    
    // 배경
    background: '#F9FAFB',
    card: '#FFFFFF',
    
    // 텍스트
    text: {
      primary: '#191F28',    // 거의 검정
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
    },
    
    // 상태
    success: '#03C75A',      // Toss 그린
    error: '#F04452',
    warning: '#FF9500',
    
    // 구분선
    divider: '#F3F4F6',
    border: '#E5E7EB',
  },

  // 타이포그래피 시스템
  typography: {
    hero: {
      fontSize: 48,
      fontWeight: '800' as const,
      letterSpacing: -1,
      lineHeight: 56,
    },
    display: {
      fontSize: 32,
      fontWeight: '700' as const,
      letterSpacing: -0.5,
      lineHeight: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
    },
  },

  // 간격 시스템
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,       // 기본
    xl: 32,       // 섹션 간
    xxl: 40,
    xxxl: 48,
  },

  // 그림자 (매우 연하게)
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 4,
    },
  },

  // 둥근 모서리
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },

  // 버튼 높이
  buttonHeight: {
    small: 48,
    medium: 56,
    large: 64,
  },

  // 카드 패딩
  cardPadding: 24,

  // 컨테이너 패딩
  containerPadding: 24,

  // 섹션 간격
  sectionGap: 40,
} as const;

// UX 라이팅 헬퍼
export const TOSS_MESSAGES = {
  greeting: (name: string) => `안녕하세요, ${name}님 👋`,
  todayReservations: (count: number) => `오늘은 ${count}개의 예약이 있어요`,
  averageScore: (score: number) => `${score}점이에요! 👏`,
  unreadMessages: (count: number) => `아직 읽지 않은 메시지가 ${count}개 있어요`,
  xpToNextLevel: (xp: number) => `다음 레벨까지 ${xp} XP 남았어요`,
  topPercent: (percent: number) => `상위 ${percent}%예요`,
  completedTasks: (completed: number, total: number) => `${completed}/${total} 완료`,
} as const;
