import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { TOSS_THEME } from '../constants/tossTheme';

interface TossCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'small' | 'medium' | 'large';
  shadow?: 'small' | 'medium' | 'none';
}

export const TossCard: React.FC<TossCardProps> = ({
  children,
  style,
  padding = 'medium',
  shadow = 'small',
}) => {
  const cardStyle = [
    styles.card,
    styles[padding],
    shadow !== 'none' && TOSS_THEME.shadow[shadow],
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: TOSS_THEME.colors.card,
    borderRadius: TOSS_THEME.borderRadius.lg,
  },
  small: {
    padding: TOSS_THEME.spacing.md,
  },
  medium: {
    padding: TOSS_THEME.spacing.lg,
  },
  large: {
    padding: TOSS_THEME.spacing.xl,
  },
});
