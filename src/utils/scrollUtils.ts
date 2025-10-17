import { Platform } from 'react-native';

/**
 * 웹에서 스크롤 성능을 개선하기 위한 유틸리티 함수들
 */

// 웹에서 스크롤 이벤트 최적화
export const getScrollEventThrottle = (): number => {
  return Platform.OS === 'web' ? 16 : 16;
};

// 웹에서 스크롤 속성 가져오기
export const getWebScrollProps = () => {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    // 웹에서 스크롤 성능 개선
    style: {
      overflow: 'auto',
      height: '100%',
      WebkitOverflowScrolling: 'touch',
      overscrollBehavior: 'contain',
    },
    // 웹에서 스크롤 이벤트 최적화
    scrollEventThrottle: 16,
    // 웹에서 중첩 스크롤 지원
    nestedScrollEnabled: true,
  };
};

// 웹에서 가로 스크롤 속성 가져오기
export const getWebHorizontalScrollProps = () => {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    // 웹에서 가로 스크롤 개선
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
    },
    // 웹에서 스크롤 이벤트 최적화
    scrollEventThrottle: 16,
    // 웹에서 중첩 스크롤 지원
    nestedScrollEnabled: true,
  };
};

// 웹에서 스크롤 컨테이너 스타일 가져오기
export const getWebScrollContainerStyle = () => {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    minHeight: '100%',
    // 웹에서 스크롤 성능 최적화
    willChange: 'scroll-position',
    transform: 'translateZ(0)',
  };
};

// 웹에서 스크롤 데이터 속성 가져오기
export const getWebScrollDataProps = (horizontal?: boolean) => {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    'data-scrollview': 'true',
    ...(horizontal && { 'data-scrollview-horizontal': 'true' }),
  };
};

// 웹에서 스크롤 초기화 (필요시)
export const initializeWebScroll = () => {
  if (Platform.OS === 'web') {
    // 웹에서 스크롤 관련 전역 설정
    if (typeof document !== 'undefined') {
      // 스크롤 성능 최적화를 위한 CSS 추가
      const style = document.createElement('style');
      style.textContent = `
        [data-scrollview] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        [data-scrollview-horizontal] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
        }
      `;
      document.head.appendChild(style);
    }
  }
};
