import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { ClassBlock } from './ClassBlock';
import { ClassSchedule } from '../types';
import { COLORS, SIZES } from '../constants';

interface TimetableGridProps {
  schedules: ClassSchedule[];
  onClassPress?: (schedule: ClassSchedule) => void;
  onEmptySlotPress?: (day: number, time: string) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  schedules,
  onClassPress,
  onEmptySlotPress,
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

  // 현재 시간 위치 계산
  const getCurrentTimePosition = (): number => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startHour = 9; // 09:00부터 시작
    
    if (currentHour < startHour || currentHour >= 18) {
      return -1; // 표시하지 않음
    }
    
    const totalMinutes = (currentHour - startHour) * 60 + currentMinute;
    return totalMinutes; // 1분 = 1px
  };

  // 특정 요일과 시간에 수업이 있는지 확인
  const hasClassAtTime = (day: number, time: string): boolean => {
    return schedules.some(schedule => 
      schedule.day === day && 
      schedule.startTime === time
    );
  };

  // 빈 칸 클릭 핸들러
  const handleEmptySlotPress = (day: number, time: string) => {
    onEmptySlotPress?.(day, time);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        <View style={styles.timetableContainer}>
          {/* 요일 헤더 */}
          <View style={styles.header}>
            <View style={styles.timeColumn} />
            {days.map((day, index) => (
              <View key={index} style={styles.dayHeader}>
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.daySubtext}>
                  {new Date().getDate() + index}
                </Text>
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
                  
                  {/* 현재 시간 표시선 */}
                  <View style={[styles.currentTimeLine, { top: getCurrentTimePosition() }]} />
                  
                  {/* 빈 칸들 (클릭 가능) - 미니멀 디자인 */}
                  {timeSlots.map((time, timeIndex) => {
                    const hasClass = hasClassAtTime(dayIndex, time);
                    if (hasClass) return null; // 수업이 있으면 빈 칸 렌더링하지 않음
                    
                    return (
                      <TouchableOpacity
                        key={`empty-${dayIndex}-${time}`}
                        style={[
                          styles.emptySlot,
                          { top: timeIndex * 60 }
                        ]}
                        onPress={() => handleEmptySlotPress(dayIndex, time)}
                        activeOpacity={0.3}
                      >
                        {/* 빈 영역 - 시각적 표시 없음 */}
                      </TouchableOpacity>
                    );
                  })}
                  
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  horizontalScroll: {
    flex: 1,
  },
  timetableContainer: {
    minWidth: 400,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeColumn: {
    width: 60,
    backgroundColor: COLORS.surface,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  dayHeader: {
    flex: 1,
    paddingVertical: SIZES.spacing.md,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  daySubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  timetable: {
    flexDirection: 'row',
    height: 540, // 9시간 * 60px
    backgroundColor: COLORS.surface,
  },
  timeSlot: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
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
    backgroundColor: COLORS.surface,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.border,
  },
  currentTimeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.primary,
    zIndex: 10,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  emptySlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
    // 시각적 표시 없이 투명한 클릭 영역만 제공
  },
});
