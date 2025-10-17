import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TOSS_THEME } from '../constants/tossTheme';

interface TossButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const TossButton: React.FC<TossButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[size],
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        style={buttonStyle}
      >
        <LinearGradient
          colors={disabled ? ['#D1D5DB', '#9CA3AF'] : ['#1884FF', '#1565C0']}
          style={styles.gradient}
        >
          <Text style={textStyle}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: TOSS_THEME.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...TOSS_THEME.shadow.small,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: TOSS_THEME.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 크기별 스타일
  small: {
    height: TOSS_THEME.buttonHeight.small,
    paddingHorizontal: TOSS_THEME.spacing.lg,
  },
  medium: {
    height: TOSS_THEME.buttonHeight.medium,
    paddingHorizontal: TOSS_THEME.spacing.xl,
  },
  large: {
    height: TOSS_THEME.buttonHeight.large,
    paddingHorizontal: TOSS_THEME.spacing.xl,
  },
  // 변형별 스타일
  secondary: {
    backgroundColor: TOSS_THEME.colors.primaryLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: TOSS_THEME.colors.border,
  },
  disabled: {
    opacity: 0.6,
  },
  // 텍스트 스타일
  text: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  secondaryText: {
    color: TOSS_THEME.colors.primary,
  },
  outlineText: {
    color: TOSS_THEME.colors.text.primary,
  },
  disabledText: {
    color: TOSS_THEME.colors.text.tertiary,
  },
});
