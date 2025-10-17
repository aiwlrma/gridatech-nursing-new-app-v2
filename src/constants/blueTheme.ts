// 파란 계열 테마 색상 팔레트
export const BLUE_THEME = {
  // 메인 파란색 (이미지와 일치)
  primary: '#1976D2', // Material Blue 700 - 이미지의 진한 파란색
  primaryDark: '#1565C0', // Material Blue 800
  primaryLight: '#42A5F5', // Material Blue 400
  
  // 배경색
  background: '#F0F7FF',
  surface: '#FFFFFF',
  
  // 텍스트 색상
  text: '#1A1F2E',
  textSecondary: '#6B7280',
  textLight: '#90CAF9',
  
  // 퀵 액션 배경
  quickActions: {
    message: {
      bg: '#E3F2FD',
      icon: '#1976D2',
      gradient: ['#E3F2FD', '#BBDEFB'],
    },
    notice: {
      bg: '#B3E5FC',
      icon: '#0288D1',
      gradient: ['#B3E5FC', '#81D4FA'],
    },
    booking: {
      bg: '#E1F5FE',
      icon: '#0277BD',
      gradient: ['#E1F5FE', '#B3E5FC'],
    },
    study: {
      bg: '#C5CAE9',
      icon: '#5C6BC0',
      gradient: ['#C5CAE9', '#9FA8DA'],
    },
  },
  
  // 버튼 그라디언트 (이미지와 일치)
  buttonGradient: ['#1976D2', '#1565C0'],
  
  // 시간 박스 그라디언트
  timeBoxGradient: ['#1976D2', '#1565C0'],
  
  // 그림자 색상
  shadow: 'rgba(25, 118, 210, 0.12)',
  
  // 구분선
  divider: '#E3F2FD',
  
  // 알림 배지
  badge: '#EF4444',
} as const;
