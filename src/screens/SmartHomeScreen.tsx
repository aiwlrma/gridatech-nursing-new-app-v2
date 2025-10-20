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
  onNavigateToNursingBadges?: () => void;
  onNavigateToTodayReservations?: () => void;
  onNavigateToNotice?: () => void;
}

export const SmartHomeScreen: React.FC<SmartHomeScreenProps> = ({ 
  onNavigateToGrade,
  onNavigateToTimetable,
  onNavigateToAddReservation,
  onNavigateToBadges,
  onNavigateToReservationManagement,
  onNavigateToMessage,
  onNavigateToProfile,
  onNavigateToNursingBadges,
  onNavigateToTodayReservations,
  onNavigateToNotice
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
    onNavigateToTodayReservations?.();
  };

  const handleAddReservation = () => {
    console.log('새 예약 추가');
    onNavigateToAddReservation?.();
  };

  const handleNavigateToNursingBadges = () => {
    console.log('간호 실습 뱃지로 이동');
    onNavigateToNursingBadges?.();
  };

  // 탭 바 데이터
  const tabs = [
    { id: 'home', label: '홈', iconName: 'home' },
    { id: 'message', label: '메시지', iconName: 'message', hasNotification: true },
    { id: 'notice', label: '공지사항', iconName: 'bell' },
    { id: 'myReservations', label: '나의 예약', iconName: 'calendar' },
  ];

  const handleTabPress = (tabId: string) => {
    switch (tabId) {
      case 'home':
        // 이미 홈 화면이므로 아무것도 하지 않음
        break;
      case 'message':
        onNavigateToMessage?.();
        break;
      case 'notice':
        onNavigateToNotice?.();
        break;
      case 'myReservations':
        onNavigateToTodayReservations?.();
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

        {/* 간호 실습 뱃지 카드 */}
        <TouchableOpacity 
          style={styles.badgeCard}
          onPress={handleNavigateToNursingBadges}
          activeOpacity={0.7}
        >
          <View style={styles.badgeCardContent}>
            <View style={styles.badgeIconContainer}>
              <Text style={styles.badgeIcon}>🏆</Text>
            </View>
            <View style={styles.badgeTextContainer}>
              <Text style={styles.badgeCardTitle}>간호 실습 뱃지</Text>
              <Text style={styles.badgeCardSubtitle}>
                60점 이상이면 도전할 수 있어요!
              </Text>
            </View>
            <View style={styles.badgeCardRight}>
              <Text style={styles.badgeArrow}>→</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        <CollapsibleCalendar 
          onDateSelect={(date) => console.log('Selected date:', date)}
          hasEvents={{
            '2025-01-15': true,
            '2025-01-17': true,
            '2025-01-20': true,
          }}
        />
        
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
    paddingBottom: 100, // 탭 바와 하단 아이콘을 위한 충분한 여백
  },
  
  // 뱃지 카드 스타일
  badgeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  badgeCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // 가운데 정렬
    padding: 20,
  },
  
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  badgeIcon: {
    fontSize: 24,
  },
  
  badgeTextContainer: {
    alignItems: 'center', // 텍스트도 가운데 정렬
    marginBottom: 8,
  },
  
  badgeCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
    textAlign: 'center', // 제목 가운데 정렬
  },
  
  badgeCardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    textAlign: 'center', // 부제목 가운데 정렬
  },
  
  badgeCardRight: {
    // 화살표는 텍스트 아래에 배치
  },
  
  badgeArrow: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '600',
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
