import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { COLORS, TYPOGRAPHY, CARD_STYLES, BUTTON_STYLES, ICON_STYLES } from '../constants/designSystem';

interface NextActionCardProps {
  nextSchedule?: {
    time: string;
    title: string;
    location: string;
    preparationItems?: string[];
    minutesUntil?: number;
  };
  onPress?: () => void;
  onCheckIn?: () => void;
  onNavigate?: () => void;
}

export const NextActionCard: React.FC<NextActionCardProps> = ({
  nextSchedule,
  onPress,
  onCheckIn,
  onNavigate,
}) => {
  const getTimeDisplay = (minutesUntil?: number) => {
    if (!minutesUntil) return '';
    if (minutesUntil < 0) return '진행 중';
    if (minutesUntil < 60) return `${minutesUntil}분 후`;
    const hours = Math.floor(minutesUntil / 60);
    const minutes = minutesUntil % 60;
    return `${hours}시간 ${minutes}분 후`;
  };

  if (!nextSchedule) {
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.iconBadge}>
          <SvgIcon name="target" size={24} color={COLORS.primary} />
        </View>
        
        <Text style={styles.label}>다음 할 일</Text>
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>오늘 일정이 없어요</Text>
          <Text style={styles.emptySubText}>새로운 학습을 시작해보세요</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconBadge}>
        <SvgIcon name="target" size={24} color={COLORS.primary} />
      </View>
      
      <Text style={styles.label}>다음 할 일</Text>
      
      <View style={styles.timeContainer}>
        <View style={styles.timeBadge}>
          <SvgIcon name="clock" size={16} color="#FFFFFF" />
          <Text style={styles.timeText}>{nextSchedule.time}</Text>
        </View>
        <Text style={styles.countdown}>{getTimeDisplay(nextSchedule.minutesUntil)}</Text>
      </View>
      
      <Text style={styles.subjectTitle}>{nextSchedule.title}</Text>
      
      <View style={styles.infoRow}>
        <View style={styles.locationBadge}>
          <SvgIcon name="pin" size={14} color={COLORS.textSecondary} />
          <Text style={styles.locationText}>{nextSchedule.location}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={onCheckIn}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>출석 체크</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.ghostButton}
          onPress={onNavigate}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostButtonText}>길찾기</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 기본 카드
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.1)',
  },
  
  // 아이콘 배지
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  // 라벨
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  
  // 시간 컨테이너
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1884FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  
  
  timeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  
  countdown: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1884FF',
  },
  
  // 제목
  subjectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
    letterSpacing: -0.3,
    marginBottom: 12,
    lineHeight: 28,
  },
  
  // 정보 행
  infoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  
  
  locationText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  
  // 액션 버튼들
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  
  primaryButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#1884FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.1,
  },
  
  ghostButton: {
    flex: 1,
    height: 52,
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 132, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  ghostButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1884FF',
    letterSpacing: -0.1,
  },
  
  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
    marginBottom: 4,
  },
  
  emptySubText: {
    fontSize: 15,
    color: '#6B7280',
  },
});