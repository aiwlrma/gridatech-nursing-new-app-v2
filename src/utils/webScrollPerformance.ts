import { Platform } from 'react-native';

/**
 * 웹에서 스크롤 성능 최적화를 위한 유틸리티
 */

export const optimizeWebScrollPerformance = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    // 이미 추가된 스타일이 있는지 확인
    const existingStyle = document.getElementById('web-scroll-performance');
    if (existingStyle) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'web-scroll-performance';
    style.textContent = `
      /* 스크롤 성능 최적화 */
      [data-scrollview] {
        /* GPU 가속 활성화 */
        transform: translateZ(0);
        will-change: scroll-position;
        
        /* 스크롤 성능 최적화 */
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        
        /* 스크롤 스냅 지원 */
        scroll-snap-type: y mandatory;
        
        /* 스크롤 동작 최적화 */
        scroll-behavior: smooth;
      }

      /* 스크롤 아이템 성능 최적화 */
      [data-scrollview] > * {
        /* GPU 가속 활성화 */
        transform: translateZ(0);
        will-change: transform;
        
        /* 스크롤 스냅 지원 */
        scroll-snap-align: start;
      }

      /* 가로 스크롤 성능 최적화 */
      [data-scrollview-horizontal] {
        /* GPU 가속 활성화 */
        transform: translateZ(0);
        will-change: scroll-position;
        
        /* 스크롤 성능 최적화 */
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        
        /* 스크롤 스냅 지원 */
        scroll-snap-type: x mandatory;
        
        /* 스크롤 동작 최적화 */
        scroll-behavior: smooth;
      }

      /* 가로 스크롤 아이템 성능 최적화 */
      [data-scrollview-horizontal] > * {
        /* GPU 가속 활성화 */
        transform: translateZ(0);
        will-change: transform;
        
        /* 스크롤 스냅 지원 */
        scroll-snap-align: start;
      }

      /* 스크롤 성능 최적화를 위한 추가 설정 */
      .scroll-optimized {
        /* GPU 가속 활성화 */
        transform: translateZ(0);
        will-change: scroll-position;
        
        /* 스크롤 성능 최적화 */
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        
        /* 스크롤 동작 최적화 */
        scroll-behavior: smooth;
      }

      /* 스크롤 성능 최적화를 위한 애니메이션 */
      @keyframes scroll-optimize {
        0% { transform: translateZ(0); }
        100% { transform: translateZ(0); }
      }

      /* 스크롤 성능 최적화를 위한 클래스 */
      .scroll-optimized::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        animation: scroll-optimize 0.1s ease-in-out;
      }

      /* 스크롤 성능 최적화를 위한 미디어 쿼리 */
      @media (prefers-reduced-motion: reduce) {
        [data-scrollview],
        [data-scrollview-horizontal] {
          scroll-behavior: auto;
        }
      }

      /* 스크롤 성능 최적화를 위한 터치 디바이스 */
      @media (hover: none) and (pointer: coarse) {
        [data-scrollview],
        [data-scrollview-horizontal] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
      }
    `;

    document.head.appendChild(style);
  }
};

export const removeWebScrollPerformance = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('web-scroll-performance');
    if (existingStyle) {
      existingStyle.remove();
    }
  }
};
