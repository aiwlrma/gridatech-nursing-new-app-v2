import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { TOSS_THEME } from '../constants/tossTheme';

interface TossTextProps {
  children: React.ReactNode;
  variant?: 'hero' | 'display' | 'title' | 'sectionTitle' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning';
  style?: TextStyle;
  numberOfLines?: number;
}

export const TossText: React.FC<TossTextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  style,
  numberOfLines,
}) => {
  const textStyle = [
    styles.base,
    styles[variant],
    styles[color],
    style,
  ];

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Pretendard',
  },
  // 타이포그래피 변형
  hero: {
    ...TOSS_THEME.typography.hero,
  },
  display: {
    ...TOSS_THEME.typography.display,
  },
  title: {
    ...TOSS_THEME.typography.title,
  },
  sectionTitle: {
    ...TOSS_THEME.typography.sectionTitle,
  },
  body: {
    ...TOSS_THEME.typography.body,
  },
  caption: {
    ...TOSS_THEME.typography.caption,
  },
  small: {
    ...TOSS_THEME.typography.small,
  },
  // 색상 변형
  primary: {
    color: TOSS_THEME.colors.text.primary,
  },
  secondary: {
    color: TOSS_THEME.colors.text.secondary,
  },
  tertiary: {
    color: TOSS_THEME.colors.text.tertiary,
  },
  success: {
    color: TOSS_THEME.colors.success,
  },
  error: {
    color: TOSS_THEME.colors.error,
  },
  warning: {
    color: TOSS_THEME.colors.warning,
  },
});
