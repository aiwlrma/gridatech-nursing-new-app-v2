import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';

interface Schedule {
  id: string;
  time: string;
  title: string;
  location: string;
  type: string;
  isNext?: boolean;
  isCompleted?: boolean;
}

interface TodayTimelineProps {
  schedules: Schedule[];
  onSchedulePress?: (schedule: Schedule) => void;
  onViewAll?: () => void;
}

export const TodayTimeline: React.FC<TodayTimelineProps> = ({
  schedules = [],
  onSchedulePress,
  onViewAll,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const getTimeUntilNext = (timeString: string) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    const scheduleTime = new Date();
    scheduleTime.setHours(hours, minutes, 0, 0);
    
    const diffMs = scheduleTime.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 0) return null; // 이미 지난 일정
    if (diffMinutes < 60) return `${diffMinutes}분 후`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}시간 후`;
  };

  const today = new Date();
  const todayString = formatDate(today);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 {todayString}</Text>
        {schedules.length > 2 && (
          <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>전체 보기</Text>
            <SvgIcon name="chevronRight" size={14} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {schedules.length > 0 ? (
        <View style={styles.timeline}>
          {schedules.slice(0, 2).map((schedule, index) => {
            const timeUntil = getTimeUntilNext(schedule.time);
            const isNext = index === 0 && timeUntil && parseInt(timeUntil) < 60;
            
            return (
              <TouchableOpacity
                key={schedule.id}
                style={[
                  styles.scheduleCard,
                  isNext && styles.nextScheduleCard,
                  schedule.isCompleted && styles.completedCard,
                ]}
                onPress={() => onSchedulePress?.(schedule)}
                activeOpacity={0.7}
              >
                <View style={styles.scheduleHeader}>
                  <View style={[
                    styles.timeBox,
                    isNext && styles.nextTimeBox,
                    schedule.isCompleted && styles.completedTimeBox,
                  ]}>
                    <Text style={[
                      styles.timeText,
                      isNext && styles.nextTimeText,
                      schedule.isCompleted && styles.completedTimeText,
                    ]}>
                      {schedule.time}
                    </Text>
                  </View>
                  
                  {isNext && (
                    <View style={styles.urgentBadge}>
                      <SvgIcon name="bell" size={12} color="#FFFFFF" />
                      <Text style={styles.urgentText}>
                        {timeUntil} 시작!
                      </Text>
                    </View>
                  )}
                </View>
                
                <Text style={[
                  styles.scheduleTitle,
                  schedule.isCompleted && styles.completedText,
                ]}>
                  {schedule.title}
                </Text>
                
                <View style={styles.scheduleLocation}>
                  <SvgIcon name="pin" size={12} color="#6B7280" />
                  <Text style={styles.locationText}>{schedule.location}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          
          {schedules.length > 2 && (
            <TouchableOpacity style={styles.moreButton} onPress={onViewAll}>
              <Text style={styles.moreText}>
                +{schedules.length - 2}개 더 보기
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>오늘 예약이 없어요</Text>
          <Text style={styles.emptySubText}>새로운 VR 실습을 예약해보세요</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeline: {
    gap: 8,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  nextScheduleCard: {
    borderWidth: 2,
    borderColor: '#1884FF',
    backgroundColor: '#F0F7FF',
  },
  completedCard: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: '#1884FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  nextTimeBox: {
    backgroundColor: '#1884FF',
  },
  completedTimeBox: {
    backgroundColor: '#9CA3AF',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  nextTimeText: {
    color: '#FFFFFF',
  },
  completedTimeText: {
    color: '#FFFFFF',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  urgentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 6,
  },
  completedText: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  scheduleLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  moreButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
