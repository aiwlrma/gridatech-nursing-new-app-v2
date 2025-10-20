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
  const top = (startMinutes - startHour * 60) * (60 / 60);
  const height = (endMinutes - startMinutes) * (60 / 60);

  return (
    <TouchableOpacity
      style={[
        styles.classBlock,
        {
          top,
          height,
          backgroundColor: color.bg,
          borderLeftColor: color.border,
        }
      ]}
      onPress={() => onPress?.(schedule)}
      activeOpacity={0.8}
    >
      <View style={styles.classContent}>
        <Text style={styles.className} numberOfLines={2}>
          {schedule.name}
        </Text>
        <Text style={styles.classInfo} numberOfLines={1}>
          👨‍🏫 {schedule.professor}
        </Text>
        <Text style={styles.classInfo} numberOfLines={1}>
          📍 {schedule.location}
        </Text>
        <Text style={styles.classTime} numberOfLines={1}>
          {schedule.startTime} - {schedule.endTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  classBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    borderRadius: 12,
    borderLeftWidth: 4,
    backgroundColor: 'transparent', // 그림자 최적화를 위한 배경색 설정
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  classContent: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  className: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
    lineHeight: 16,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  classInfo: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  classTime: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9CA3AF',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});
