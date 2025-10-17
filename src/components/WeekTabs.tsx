import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SIZES } from '../constants';

interface WeekTabsProps {
  currentWeek: number;
  onWeekChange: (week: number) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({
  currentWeek,
  onWeekChange,
  onPreviousWeek,
  onNextWeek,
}) => {
  const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={onPreviousWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.navIcon}>◀</Text>
      </TouchableOpacity>
      
      <View style={styles.weekContainer}>
        {weeks.map((week) => (
          <TouchableOpacity
            key={week}
            style={[
              styles.weekTab,
              currentWeek === week && styles.activeWeekTab,
            ]}
            onPress={() => onWeekChange(week)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.weekText,
                currentWeek === week && styles.activeWeekText,
              ]}
            >
              {week}주차
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={onNextWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.navIcon}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navButton: {
    padding: SIZES.spacing.xs,
    marginHorizontal: SIZES.spacing.xs,
  },
  navIcon: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  weekContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekTab: {
    paddingHorizontal: SIZES.spacing.sm,
    paddingVertical: SIZES.spacing.xs,
    marginHorizontal: 2,
    borderRadius: SIZES.borderRadius.sm,
    backgroundColor: 'transparent',
  },
  activeWeekTab: {
    backgroundColor: COLORS.primary,
  },
  weekText: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  activeWeekText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
