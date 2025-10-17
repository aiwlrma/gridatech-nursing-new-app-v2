import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants';

interface DaySchedule {
  day: string;
  count: number;
  isToday?: boolean;
}

interface TodayClass {
  id: string;
  time: string;
  name: string;
  professor: string;
  location: string;
  color: string;
}

interface ScheduleCardProps {
  schedules: DaySchedule[];
  todayClasses?: TodayClass[];
  onViewAll?: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedules = [],
  todayClasses = [],
  onViewAll,
}) => {
  const totalClasses = schedules?.reduce((sum, schedule) => sum + schedule.count, 0) || 0;
  const today = new Date();
  const todayString = `${today.getMonth() + 1}월 ${today.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][today.getDay()]}요일)`;

  return (
    <View style={styles.container}>
      {/* 오늘의 시간표 섹션 */}
      <View style={styles.todaySection}>
        <Text style={styles.sectionTitle}>오늘의 시간표</Text>
        <Text style={styles.dateInfo}>{todayString}</Text>
        
        {todayClasses.length > 0 ? (
          <View style={styles.todayClasses}>
            {todayClasses.map((classItem) => (
              <View key={classItem.id} style={styles.classCard}>
                <View style={[styles.colorBar, { backgroundColor: classItem.color }]} />
                <View style={styles.classContent}>
                  <View style={styles.timeRow}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.classTime}>{classItem.time}</Text>
                  </View>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <View style={styles.classInfo}>
                    <Text style={styles.professor}>{classItem.professor}</Text>
                    <View style={styles.locationRow}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.location}>{classItem.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>오늘은 수업이 없어요</Text>
            <Text style={styles.emptySub}>푹 쉬는 하루 되세요! 😊</Text>
          </View>
        )}
      </View>

      {/* 주간 미니 타임라인 */}
      <View style={styles.weekSection}>
        <Text style={styles.miniTitle}>이번 주 한눈에</Text>
        <View style={styles.scheduleGrid}>
          {schedules?.map((schedule) => (
            <View key={schedule.day} style={styles.dayContainer}>
              <View style={[
                styles.dayBox,
                schedule.isToday && styles.todayBox,
              ]}>
                <Text style={[
                  styles.dayText,
                  schedule.isToday && styles.todayText,
                ]}>
                  {schedule.day}
                </Text>
                <Text style={[
                  styles.countText,
                  schedule.isToday && styles.todayCountText,
                ]}>
                  {schedule.count > 0 ? `${schedule.count}개` : '-'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      
      {/* 전체 시간표 보기 버튼 */}
      <TouchableOpacity style={styles.secondaryButton} onPress={onViewAll}>
        <Text style={styles.secondaryButtonText}>전체 시간표 보기</Text>
        <ChevronRight color="#1884FF" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  // 오늘의 시간표 섹션
  todaySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1F2E',
    marginBottom: 8,
  },
  dateInfo: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  todayClasses: {
    gap: 12,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  colorBar: {
    width: 4,
    borderRadius: 2,
    marginRight: 16,
  },
  classContent: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classTime: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginLeft: 6,
  },
  className: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 8,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  professor: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  // 주간 미니 타임라인
  weekSection: {
    marginBottom: 20,
  },
  miniTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 16,
  },
  scheduleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayBox: {
    width: 50,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  todayBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  todayText: {
    color: COLORS.surface,
  },
  countText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  todayCountText: {
    color: COLORS.surface,
  },
  // Secondary 버튼 (흰색 테두리)
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#1884FF',
    height: 56,
    borderRadius: 16,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#1884FF',
    fontWeight: '600',
  },
});
