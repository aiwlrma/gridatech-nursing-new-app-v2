// 앱 상수 정의
export const COLORS = {
  primary: '#1884FF',
  secondary: '#5856D6',
  success: '#10B981',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F9FAFB', // 홈 화면 배경색
  surface: '#FFFFFF',
  text: '#1A1F2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  lightBlue: '#F0F7FF',
  // 새로운 파란색 그라데이션 색상
  blueGradient: {
    start: '#1884FF',
    end: '#3B82F6',
  },
  // Wave 배경용 색상
  waveBackground: '#1884FF',
  waveBackgroundEnd: '#3B82F6',
};

export const SIZES = {
  // 폰트 크기
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  // 간격
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // 둥근 모서리
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 9999,
  },
};

export const API_ENDPOINTS = {
  baseUrl: 'https://api.example.com',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
  },
};

// 파란 테마 색상
export { BLUE_THEME } from './blueTheme';
