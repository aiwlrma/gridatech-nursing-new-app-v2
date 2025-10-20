import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
        style={styles.arrow} 
        onPress={onPreviousWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>‹</Text>
      </TouchableOpacity>
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.weekContainer}
      >
        {weeks.map((week) => (
          <TouchableOpacity
            key={week}
            style={[
              styles.weekTab,
              currentWeek === week && styles.activeTab,
            ]}
            onPress={() => onWeekChange(week)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.weekText,
                currentWeek === week && styles.activeText,
              ]}
            >
              {week}주차
            </Text>
            {currentWeek === week && <View style={styles.indicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.arrow} 
        onPress={onNextWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    height: 44,
  },
  
  arrow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  
  arrowText: {
    fontSize: 20,
    color: '#6B7280',
  },
  
  scrollView: {
    flex: 1,
  },
  
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  weekTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'relative',
  },
  
  activeTab: {
    // 활성 상태
  },
  
  weekText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  
  activeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1884FF',
  },
  
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#1884FF',
  },
});
