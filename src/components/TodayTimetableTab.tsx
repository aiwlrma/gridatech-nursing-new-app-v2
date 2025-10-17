import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { TodayClassCard } from './TodayClassCard';
import { ClassSchedule } from '../types';
import { COLORS, SIZES } from '../constants';
import { ChevronRight, Calendar } from 'lucide-react-native';

interface TodayTimetableTabProps {
  todayClasses: ClassSchedule[];
  onViewAllTimetable?: () => void;
  onAddReservation?: () => void;
}

export const TodayTimetableTab: React.FC<TodayTimetableTabProps> = ({
  todayClasses,
  onViewAllTimetable,
  onAddReservation,
}) => {
  // 오늘 날짜 포맷팅
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[today.getDay()];
    
    return `${year}년 ${month}월 ${date}일 (${dayName}요일)`;
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 시간표</Text>
        <Text style={styles.date}>{getTodayDate()}</Text>
      </View>

      {/* 수업 리스트 */}
      {todayClasses.length > 0 ? (
        <ScrollView 
          style={styles.classList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.classListContent}
        >
          {todayClasses.map((schedule) => (
            <TodayClassCard 
              key={schedule.id} 
              schedule={schedule} 
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Calendar size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>오늘은 수업이 없어요</Text>
          <Text style={styles.emptySubText}>휴식을 취하거나 다른 일정을 확인해보세요</Text>
        </View>
      )}

      {/* 전체 시간표 보기 버튼 */}
      <TouchableOpacity 
        style={styles.viewAllButton}
        onPress={onViewAllTimetable}
        activeOpacity={0.7}
      >
        <Text style={styles.viewAllText}>전체 시간표 보기</Text>
        <ChevronRight size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.spacing.lg,
    paddingTop: 8, // 상단 탭과의 간격
  },
  header: {
    marginBottom: SIZES.spacing.lg,
  },
  title: {
    fontSize: SIZES.fontSize.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  date: {
    fontSize: SIZES.fontSize.md,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  classList: {
    flex: 1,
    marginBottom: SIZES.spacing.lg,
  },
  classListContent: {
    paddingBottom: SIZES.spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.spacing.xxl,
  },
  emptyText: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: SIZES.spacing.md,
    marginBottom: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  emptySubText: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.lg,
    paddingVertical: SIZES.spacing.md,
    paddingHorizontal: SIZES.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.spacing.lg,
  },
  viewAllText: {
    fontSize: SIZES.fontSize.md,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
