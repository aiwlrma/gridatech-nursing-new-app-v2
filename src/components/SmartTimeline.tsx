import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SvgIcon } from './SvgIcon';

interface Schedule {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  location: string;
  type: string;
  isOngoing?: boolean;
  isNext?: boolean;
  isCompleted?: boolean;
}

interface SmartTimelineProps {
  schedules: Schedule[];
  onSchedulePress?: (schedule: Schedule) => void;
  onViewAll?: () => void;
}

export const SmartTimeline: React.FC<SmartTimelineProps> = ({
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

  const getMinutesUntil = (timeString: string) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    const scheduleTime = new Date();
    scheduleTime.setHours(hours, minutes, 0, 0);
    
    const diffMs = scheduleTime.getTime() - now.getTime();
    return Math.floor(diffMs / (1000 * 60));
  };

  const getUrgencyBadge = (schedule: Schedule) => {
    const minutesUntil = getMinutesUntil(schedule.time);
    
    if (schedule.isOngoing) {
      return { text: '진행 중', color: '#EF4444', bgColor: '#FEE2E2' };
    }
    if (minutesUntil <= 15 && minutesUntil > 0) {
      return { text: `${minutesUntil}분 후!`, color: '#EF4444', bgColor: '#FEE2E2' };
    }
    if (minutesUntil <= 60 && minutesUntil > 0) {
      return { text: `${minutesUntil}분 후`, color: '#F59E0B', bgColor: '#FEF3C7' };
    }
    return null;
  };

  const categorizeSchedules = (schedules: Schedule[]) => {
    const now = new Date();
    const ongoing = schedules.filter(s => s.isOngoing);
    const upcoming = schedules.filter(s => {
      const minutesUntil = getMinutesUntil(s.time);
      return !s.isOngoing && !s.isCompleted && minutesUntil <= 60 && minutesUntil > 0;
    });
    const remaining = schedules.filter(s => {
      const minutesUntil = getMinutesUntil(s.time);
      return !s.isOngoing && !s.isCompleted && minutesUntil > 60;
    });

    return { ongoing, upcoming, remaining };
  };

  const { ongoing, upcoming, remaining } = categorizeSchedules(schedules);
  const today = new Date();
  const todayString = formatDate(today);

  const renderScheduleCard = (schedule: Schedule, priority: 'high' | 'medium' | 'low') => {
    const urgencyBadge = getUrgencyBadge(schedule);
    const isHighPriority = priority === 'high';
    const isMediumPriority = priority === 'medium';

    return (
      <TouchableOpacity
        key={schedule.id}
        style={[
          styles.scheduleCard,
          isHighPriority && styles.ongoingCard,
          isMediumPriority && styles.upcomingCard,
          priority === 'low' && styles.remainingCard,
        ]}
        onPress={() => onSchedulePress?.(schedule)}
        activeOpacity={0.7}
      >
        <View style={styles.scheduleHeader}>
          <View style={[
            styles.timeBox,
            isHighPriority && styles.ongoingTimeBox,
            isMediumPriority && styles.upcomingTimeBox,
            priority === 'low' && styles.remainingTimeBox,
          ]}>
            <Text style={[
              styles.timeText,
              isHighPriority && styles.ongoingTimeText,
              isMediumPriority && styles.upcomingTimeText,
              priority === 'low' && styles.remainingTimeText,
            ]}>
              {schedule.time}
            </Text>
          </View>
          
          {urgencyBadge && (
            <View style={[styles.urgencyBadge, { backgroundColor: urgencyBadge.bgColor }]}>
              <Text style={[styles.urgencyText, { color: urgencyBadge.color }]}>
                {urgencyBadge.text}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={[
          styles.scheduleTitle,
          isHighPriority && styles.ongoingTitle,
          isMediumPriority && styles.upcomingTitle,
          priority === 'low' && styles.remainingTitle,
        ]}>
          {schedule.title}
        </Text>
        
        <View style={styles.scheduleLocation}>
          <SvgIcon name="pin" size={12} color="#6B7280" />
          <Text style={styles.locationText}>{schedule.location}</Text>
        </View>

        {/* 맥락 액션 버튼들 */}
        {(isHighPriority || isMediumPriority) && (
          <View style={styles.contextActions}>
            <TouchableOpacity style={styles.contextButton}>
              <SvgIcon name="mapPin" size={14} color="#1884FF" />
              <Text style={styles.contextButtonText}>길찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contextButton}>
              <SvgIcon name="edit" size={14} color="#1884FF" />
              <Text style={styles.contextButtonText}>메모</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 {todayString}</Text>
        {schedules.length > 3 && (
          <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>전체 보기</Text>
            <SvgIcon name="chevronRight" size={14} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {schedules.length > 0 ? (
        <View style={styles.timeline}>
          {/* 진행 중인 일정 */}
          {ongoing.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔴 지금 진행 중</Text>
              {ongoing.map(schedule => renderScheduleCard(schedule, 'high'))}
            </View>
          )}

          {/* 1시간 이내 일정 */}
          {upcoming.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔵 다음 일정 (1시간 이내)</Text>
              {upcoming.map(schedule => renderScheduleCard(schedule, 'medium'))}
            </View>
          )}

          {/* 오늘 남은 일정 */}
          {remaining.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚪ 오늘 남은 일정</Text>
              {remaining.slice(0, 2).map(schedule => renderScheduleCard(schedule, 'low'))}
              {remaining.length > 2 && (
                <TouchableOpacity style={styles.moreButton} onPress={onViewAll}>
                  <Text style={styles.moreText}>
                    +{remaining.length - 2}개 더 보기
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyText}>오늘은 일정이 없어요!</Text>
          <View style={styles.emptyActions}>
            <TouchableOpacity style={styles.emptyActionButton}>
              <Text style={styles.emptyActionText}>시간표 보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emptyActionButton}>
              <Text style={styles.emptyActionText}>예약 추가하기</Text>
            </TouchableOpacity>
          </View>
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
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  
  // 기본 카드 스타일
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
  
  // 진행 중 카드 (최상위)
  ongoingCard: {
    borderWidth: 2,
    borderColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },
  
  // 1시간 이내 카드 (2순위)
  upcomingCard: {
    borderWidth: 2,
    borderColor: '#1884FF',
    backgroundColor: '#DBEAFE',
  },
  
  // 남은 일정 카드 (3순위)
  remainingCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    opacity: 0.8,
  },
  
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  // 시간 박스 스타일
  timeBox: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ongoingTimeBox: {
    backgroundColor: '#EF4444',
  },
  upcomingTimeBox: {
    backgroundColor: '#1884FF',
  },
  remainingTimeBox: {
    backgroundColor: '#6B7280',
  },
  
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ongoingTimeText: {
    color: '#FFFFFF',
  },
  upcomingTimeText: {
    color: '#FFFFFF',
  },
  remainingTimeText: {
    color: '#FFFFFF',
  },
  
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // 제목 스타일
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 6,
  },
  ongoingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
  },
  upcomingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#191F28',
  },
  remainingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  scheduleLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  // 맥락 액션 버튼들
  contextActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  contextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  contextButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1884FF',
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
  
  // 빈 상태
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
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 16,
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  emptyActionButton: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1884FF',
  },
});
