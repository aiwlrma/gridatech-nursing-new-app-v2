import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { WebScrollView } from '../components/WebScrollView';
import { SmartHomeHeader } from '../components/SmartHomeHeader';
import { HeroCard } from '../components/HeroCard';
import { AppointmentCard } from '../components/AppointmentCard';
import { CollapsibleCalendar } from '../components/CollapsibleCalendar';
import { SvgIcon } from '../components/SvgIcon';
import { TabBar } from '../components/TabBar';
import { BLUE_THEME } from '../constants/blueTheme';

interface SmartHomeScreenProps {
  onNavigateToGrade?: () => void;
  onNavigateToTimetable?: () => void;
  onNavigateToAddReservation?: () => void;
  onNavigateToBadges?: () => void;
  onNavigateToReservationManagement?: () => void;
  onNavigateToMessage?: () => void;
  onNavigateToProfile?: () => void;
}

export const SmartHomeScreen: React.FC<SmartHomeScreenProps> = ({ 
  onNavigateToGrade,
  onNavigateToTimetable,
  onNavigateToAddReservation,
  onNavigateToBadges,
  onNavigateToReservationManagement,
  onNavigateToMessage,
  onNavigateToProfile
}) => {

  // 예약 데이터
  const appointments = [
    {
      id: '1',
      time: '14:00',
      title: '기초 간호 실습',
      location: '실습실 A동 302호',
      category: '실습',
    },
    {
      id: '2',
      time: '16:30',
      title: '성인간호학 이론',
      location: '강의실 B동 201호',
      category: '이론',
    },
  ];




  const handleNotificationPress = () => {
    console.log('알림 버튼 클릭');
  };

  const handleViewAll = () => {
    console.log('전체 보기');
  };

  const handleAddReservation = () => {
    console.log('새 예약 추가');
    onNavigateToAddReservation?.();
  };

  // 탭 바 데이터
  const tabs = [
    { id: 'home', label: '홈', iconName: 'home' },
    { id: 'timetable', label: '시간표', iconName: 'calendar' },
    { id: 'message', label: '메시지', iconName: 'message', hasNotification: true },
    { id: 'profile', label: '프로필', iconName: 'user' },
  ];

  const handleTabPress = (tabId: string) => {
    switch (tabId) {
      case 'home':
        // 이미 홈 화면이므로 아무것도 하지 않음
        break;
      case 'timetable':
        onNavigateToTimetable?.();
        break;
      case 'message':
        onNavigateToMessage?.();
        break;
      case 'profile':
        onNavigateToProfile?.();
        break;
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <SmartHomeHeader 
        onNotificationPress={handleNotificationPress}
      />
      
      <WebScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroCard 
          progress={75}
          completed={2}
          total={3}
          reservations={5}
          completedActivities={12}
          level={7}
        />
        
        <CollapsibleCalendar 
          onDateSelect={(date) => console.log('Selected date:', date)}
          hasEvents={{
            '2025-01-15': true,
            '2025-01-17': true,
            '2025-01-20': true,
          }}
        />
        
        {/* 빠른 액션 카드들 */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onNavigateToReservationManagement?.()}
          >
            <SvgIcon name="calendarNew" size={24} color="#1884FF" />
            <Text style={styles.actionText} numberOfLines={2}>예약 관리</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onNavigateToTimetable?.()}
          >
            <SvgIcon name="bookOpen" size={24} color="#1884FF" />
            <Text style={styles.actionText} numberOfLines={2}>시간표</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => onNavigateToGrade?.()}
          >
            <SvgIcon name="trophy" size={24} color="#1884FF" />
            <Text style={styles.actionText} numberOfLines={2}>성적 조회</Text>
          </TouchableOpacity>
        </View>
        
        <AppointmentCard 
          appointments={appointments}
          onViewAll={handleViewAll}
          onAddReservation={handleAddReservation}
        />
      </WebScrollView>
      
      <TabBar 
        tabs={tabs}
        activeTab="home"
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_THEME.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // 탭 바를 위한 여백
  },
  
  // 빠른 액션 카드들
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    height: 100, // 고정 높이 설정
    justifyContent: 'center', // 세로 중앙 정렬
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#191F28',
    textAlign: 'center',
  },
});
