import { Platform } from 'react-native';

/**
 * 웹에서 마우스 드래그 스크롤 지원을 위한 유틸리티
 */

export const enableWebMouseScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  if (typeof document !== 'undefined') {
    let isDragging = false;
    let startY = 0;
    let startX = 0;
    let startScrollTop = 0;
    let startScrollLeft = 0;

    // 마우스 다운
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const scrollView = target.closest('[data-scrollview]') as HTMLElement;
      
      if (scrollView) {
        isDragging = true;
        startY = event.clientY;
        startX = event.clientX;
        startScrollTop = scrollView.scrollTop;
        startScrollLeft = scrollView.scrollLeft;
        
        // 커서 스타일 변경
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        
        event.preventDefault();
      }
    };

    // 마우스 이동
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const target = event.target as HTMLElement;
      const scrollView = target.closest('[data-scrollview]') as HTMLElement;
      
      if (scrollView) {
        const deltaY = event.clientY - startY;
        const deltaX = event.clientX - startX;
        
        scrollView.scrollTop = startScrollTop - deltaY;
        scrollView.scrollLeft = startScrollLeft - deltaX;
        
        event.preventDefault();
      }
    };

    // 마우스 업
    const handleMouseUp = (event: MouseEvent) => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    // 마우스 리브 (창 밖으로 나갔을 때)
    const handleMouseLeave = (event: MouseEvent) => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 정리 함수 반환
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // 스타일 초기화
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }
};

export const disableWebMouseScroll = () => {
  if (Platform.OS !== 'web') {
    return;
  }

  // 이벤트 리스너 제거는 enableWebMouseScroll에서 반환된 함수로 처리
};
