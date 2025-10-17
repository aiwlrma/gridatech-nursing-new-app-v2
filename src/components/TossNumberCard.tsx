import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TossCard } from './TossCard';
import { TossText } from './TossText';
import { TOSS_THEME } from '../constants/tossTheme';

interface TossNumberCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export const TossNumberCard: React.FC<TossNumberCardProps> = ({
  label,
  value,
  unit,
  subtitle,
  color = 'primary',
}) => {
  const getColor = () => {
    switch (color) {
      case 'success':
        return TOSS_THEME.colors.success;
      case 'warning':
        return TOSS_THEME.colors.warning;
      case 'error':
        return TOSS_THEME.colors.error;
      default:
        return TOSS_THEME.colors.primary;
    }
  };

  return (
    <TossCard padding="large" shadow="medium">
      <TossText variant="caption" color="secondary" style={styles.label}>
        {label}
      </TossText>
      
      <View style={styles.valueContainer}>
        <TossText 
          variant="hero" 
          style={[styles.value, { color: getColor() }]}
        >
          {value}
        </TossText>
        {unit && (
          <TossText 
            variant="display" 
            color="secondary"
            style={styles.unit}
          >
            {unit}
          </TossText>
        )}
      </View>
      
      {subtitle && (
        <TossText variant="caption" color="secondary" style={styles.subtitle}>
          {subtitle}
        </TossText>
      )}
    </TossCard>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: TOSS_THEME.spacing.sm,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: TOSS_THEME.spacing.sm,
  },
  value: {
    fontSize: 56,
    fontWeight: '800',
    letterSpacing: -1,
  },
  unit: {
    fontSize: 32,
    marginLeft: TOSS_THEME.spacing.sm,
  },
  subtitle: {
    marginTop: TOSS_THEME.spacing.xs,
  },
});
