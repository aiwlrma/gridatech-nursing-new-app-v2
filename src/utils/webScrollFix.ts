import { Platform } from 'react-native';

/**
 * 웹에서 스크롤 문제를 해결하기 위한 유틸리티
 */

export const applyWebScrollFix = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  // 웹에서 스크롤 관련 CSS 동적 추가
  if (typeof document !== 'undefined') {
    // 이미 추가된 스타일이 있는지 확인
    const existingStyle = document.getElementById('web-scroll-fix');
    if (existingStyle) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'web-scroll-fix';
    style.textContent = `
      /* React Native Web 스크롤 개선 */
      html, body {
        height: 100%;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
      }

      #root {
        height: 100vh;
        overflow: hidden;
      }

      /* ScrollView 컴포넌트 개선 */
      [data-scrollview] {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        height: 100%;
        overscroll-behavior: contain;
      }

      /* 가로 스크롤 개선 */
      [data-scrollview-horizontal] {
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        overflow-y: hidden;
        overscroll-behavior-x: contain;
      }

      /* 스크롤바 스타일링 */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      /* 터치 디바이스에서 스크롤 개선 */
      @media (hover: none) and (pointer: coarse) {
        [data-scrollview] {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
      }

      /* 스크롤 성능 최적화 */
      [data-scrollview] {
        will-change: scroll-position;
        transform: translateZ(0);
      }

      /* 키보드 네비게이션 지원 */
      [data-scrollview]:focus {
        outline: none;
      }

      /* React Native Web 특정 스타일 */
      .react-native-web {
        height: 100%;
        overflow: hidden;
      }

      /* SafeAreaView 웹 호환성 */
      [data-safe-area-view] {
        height: 100vh;
        overflow: hidden;
      }
    `;

    document.head.appendChild(style);
  }
};

export const removeWebScrollFix = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('web-scroll-fix');
    if (existingStyle) {
      existingStyle.remove();
    }
  }
};
