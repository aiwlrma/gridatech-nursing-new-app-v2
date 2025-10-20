import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
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
  const scrollViewRef = useRef<ScrollView>(null);

  // 현재 주차로 스크롤 이동
  useEffect(() => {
    const currentIndex = weeks.indexOf(currentWeek);
    if (currentIndex !== -1 && scrollViewRef.current) {
      const scrollX = currentIndex * 80; // 각 탭의 예상 너비
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [currentWeek]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={onPreviousWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.navIcon}>◀</Text>
      </TouchableOpacity>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.weekContainer}
      >
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
      </ScrollView>
      
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
    zIndex: 1,
  },
  navIcon: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  scrollContainer: {
    flex: 1,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing.sm,
  },
  weekTab: {
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    marginHorizontal: 2,
    borderRadius: SIZES.borderRadius.md,
    backgroundColor: 'transparent',
    minWidth: 70,
    alignItems: 'center',
  },
  activeWeekTab: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
