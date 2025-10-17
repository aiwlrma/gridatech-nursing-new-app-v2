import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableHeader } from '../components/TimetableHeader';
import { WeekTabs } from '../components/WeekTabs';
import { TimetableGrid } from '../components/TimetableGrid';
import { ClassSchedule, WeekData } from '../types';
import { COLORS } from '../constants';

// 예시 데이터
const mockWeekData: WeekData[] = [
  {
    week: 1,
    startDate: '2024-03-04',
    endDate: '2024-03-10',
    schedules: [
      {
        id: '1',
        day: 0, // 월요일
        startTime: '09:00',
        endTime: '11:00',
        name: '기초간호학',
        professor: '김교수',
        location: 'A동 302호',
        colorIndex: 0,
      },
      {
        id: '2',
        day: 1, // 화요일
        startTime: '13:00',
        endTime: '14:30',
        name: '성인간호학',
        professor: '이교수',
        location: 'B동 201호',
        colorIndex: 1,
      },
      {
        id: '3',
        day: 2, // 수요일
        startTime: '10:00',
        endTime: '12:00',
        name: '아동간호학',
        professor: '박교수',
        location: 'C동 103호',
        colorIndex: 2,
      },
      {
        id: '4',
        day: 3, // 목요일
        startTime: '14:00',
        endTime: '16:00',
        name: '정신간호학',
        professor: '최교수',
        location: 'D동 205호',
        colorIndex: 3,
      },
      {
        id: '5',
        day: 4, // 금요일
        startTime: '11:00',
        endTime: '13:00',
        name: '간호연구방법론',
        professor: '정교수',
        location: 'E동 301호',
        colorIndex: 4,
      },
    ],
  },
  {
    week: 2,
    startDate: '2024-03-11',
    endDate: '2024-03-17',
    schedules: [
      {
        id: '6',
        day: 0,
        startTime: '09:00',
        endTime: '11:00',
        name: '기초간호학',
        professor: '김교수',
        location: 'A동 302호',
        colorIndex: 0,
      },
      {
        id: '7',
        day: 2,
        startTime: '15:00',
        endTime: '17:00',
        name: '간호윤리학',
        professor: '한교수',
        location: 'F동 101호',
        colorIndex: 1,
      },
    ],
  },
];

interface TimetableScreenProps {
  onBack?: () => void;
}

export const TimetableScreen: React.FC<TimetableScreenProps> = ({ onBack }) => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weekData] = useState<WeekData[]>(mockWeekData);

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleDownload = useCallback(() => {
    Alert.alert(
      '시간표 다운로드',
      '시간표를 이미지로 다운로드하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '다운로드', onPress: () => console.log('다운로드') },
      ]
    );
  }, []);

  const handleWeekChange = useCallback((week: number) => {
    setCurrentWeek(week);
  }, []);

  const handlePreviousWeek = useCallback(() => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  }, [currentWeek]);

  const handleNextWeek = useCallback(() => {
    if (currentWeek < 16) {
      setCurrentWeek(currentWeek + 1);
    }
  }, [currentWeek]);

  const handleClassPress = useCallback((schedule: ClassSchedule) => {
    Alert.alert(
      schedule.name,
      `교수: ${schedule.professor}\n장소: ${schedule.location}\n시간: ${schedule.startTime} - ${schedule.endTime}`,
      [{ text: '확인' }]
    );
  }, []);

  // 현재 주차의 스케줄 가져오기
  const currentWeekData = weekData.find(week => week.week === currentWeek);
  const currentSchedules = currentWeekData?.schedules || [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TimetableHeader 
        onBack={handleBack}
        onDownload={handleDownload}
      />
      
      <WeekTabs
        currentWeek={currentWeek}
        onWeekChange={handleWeekChange}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />
      
      <TimetableGrid
        schedules={currentSchedules}
        onClassPress={handleClassPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
