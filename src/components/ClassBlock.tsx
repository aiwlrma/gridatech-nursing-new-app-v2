import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { ClassSchedule } from '../types';

interface ClassBlockProps {
  schedule: ClassSchedule;
  onPress?: (schedule: ClassSchedule) => void;
}

// 수업 블록 색상 정의
const classColors = [
  { bg: '#E3F2FD', border: '#1884FF' }, // 파랑
  { bg: '#FFF7ED', border: '#F59E0B' }, // 주황
  { bg: '#ECFDF5', border: '#10B981' }, // 초록
  { bg: '#F5F3FF', border: '#8B5CF6' }, // 보라
  { bg: '#FEF2F2', border: '#EF4444' }, // 빨강
];

export const ClassBlock: React.FC<ClassBlockProps> = ({ schedule, onPress }) => {
  const color = classColors[schedule.colorIndex] || classColors[0];
  
  // 시간을 분으로 변환하는 함수
  const timeToMinutes = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  // 위치 계산 (09:00을 기준으로)
  const startMinutes = timeToMinutes(schedule.startTime);
  const endMinutes = timeToMinutes(schedule.endTime);
  const startHour = 9; // 09:00부터 시작
  const top = (startMinutes - startHour * 60) * (60 / 60); // 1분 = 1px
  const height = (endMinutes - startMinutes) * (60 / 60); // 1분 = 1px

  return (
    <TouchableOpacity
      style={[
        styles.classBlock,
        {
          top,
          height,
          backgroundColor: color.bg,
          borderLeftColor: color.border,
        },
      ]}
      onPress={() => onPress?.(schedule)}
      activeOpacity={0.8}
    >
      <Text style={styles.className} numberOfLines={1}>
        {schedule.name}
      </Text>
      <Text style={styles.classInfo} numberOfLines={1}>
        {schedule.professor}
      </Text>
      <Text style={styles.classInfo} numberOfLines={1}>
        {schedule.location}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  classBlock: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  className: {
    fontSize: 14,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 2,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  classInfo: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 1,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
});
