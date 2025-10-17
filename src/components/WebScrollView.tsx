import React from 'react';
import { ScrollView, ScrollViewProps, Platform } from 'react-native';

interface WebScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
}

export const WebScrollView: React.FC<WebScrollViewProps> = ({ 
  children, 
  style, 
  contentContainerStyle,
  ...props 
}) => {
  // 웹에서 스크롤 개선을 위한 추가 속성
  const webProps = Platform.OS === 'web' ? {
    // 웹에서 스크롤 성능 개선
    style: [
      style,
      {
        overflow: 'auto',
        height: '100%',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }
    ],
    contentContainerStyle: [
      contentContainerStyle,
      {
        minHeight: '100%',
      }
    ],
    // 웹에서 스크롤 이벤트 최적화
    scrollEventThrottle: 16,
    // 웹에서 중첩 스크롤 지원
    nestedScrollEnabled: true,
  } : {};

  return (
    <ScrollView
      {...props}
      {...webProps}
      // 웹에서 스크롤 데이터 속성 추가
      {...(Platform.OS === 'web' && {
        'data-scrollview': 'true',
        'data-scrollview-horizontal': props.horizontal ? 'true' : undefined,
      })}
    >
      {children}
    </ScrollView>
  );
};

export default WebScrollView;
