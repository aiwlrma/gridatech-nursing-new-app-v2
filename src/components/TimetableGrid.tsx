import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { ClassBlock } from './ClassBlock';
import { ClassSchedule } from '../types';
import { COLORS, SIZES } from '../constants';

interface TimetableGridProps {
  schedules: ClassSchedule[];
  onClassPress?: (schedule: ClassSchedule) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  schedules,
  onClassPress,
}) => {
  const days = ['월', '화', '수', '목', '금'];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // 시간을 분으로 변환하는 함수
  const timeToMinutes = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  // 위치 계산 (09:00을 기준으로)
  const getTimePosition = (time: string): number => {
    const startHour = 9; // 09:00부터 시작
    const minutes = timeToMinutes(time);
    return (minutes - startHour * 60) * (60 / 60); // 1분 = 1px
  };

  // 그리드 높이 계산 (09:00-18:00 = 9시간 = 540px)
  const gridHeight = 9 * 60; // 540px

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* 요일 헤더 */}
      <View style={styles.header}>
        <View style={styles.timeColumn} />
        {days.map((day, index) => (
          <View key={index} style={styles.dayHeader}>
            <Text style={styles.dayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* 시간표 그리드 */}
      <View style={styles.timetable}>
        {/* 시간 컬럼 */}
        <View style={styles.timeColumn}>
          {timeSlots.map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>

        {/* 요일별 컬럼 */}
        <View style={styles.scheduleGrid}>
          {days.map((_, dayIndex) => (
            <View key={dayIndex} style={styles.dayColumn}>
              {/* 그리드 라인 */}
              {timeSlots.map((_, timeIndex) => (
                <View
                  key={timeIndex}
                  style={[
                    styles.gridLine,
                    { top: timeIndex * 60 }
                  ]}
                />
              ))}
              
              {/* 해당 요일의 수업들 */}
              {schedules
                .filter(schedule => schedule.day === dayIndex)
                .map((schedule) => (
                  <ClassBlock
                    key={schedule.id}
                    schedule={schedule}
                    onPress={onClassPress}
                  />
                ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SIZES.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeColumn: {
    width: 60,
    backgroundColor: COLORS.surface,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  dayHeader: {
    flex: 1,
    paddingVertical: SIZES.spacing.sm,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  timetable: {
    flexDirection: 'row',
    height: 540, // 9시간 * 60px
  },
  timeSlot: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  scheduleGrid: {
    flex: 1,
    flexDirection: 'row',
  },
  dayColumn: {
    flex: 1,
    position: 'relative',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.border,
  },
});
