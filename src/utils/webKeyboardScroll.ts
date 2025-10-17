import { Platform } from 'react-native';

/**
 * 웹에서 키보드 스크롤 지원을 위한 유틸리티
 */

export const enableWebKeyboardScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    // 키보드 스크롤 이벤트 리스너 추가
    const handleKeyDown = (event: KeyboardEvent) => {
      // Page Up/Down 키로 스크롤
      if (event.key === 'PageUp' || event.key === 'PageDown') {
        event.preventDefault();
        const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
        if (scrollView) {
          const scrollAmount = scrollView.clientHeight * 0.8;
          if (event.key === 'PageUp') {
            scrollView.scrollTop -= scrollAmount;
          } else {
            scrollView.scrollTop += scrollAmount;
          }
        }
      }

      // Home/End 키로 스크롤
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
        if (scrollView) {
          if (event.key === 'Home') {
            scrollView.scrollTop = 0;
          } else {
            scrollView.scrollTop = scrollView.scrollHeight;
          }
        }
      }

      // 화살표 키로 스크롤
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
        if (scrollView) {
          const scrollAmount = 50;
          if (event.key === 'ArrowUp') {
            scrollView.scrollTop -= scrollAmount;
          } else {
            scrollView.scrollTop += scrollAmount;
          }
        }
      }

      // 좌우 화살표 키로 가로 스크롤
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const horizontalScrollView = document.querySelector('[data-scrollview-horizontal]') as HTMLElement;
        if (horizontalScrollView) {
          const scrollAmount = 50;
          if (event.key === 'ArrowLeft') {
            horizontalScrollView.scrollLeft -= scrollAmount;
          } else {
            horizontalScrollView.scrollLeft += scrollAmount;
          }
        }
      }
    };

    // 스크롤 휠 이벤트 개선
    const handleWheel = (event: WheelEvent) => {
      const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
      if (scrollView && scrollView.contains(event.target as Node)) {
        // 스크롤 휠 이벤트를 ScrollView로 전달
        event.preventDefault();
        scrollView.scrollTop += event.deltaY;
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    // 정리 함수 반환
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
    };
  }
};

export const disableWebKeyboardScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  // 이벤트 리스너 제거는 enableWebKeyboardScroll에서 반환된 함수로 처리
  // 여기서는 추가적인 정리 작업이 필요한 경우에만 구현
};
