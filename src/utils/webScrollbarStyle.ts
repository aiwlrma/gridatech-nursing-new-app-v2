import { Platform } from 'react-native';

/**
 * 웹에서 스크롤바 스타일링을 위한 유틸리티
 */

export const applyWebScrollbarStyle = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    // 이미 추가된 스타일이 있는지 확인
    const existingStyle = document.getElementById('web-scrollbar-style');
    if (existingStyle) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'web-scrollbar-style';
    style.textContent = `
      /* 웹 스크롤바 스타일링 */
      ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 6px;
        margin: 2px;
      }

      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 6px;
        border: 2px solid #f1f1f1;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      ::-webkit-scrollbar-thumb:active {
        background: #8a8a8a;
      }

      ::-webkit-scrollbar-corner {
        background: #f1f1f1;
      }

      /* Firefox 스크롤바 스타일링 */
      * {
        scrollbar-width: thin;
        scrollbar-color: #c1c1c1 #f1f1f1;
      }

      /* 다크 모드 지원 */
      @media (prefers-color-scheme: dark) {
        ::-webkit-scrollbar-track {
          background: #2d2d2d;
        }

        ::-webkit-scrollbar-thumb {
          background: #555;
          border: 2px solid #2d2d2d;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #777;
        }

        ::-webkit-scrollbar-thumb:active {
          background: #999;
        }

        ::-webkit-scrollbar-corner {
          background: #2d2d2d;
        }

        * {
          scrollbar-color: #555 #2d2d2d;
        }
      }

      /* 스크롤바 애니메이션 */
      ::-webkit-scrollbar-thumb {
        transition: background-color 0.2s ease;
      }

      /* 스크롤바 숨기기 (필요시) */
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* 스크롤바 포커스 스타일 */
      [data-scrollview]:focus::-webkit-scrollbar-thumb {
        background: #1884FF;
      }

      /* 스크롤바 호버 효과 */
      [data-scrollview]:hover::-webkit-scrollbar-thumb {
        background: #a8a8a8;
      }
    `;

    document.head.appendChild(style);
  }
};

export const removeWebScrollbarStyle = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    const existingStyle = document.getElementById('web-scrollbar-style');
    if (existingStyle) {
      existingStyle.remove();
    }
  }
};
