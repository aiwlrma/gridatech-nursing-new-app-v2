import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, Alert, Platform, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimetableHeader } from '../components/TimetableHeader';
import { WeekTabs } from '../components/WeekTabs';
import { TimetableGrid } from '../components/TimetableGrid';
import { ClassDetailModal } from '../components/ClassDetailModal';
import { DownloadModal } from '../components/DownloadModal';
import { AddScheduleModal } from '../components/AddScheduleModal';
import { ClassSchedule, WeekData, Schedule } from '../types';
import { COLORS } from '../constants';
import { useTimetable } from '../contexts/TimetableContext';

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
  // Context에서 상태와 액션 가져오기
  const { weekData, currentWeek, isLoading, loadWeekData, addSchedule, deleteSchedule, setCurrentWeek } = useTimetable();
  
  // 로컬 UI 상태들
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showClassDetail, setShowClassDetail] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // 유틸리티 함수들
  const generateId = (): string => {
    return `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const getRandomColor = (): string => {
    const colors = [
      '#EF4444',  // 빨강
      '#F59E0B',  // 주황
      '#10B981',  // 초록
      '#3B82F6',  // 파랑
      '#8B5CF6',  // 보라
      '#EC4899',  // 핑크
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const timeToMinutes = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  const isTimeOverlap = (start: string, end: string, targetTime: string): boolean => {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const targetMinutes = timeToMinutes(targetTime);
    return targetMinutes >= startMinutes && targetMinutes < endMinutes;
  };

  const dayNumberToDay = (dayNumber: number): 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const;
    return days[dayNumber];
  };

  // schedules 데이터 로드 함수
  const loadSchedules = useCallback(async () => {
    try {
      const savedSchedules = await AsyncStorage.getItem('schedules');
      if (savedSchedules) {
        const parsedSchedules = JSON.parse(savedSchedules);
        console.log('저장된 schedules 로드됨:', parsedSchedules);
        setSchedules(parsedSchedules);
      }
    } catch (error) {
      console.error('schedules 로드 실패:', error);
    }
  }, []);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadWeekData();
    loadSchedules();
  }, [loadWeekData, loadSchedules]);

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handleDownload = useCallback(() => {
    setShowDownloadModal(true);
  }, []);

  const handleWeekChange = useCallback((week: number) => {
    setCurrentWeek(week);
  }, [setCurrentWeek]);

  const handlePreviousWeek = useCallback(() => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  }, [currentWeek, setCurrentWeek]);

  const handleNextWeek = useCallback(() => {
    if (currentWeek < 16) {
      setCurrentWeek(currentWeek + 1);
    }
  }, [currentWeek, setCurrentWeek]);

  const handleClassPress = useCallback((schedule: ClassSchedule) => {
    setSelectedClass(schedule);
    setShowClassDetail(true);
  }, []);

  // 새로운 Schedule 타입의 일정 클릭 핸들러
  const handleNewSchedulePress = useCallback((schedule: Schedule) => {
    console.log('새 일정 클릭됨:', schedule);
    // Schedule을 ClassSchedule 형태로 변환하여 상세 모달에 전달
    const classSchedule: ClassSchedule = {
      id: schedule.id,
      day: ['MON', 'TUE', 'WED', 'THU', 'FRI'].indexOf(schedule.day),
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      name: schedule.title,
      professor: schedule.professor,
      location: schedule.location,
      colorIndex: 0, // 기본 색상 인덱스
    };
    setSelectedClass(classSchedule);
    setShowClassDetail(true);
  }, []);

  // 삭제 확인 모달 열기 (개선된 플로우)
  const handleDeletePress = useCallback(() => {
    console.log('🗑️ handleDeletePress 호출됨!');
    // 1. 먼저 상세 모달 닫기
    setShowClassDetail(false);
    
    // 2. 짧은 딜레이 후 삭제 모달 열기
    setTimeout(() => {
      console.log('🗑️ showDeleteConfirm을 true로 설정');
      setShowDeleteConfirm(true);
    }, 300); // 애니메이션 대기
  }, []);

  // 일정 삭제 함수 (Context 사용)
  const handleDeleteSchedule = useCallback(() => {
    console.log('🗑️ handleDeleteSchedule 호출됨');
    console.log('🗑️ selectedClass:', selectedClass);
    console.log('🗑️ currentWeek:', currentWeek);
    
    if (selectedClass) {
      console.log('🗑️ 삭제 시작:', selectedClass);
      
      // Context를 통해 일정 삭제
      console.log('🗑️ Context deleteSchedule 호출 전');
      deleteSchedule(currentWeek, selectedClass.id);
      console.log('🗑️ Context deleteSchedule 호출 완료');
      
      // schedules에서도 해당 일정 제거 (새로 추가된 일정인 경우)
      setSchedules(prevSchedules => {
        console.log('🗑️ schedules 업데이트 전:', prevSchedules);
        const updatedSchedules = prevSchedules.filter(s => s.id !== selectedClass.id);
        console.log('🗑️ schedules 업데이트 후:', updatedSchedules);
        // 로컬 스토리지에 저장
        AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
        return updatedSchedules;
      });
      
      const deletedScheduleName = selectedClass.name;
      
      // 모달 모두 닫기
      setShowDeleteConfirm(false);
      setShowClassDetail(false);
      setSelectedClass(null);
      
      Alert.alert('삭제 완료', `${deletedScheduleName} 수업이 삭제되었습니다.`);
    } else {
      console.log('🗑️ selectedClass가 null입니다!');
    }
  }, [selectedClass, currentWeek, deleteSchedule]);

  const handleCloseClassDetail = useCallback(() => {
    setShowClassDetail(false);
    setSelectedClass(null);
  }, []);

  // 삭제 취소 핸들러 (개선된 플로우)
  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    
    // 상세 모달 다시 열기 (선택사항)
    setTimeout(() => {
      if (selectedClass) {
        setShowClassDetail(true);
      }
    }, 300);
  }, [selectedClass]);

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

  const handleSaveSchedule = useCallback((formData: {
    name: string;
    professor: string;
    location: string;
    startTime: string;
    endTime: string;
    day: number;
  }) => {
    console.log('🚀 handleSaveSchedule 함수가 호출되었습니다!');
    console.log('새 일정 저장 시작:', formData);
    console.log('현재 주차:', currentWeek);
    console.log('선택된 요일:', selectedDay);

    // 유효성 검사
    if (!formData.name.trim()) {
      Alert.alert('입력 오류', '수업명을 입력해주세요.');
      return;
    }
    if (!formData.professor.trim()) {
      Alert.alert('입력 오류', '교수명을 입력해주세요.');
      return;
    }
    if (!formData.location.trim()) {
      Alert.alert('입력 오류', '장소를 입력해주세요.');
      return;
    }
    if (formData.startTime >= formData.endTime) {
      Alert.alert('입력 오류', '종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    // 새 일정 객체 생성 (ClassSchedule 형태로)
    const newClassSchedule: ClassSchedule = {
      id: generateId(),
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      name: formData.name.trim(),
      professor: formData.professor.trim(),
      location: formData.location.trim(),
      colorIndex: Math.floor(Math.random() * 8), // 0-7 색상 인덱스
    };

    console.log('생성된 새 일정:', newClassSchedule);

    // Context를 통해 일정 추가
    addSchedule(currentWeek, newClassSchedule);

    Alert.alert(
      '일정 추가됨',
      `${formData.name} 수업이 ${formData.startTime}에 추가되었습니다.`,
      [{ text: '확인' }]
    );
    
    setShowAddSchedule(false);
    setSelectedDay(0);
    setSelectedTime('');
  }, [currentWeek, selectedDay, schedules]);

  // 현재 주차의 스케줄 가져오기
  const currentWeekData = useMemo(() => 
    weekData.find(week => week.week === currentWeek), 
    [weekData, currentWeek]
  );
  
  const currentSchedules = useMemo(() => {
    const data = currentWeekData?.schedules || [];
    console.log('currentSchedules 계산됨:', data.length);
    return data;
  }, [currentWeekData]);
  
  // 현재 주차의 새 schedules 필터링
  const currentWeekSchedules = useMemo(() => {
    const filtered = schedules.filter(schedule => schedule.week === currentWeek);
    console.log('currentWeekSchedules 계산됨:', filtered.length);
    return filtered;
  }, [schedules, currentWeek]);

  console.log('TimetableScreen 렌더링됨');
  console.log('현재 주차 데이터:', currentWeekData);
  console.log('현재 스케줄들:', currentSchedules);
  console.log('전체 weekData:', weekData);

  
  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>시간표를 불러오는 중...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <TimetableHeader 
          onBack={handleBack}
          onMenu={handleDownload}
        />
        
        <WeekTabs
          currentWeek={currentWeek}
          onWeekChange={handleWeekChange}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
        />
        
        <View style={styles.timetableContainer}>
          <TimetableGrid
            key={`timetable-${currentWeek}-${currentSchedules.length}-${currentWeekSchedules.length}`}
            schedules={currentSchedules}
            newSchedules={currentWeekSchedules}
            onClassPress={handleClassPress}
            onNewSchedulePress={handleNewSchedulePress}
            onEmptySlotPress={handleEmptySlotPress}
          />
        </View>
      </SafeAreaView>

      {/* 수업 상세 모달 */}
      <ClassDetailModal
        visible={showClassDetail}
        schedule={selectedClass}
        onClose={handleCloseClassDetail}
        onMapPress={handleMapPress}
        onMemoPress={handleMemoPress}
        onNotificationPress={handleNotificationPress}
        onDelete={handleDeletePress}
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

      {/* 삭제 확인 모달 */}
      <Modal 
        visible={showDeleteConfirm} 
        transparent={true}
        animationType="fade"
        statusBarTranslucent={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>일정을 삭제할까요?</Text>
            <Text style={styles.confirmText}>
              삭제된 일정은 복구할 수 없어요.
            </Text>
            
            <View style={styles.confirmButtons}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={handleCancelDelete}
              >
                <Text style={styles.cancelBtnText}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={handleDeleteSchedule}
              >
                <Text style={styles.confirmBtnText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  safeArea: {
    flex: 1,
  },
  timetableContainer: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  // 삭제 확인 모달 스타일 (개선된 zIndex)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 더 어둡게
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000, // ⬆️ 더 높게
    elevation: 100000, // ⬆️ 더 높게
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  confirmModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20, // 패딩 증가
    width: '80%', // 너비 증가
    maxWidth: 320, // 최대 너비 증가
    zIndex: 100001, // ⬆️ overlay보다 높게
    elevation: 100001,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8, // 그림자 증가
    },
    shadowOpacity: 0.3, // 그림자 진하게
    shadowRadius: 16, // 그림자 반경 증가
  },
  confirmTitle: {
    fontSize: 18, // 폰트 크기 증가
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 8, // 마진 증가
    textAlign: 'center',
  },
  confirmText: {
    fontSize: 14, // 폰트 크기 증가
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 24, // 마진 증가
    textAlign: 'center',
    lineHeight: 20, // 줄 간격 증가
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: 12, // 간격 증가
  },
  cancelBtn: {
    flex: 1,
    height: 48, // 높이 증가
    backgroundColor: '#F3F4F6',
    borderRadius: 12, // 모서리 둥글게
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 15, // 폰트 크기 증가
    fontWeight: '600',
    color: '#6B7280',
  },
  confirmBtn: {
    flex: 1,
    height: 48, // 높이 증가
    backgroundColor: '#EF4444',
    borderRadius: 12, // 모서리 둥글게
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: 15, // 폰트 크기 증가
    fontWeight: '700', // 굵게
    color: '#FFFFFF',
  },
});
