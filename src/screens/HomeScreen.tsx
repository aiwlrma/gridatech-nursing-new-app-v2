import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { COLORS } from '../constants';
import { HomeHeader } from '../components/HomeHeader';
import { HomeTabBar } from '../components/HomeTabBar';
import { AppointmentCard } from '../components/AppointmentCard';
import { ScheduleCard } from '../components/ScheduleCard';
import { GradeCard } from '../components/GradeCard';
import { WebScrollView } from '../components/WebScrollView';
import { AddReservationScreen } from './AddReservationScreen';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [showAddReservation, setShowAddReservation] = useState(false);

  // 탭 데이터
  const tabs = [
    { id: 'reservations', label: '예약 관리' },
    { id: 'schedule', label: '시간표' },
    { id: 'grades', label: '성적 조회' },
  ];

  // 예약 데이터
  const reservations = [
    {
      id: '1',
      time: '14:00',
      title: '기초 간호 실습',
      location: '실습실 A동 302호',
    },
    {
      id: '2',
      time: '16:30',
      title: '성인간호학 이론',
      location: '강의실 B동 201호',
    },
  ];

  // 시간표 데이터
  const scheduleData = [
    { day: '월', count: 3, isToday: false },
    { day: '화', count: 2, isToday: false },
    { day: '수', count: 0, isToday: true },
    { day: '목', count: 4, isToday: false },
    { day: '금', count: 1, isToday: false },
  ];

  // 오늘의 수업 데이터
  const todayClasses = [
    {
      id: '1',
      time: '14:00 - 16:00',
      name: '정신간호학',
      professor: '최교수',
      location: 'D동 205호',
      color: '#8B5CF6',
    },
    {
      id: '2',
      time: '16:30 - 18:30',
      name: '성인간호학',
      professor: '김교수',
      location: 'B동 201호',
      color: '#F59E0B',
    },
  ];

  // 성적 데이터
  const grades = [
    { id: '1', subject: '기초간호학', score: 95, grade: 'A+', date: '2025.01.10' },
    { id: '2', subject: '성인간호학', score: 88, grade: 'B+', date: '2025.01.08' },
    { id: '3', subject: '아동간호학', score: 92, grade: 'A', date: '2025.01.05' },
  ];



  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleNotificationPress = () => {
    console.log('알림 버튼 클릭');
  };

  const handleProfilePress = () => {
    console.log('프로필 버튼 클릭');
  };

  const handleAddReservation = () => {
    console.log('새 예약 버튼 클릭됨');
    setShowAddReservation(true);
  };

  const handleCloseAddReservation = () => {
    setShowAddReservation(false);
  };

  const handleReservationNext = (selectedDate: string, selectedTime: string) => {
    console.log('예약 정보:', { selectedDate, selectedTime });
    // 다음 단계로 이동하거나 예약 완료 처리
    setShowAddReservation(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'reservations':
        return (
          <AppointmentCard 
            appointments={reservations}
            onViewAll={() => console.log('예약 전체 보기')}
            onAddReservation={handleAddReservation}
          />
        );
      case 'schedule':
        return (
          <ScheduleCard 
            schedules={scheduleData}
            todayClasses={todayClasses}
            onViewAll={() => console.log('전체 시간표 보기')}
          />
        );
      case 'grades':
        return (
          <GradeCard 
            averageScore={92}
            grades={grades}
            level={7}
            xp={2450}
            badges={12}
            onViewDetails={() => console.log('전체 성적 보기')}
          />
        );
      default:
        return null;
    }
  };

  if (showAddReservation) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>새 예약 화면</Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#1884FF', padding: 20, borderRadius: 10 }}
          onPress={handleCloseAddReservation}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>닫기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader 
        onNotificationPress={handleNotificationPress}
        onProfilePress={handleProfilePress}
      />
      <HomeTabBar 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
      <WebScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </WebScrollView>
      
      {/* 디버그 정보 */}
      {__DEV__ && (
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>showAddReservation: {showAddReservation.toString()}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
    // 웹에서 스크롤 개선
    ...(Platform.OS === 'web' && {
      height: '100%' as any,
      overflow: 'auto' as any,
      WebkitOverflowScrolling: 'touch' as any,
    }),
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    // 웹에서 최소 높이 보장
    ...(Platform.OS === 'web' && {
      minHeight: '100%',
    }),
  },
  debugInfo: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 5,
  },
  debugText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
