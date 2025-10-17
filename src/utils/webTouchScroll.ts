import { Platform } from 'react-native';

/**
 * 웹에서 터치 스크롤 지원을 위한 유틸리티
 */

export const enableWebTouchScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    let startY = 0;
    let startX = 0;
    let isScrolling = false;

    // 터치 시작
    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      startY = touch.clientY;
      startX = touch.clientX;
      isScrolling = false;
    };

    // 터치 이동
    const handleTouchMove = (event: TouchEvent) => {
      if (!event.touches[0]) return;

      const touch = event.touches[0];
      const deltaY = startY - touch.clientY;
      const deltaX = startX - touch.clientX;

      // 세로 스크롤
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
        if (scrollView) {
          event.preventDefault();
          scrollView.scrollTop += deltaY;
          startY = touch.clientY;
          isScrolling = true;
        }
      }
      // 가로 스크롤
      else if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const horizontalScrollView = document.querySelector('[data-scrollview-horizontal]') as HTMLElement;
        if (horizontalScrollView) {
          event.preventDefault();
          horizontalScrollView.scrollLeft += deltaX;
          startX = touch.clientX;
          isScrolling = true;
        }
      }
    };

    // 터치 종료
    const handleTouchEnd = (event: TouchEvent) => {
      isScrolling = false;
    };

    // 마우스 휠 이벤트 개선
    const handleWheel = (event: WheelEvent) => {
      const scrollView = document.querySelector('[data-scrollview]') as HTMLElement;
      if (scrollView && scrollView.contains(event.target as Node)) {
        event.preventDefault();
        scrollView.scrollTop += event.deltaY;
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    // 정리 함수 반환
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
    };
  }
};

export const disableWebTouchScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  // 이벤트 리스너 제거는 enableWebTouchScroll에서 반환된 함수로 처리
};
