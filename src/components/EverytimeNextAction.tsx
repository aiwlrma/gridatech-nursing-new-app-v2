import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { EVERYTIME_COLORS, EVERYTIME_TYPOGRAPHY, EVERYTIME_SPACING } from '../constants/everytimeTheme';

interface NextSchedule {
  time: string;
  title: string;
  location: string;
  minutesUntil?: number;
}

interface EverytimeNextActionProps {
  nextSchedule?: NextSchedule;
  onPress?: () => void;
  onCheckIn?: () => void;
  onNavigate?: () => void;
}

export const EverytimeNextAction: React.FC<EverytimeNextActionProps> = ({
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
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>다음 일정</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>오늘 일정이 없어요</Text>
          <Text style={styles.emptySubText}>새로운 학습을 시작해보세요</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>다음 일정</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.scheduleItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.time}>{nextSchedule.time}</Text>
        <View style={styles.scheduleInfo}>
          <Text style={styles.title}>{nextSchedule.title}</Text>
          <Text style={styles.location}>{nextSchedule.location}</Text>
          <Text style={styles.countdown}>{getTimeDisplay(nextSchedule.minutesUntil)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.actionIcon}
          onPress={onNavigate}
          activeOpacity={0.7}
        >
          <SvgIcon name="pin" size={16} color={EVERYTIME_COLORS.textSecondary} />
        </TouchableOpacity>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.checkInButton}
          onPress={onCheckIn}
          activeOpacity={0.7}
        >
          <Text style={styles.checkInButtonText}>출석 체크</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navigateButton}
          onPress={onNavigate}
          activeOpacity={0.7}
        >
          <Text style={styles.navigateButtonText}>길찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: EVERYTIME_COLORS.primary,
    letterSpacing: 0.5,
  },
  
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  
  time: {
    fontSize: 16,
    fontWeight: '700',
    color: EVERYTIME_COLORS.primary,
    width: 50,
  },
  
  scheduleInfo: {
    flex: 1,
  },
  
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 2,
  },
  
  location: {
    fontSize: 13,
    fontWeight: '400',
    color: EVERYTIME_COLORS.textSecondary,
    marginBottom: 2,
  },
  
  countdown: {
    fontSize: 12,
    fontWeight: '500',
    color: EVERYTIME_COLORS.primary,
  },
  
  actionIcon: {
    padding: 8,
  },
  
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  
  checkInButton: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  checkInButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  navigateButton: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.accentLight,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  navigateButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: EVERYTIME_COLORS.primary,
  },
  
  emptyState: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 4,
  },
  
  emptySubText: {
    fontSize: 13,
    color: EVERYTIME_COLORS.textSecondary,
  },
});
