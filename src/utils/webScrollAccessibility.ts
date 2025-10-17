import { Platform } from 'react-native';

/**
 * 웹에서 스크롤 접근성 지원을 위한 유틸리티
 */

export const enableWebScrollAccessibility = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    // 이미 추가된 스타일이 있는지 확인
    const existingStyle = document.getElementById('web-scroll-accessibility');
    if (existingStyle) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'web-scroll-accessibility';
    style.textContent = `
      /* 스크롤 접근성 지원 */
      [data-scrollview] {
        /* 키보드 네비게이션 지원 */
        tabindex: 0;
        
        /* 스크린 리더 지원 */
        role: scrollbar;
        aria-label: '스크롤 가능한 영역';
        
        /* 포커스 표시 */
        outline: none;
      }

      /* 스크롤 접근성 포커스 스타일 */
      [data-scrollview]:focus {
        outline: 2px solid #1884FF;
        outline-offset: 2px;
      }

      /* 스크롤 접근성 호버 스타일 */
      [data-scrollview]:hover {
        outline: 1px solid #1884FF;
        outline-offset: 1px;
      }

      /* 스크롤 접근성 활성 스타일 */
      [data-scrollview]:active {
        outline: 2px solid #1884FF;
        outline-offset: 2px;
      }

      /* 스크롤 접근성 스크린 리더 지원 */
      [data-scrollview]::before {
        content: '스크롤 가능한 영역';
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      /* 스크롤 접근성 키보드 네비게이션 */
      [data-scrollview]:focus-within {
        outline: 2px solid #1884FF;
        outline-offset: 2px;
      }

      /* 스크롤 접근성 스크린 리더 숨김 */
      .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      /* 스크롤 접근성 스크린 리더 표시 */
      .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
      }

      /* 스크롤 접근성 스크린 리더 텍스트 */
      [data-scrollview] .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }

      /* 스크롤 접근성 스크린 리더 포커스 */
      [data-scrollview] .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
      }
    `;

    document.head.appendChild(style);
  }
};

export const removeWebScrollAccessibility = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('web-scroll-accessibility');
    if (existingStyle) {
      existingStyle.remove();
    }
  }
};