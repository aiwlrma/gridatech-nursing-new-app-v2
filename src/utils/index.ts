// 유틸리티 함수들
import { COLORS } from '../constants';

// 스크롤 유틸리티 export
export * from './scrollUtils';

// 날짜 포맷팅
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// 시간 포맷팅
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 문자열 검증
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // 최소 8자, 대소문자, 숫자, 특수문자 포함
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// 로컬 스토리지 헬퍼
export const storage = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      // AsyncStorage 또는 SecureStore 사용
      console.log(`Storing ${key}: ${value}`);
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  },
  
  getItem: async (key: string): Promise<string | null> => {
    try {
      // AsyncStorage 또는 SecureStore 사용
      console.log(`Getting ${key}`);
      return null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },
  
  removeItem: async (key: string): Promise<void> => {
    try {
      // AsyncStorage 또는 SecureStore 사용
      console.log(`Removing ${key}`);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  },
};

// 디바운스 함수
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 스타일 헬퍼
export const createShadow = (elevation: number = 2) => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: elevation,
  },
  shadowOpacity: 0.1,
  shadowRadius: elevation * 2,
  elevation: elevation,
});
