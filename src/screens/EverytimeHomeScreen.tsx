import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SvgIcon } from '../components/SvgIcon';
import { EverytimeNextAction } from '../components/EverytimeNextAction';
import { EVERYTIME_COLORS, EVERYTIME_TYPOGRAPHY, EVERYTIME_SPACING } from '../constants/everytimeTheme';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: string;
  isCompleted?: boolean;
}

interface EverytimeHomeScreenProps {
  onNavigateToTimetable?: () => void;
  onNavigateToLearning?: () => void;
  onNavigateToGrades?: () => void;
}

export const EverytimeHomeScreen: React.FC<EverytimeHomeScreenProps> = ({
  onNavigateToTimetable,
  onNavigateToLearning,
  onNavigateToGrades,
}) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState('today');

  // 다음 일정 데이터
  const nextSchedule = {
    time: '14:00',
    title: '기초 간호 실습',
    location: '실습실 A동 302호',
    minutesUntil: 90,
  };

  // 오늘의 일정 데이터
  const todaySchedules: ScheduleItem[] = [
    {
      id: '1',
      time: '14:00',
      title: '기초 간호 실습',
      location: 'A동 302호',
      type: '실습',
    },
    {
      id: '2',
      time: '16:30',
      title: '성인간호학 이론',
      location: 'B동 201호',
      type: '이론',
    },
  ];

  const handleDateFilterChange = (filter: string) => {
    setSelectedDateFilter(filter);
  };

  const handleNextActionPress = () => {
    console.log('다음 일정 상세 보기');
  };

  const handleCheckIn = () => {
    console.log('출석 체크');
  };

  const handleNavigate = () => {
    console.log('길찾기');
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요, 김간호님! 👋</Text>
        <TouchableOpacity>
          <Text style={styles.notification}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* 다음 일정 - 강조 영역 */}
      <EverytimeNextAction
        nextSchedule={nextSchedule}
        onPress={handleNextActionPress}
        onCheckIn={handleCheckIn}
        onNavigate={handleNavigate}
      />

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 오늘의 일정 */}
      <View style={styles.todaySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘의 일정</Text>
          <Text style={styles.sectionCount}>{todaySchedules.length}개</Text>
        </View>
        
        <View style={styles.scheduleList}>
          {todaySchedules.map((schedule, index) => (
            <TouchableOpacity 
              key={schedule.id} 
              style={[
                styles.listItem,
                index === todaySchedules.length - 1 && styles.lastListItem
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.listTime}>{schedule.time}</Text>
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{schedule.title}</Text>
                <Text style={styles.listLocation}>{schedule.location}</Text>
              </View>
              <Text style={styles.listType}>{schedule.type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 빠른 메뉴 */}
      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={onNavigateToTimetable}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>📅</Text>
          <Text style={styles.menuText}>시간표</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={onNavigateToLearning}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>📖</Text>
          <Text style={styles.menuText}>학습</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={onNavigateToGrades}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>🏆</Text>
          <Text style={styles.menuText}>성적</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: EVERYTIME_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.divider,
  },
  
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  notification: {
    fontSize: 20,
  },
  
  // 구분선 (에브리타임 스타일)
  divider: {
    height: 8,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 오늘의 일정
  todaySection: {
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  sectionCount: {
    fontSize: 13,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  // 리스트 아이템
  scheduleList: {
    gap: 0, // 여백 없음
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  lastListItem: {
    borderBottomWidth: 0,
  },
  
  listTime: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.primary,
    width: 50,
  },
  
  listInfo: {
    flex: 1,
  },
  
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 2,
  },
  
  listLocation: {
    fontSize: 13,
    fontWeight: '400',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  listType: {
    fontSize: 12,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
    backgroundColor: EVERYTIME_COLORS.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  // 빠른 메뉴 (리스트 형태)
  menuSection: {
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  menuArrow: {
    fontSize: 14,
    color: EVERYTIME_COLORS.textTertiary,
  },
});
