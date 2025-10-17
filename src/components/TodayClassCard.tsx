import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ClassSchedule } from '../types';
import { COLORS, SIZES } from '../constants';

interface TodayClassCardProps {
  schedule: ClassSchedule;
}

// 수업 블록 색상 정의
const classColors = [
  { bg: '#E3F2FD', border: '#1884FF' }, // 파랑
  { bg: '#FFF7ED', border: '#F59E0B' }, // 주황
  { bg: '#ECFDF5', border: '#10B981' }, // 초록
  { bg: '#F5F3FF', border: '#8B5CF6' }, // 보라
  { bg: '#FEF2F2', border: '#EF4444' }, // 빨강
];

export const TodayClassCard: React.FC<TodayClassCardProps> = ({ schedule }) => {
  const color = classColors[schedule.colorIndex] || classColors[0];

  return (
    <View style={styles.card}>
      {/* 좌측 컬러 바 */}
      <View style={[styles.colorBar, { backgroundColor: color.border }]} />
      
      <View style={styles.content}>
        <Text style={styles.time}>
          {schedule.startTime} - {schedule.endTime}
        </Text>
        
        <Text style={styles.name} numberOfLines={1}>
          {schedule.name}
        </Text>
        
        <View style={styles.info}>
          <Text style={styles.professor} numberOfLines={1}>
            {schedule.professor}
          </Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.location} numberOfLines={1}>
            {schedule.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.borderRadius.lg,
    marginBottom: SIZES.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  colorBar: {
    width: 4,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: SIZES.spacing.md,
  },
  time: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  name: {
    fontSize: SIZES.fontSize.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.spacing.xs,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professor: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    flex: 1,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  separator: {
    fontSize: SIZES.fontSize.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SIZES.spacing.xs,
  },
  location: {
    fontSize: SIZES.fontSize.sm,
    fontWeight: '500',
    color: COLORS.textSecondary,
    flex: 1,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
});
