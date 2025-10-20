import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimetableHeader } from '../components/TimetableHeader';
import { WeekTabs } from '../components/WeekTabs';
import { TimetableGrid } from '../components/TimetableGrid';
import { ClassDetailModal } from '../components/ClassDetailModal';
import { DownloadModal } from '../components/DownloadModal';
import { AddScheduleModal } from '../components/AddScheduleModal';
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
  const [showClassDetail, setShowClassDetail] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleDownload = useCallback(() => {
    setShowDownloadModal(true);
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
    setSelectedClass(schedule);
    setShowClassDetail(true);
  }, []);

  const handleCloseClassDetail = useCallback(() => {
    setShowClassDetail(false);
    setSelectedClass(null);
  }, []);

  const handleCloseDownloadModal = useCallback(() => {
    setShowDownloadModal(false);
  }, []);

  const handleImageDownload = useCallback(() => {
    Alert.alert('이미지 저장', '시간표가 갤러리에 저장되었습니다.');
  }, []);

  const handlePDFDownload = useCallback(() => {
    Alert.alert('PDF 저장', '시간표 PDF가 생성되었습니다.');
  }, []);

  const handleCalendarSync = useCallback(() => {
    Alert.alert('캘린더 연동', '수업 일정이 캘린더에 추가되었습니다.');
  }, []);

  const handleMapPress = useCallback((schedule: ClassSchedule) => {
    Alert.alert('지도 보기', `${schedule.location} 위치를 지도에서 확인합니다.`);
  }, []);

  const handleMemoPress = useCallback((schedule: ClassSchedule) => {
    Alert.alert('메모 추가', '수업 메모를 추가할 수 있습니다.');
  }, []);

  const handleNotificationPress = useCallback((schedule: ClassSchedule) => {
    Alert.alert('알림 설정', '수업 시작 전 알림을 설정할 수 있습니다.');
  }, []);

  const handleEmptySlotPress = useCallback((day: number, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setShowAddSchedule(true);
  }, []);

  const handleCloseAddSchedule = useCallback(() => {
    setShowAddSchedule(false);
    setSelectedDay(0);
    setSelectedTime('');
  }, []);

  const handleSaveSchedule = useCallback((newSchedule: {
    name: string;
    professor: string;
    location: string;
    startTime: string;
    endTime: string;
    day: number;
  }) => {
    // 실제로는 여기서 weekData에 새 일정을 추가
    // 현재는 Alert로 확인만
    Alert.alert(
      '일정 추가됨',
      `${newSchedule.name} 수업이 ${newSchedule.startTime}에 추가되었습니다.`,
      [{ text: '확인' }]
    );
    
    setShowAddSchedule(false);
    setSelectedDay(0);
    setSelectedTime('');
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
        onEmptySlotPress={handleEmptySlotPress}
      />

      {/* 수업 상세 모달 */}
      <ClassDetailModal
        visible={showClassDetail}
        schedule={selectedClass}
        onClose={handleCloseClassDetail}
        onMapPress={handleMapPress}
        onMemoPress={handleMemoPress}
        onNotificationPress={handleNotificationPress}
      />

      {/* 다운로드 옵션 모달 */}
      <DownloadModal
        visible={showDownloadModal}
        onClose={handleCloseDownloadModal}
        onImageDownload={handleImageDownload}
        onPDFDownload={handlePDFDownload}
        onCalendarSync={handleCalendarSync}
      />

      {/* 일정 추가 모달 */}
      <AddScheduleModal
        visible={showAddSchedule}
        selectedDay={selectedDay}
        selectedTime={selectedTime}
        onClose={handleCloseAddSchedule}
        onSave={handleSaveSchedule}
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
