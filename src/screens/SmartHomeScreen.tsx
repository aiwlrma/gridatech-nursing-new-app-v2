import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgIcon } from '../components/SvgIcon';
import { EverytimeNextAction } from '../components/EverytimeNextAction';
import { BLUE_THEME } from '../constants/blueTheme';
import { EVERYTIME_COLORS, EVERYTIME_TYPOGRAPHY, EVERYTIME_SPACING } from '../constants/everytimeTheme';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: string;
  isCompleted?: boolean;
}

interface SmartHomeScreenProps {
  onNavigateToTimetable?: () => void;
  onNavigateToLearning?: () => void;
  onNavigateToGrades?: () => void;
  onNavigateToReservationManagement?: () => void;
  onNavigateToMessage?: () => void;
  onNavigateToNotice?: () => void;
}

export const SmartHomeScreen: React.FC<SmartHomeScreenProps> = ({
  onNavigateToTimetable,
  onNavigateToLearning,
  onNavigateToGrades,
  onNavigateToReservationManagement,
  onNavigateToMessage,
  onNavigateToNotice,
}) => {
  const [selectedDateFilter, setSelectedDateFilter] = useState('today');

  // 공지사항 타입 및 상태
  interface NoticeItemType {
    id: string;
    title: string;
    content?: string;
    date: string;
    isImportant: boolean;
    isNew: boolean;
  }

  const [notices, setNotices] = useState<NoticeItemType[]>([]);

  useEffect(() => {
    const data: NoticeItemType[] = [
      { id: '1', title: '2025-1학기 실습 오리엔테이션 필수 참석', content: '...', date: '2025.01.10', isImportant: true, isNew: true },
      { id: '2', title: '다음 주 기초 간호 실습 일정 변경 안내', content: '...', date: '2025.01.15', isImportant: false, isNew: true },
      { id: '3', title: '중간고사 시험 범위 및 일정 공지', content: '...', date: '2025.01.14', isImportant: true, isNew: false },
      { id: '4', title: '기본간호학실습실 사용 규칙 안내', content: '...', date: '2025.01.12', isImportant: false, isNew: false },
      { id: '5', title: '홍보게시판 학생심부름 해지기 가자?', content: '...', date: '2024.12.16', isImportant: false, isNew: false },
    ];
    setNotices(data.slice(0, 5));
  }, []);

  // 다음 일정 데이터
  const nextSchedule = {
    time: '14:00',
    title: '기초 간호 실습',
    location: '실습실 A동 302호',
    minutesUntil: 90,
  };

  // 오늘의 일정 데이터
  const todaySchedules: ScheduleItem[] = [
    {
      id: '1',
      time: '14:00',
      title: '기초 간호 실습',
      location: 'A동 302호',
      type: '실습',
    },
    {
      id: '2',
      time: '16:30',
      title: '성인간호학 이론',
      location: 'B동 201호',
      type: '이론',
    },
  ];

  const handleDateFilterChange = (filter: string) => {
    setSelectedDateFilter(filter);
  };

  const handleNextActionPress = () => {
    console.log('다음 일정 상세 보기');
  };

  const handleCheckIn = () => {
    console.log('출석 체크');
  };

  const handleNavigate = () => {
    console.log('길찾기');
  };

  const handleNoticePress = (notice: NoticeItemType) => {
    console.log('공지 상세 보기:', notice.id);
  };

  return (
    <View style={styles.container}>
      {/* 스크롤 가능한 콘텐츠 */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.greeting}>안녕하세요, 김간호님! 👋</Text>
          <TouchableOpacity>
            <Text style={styles.notification}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* 다음 일정 - 강조 영역 */}
        <EverytimeNextAction
          nextSchedule={nextSchedule}
          onPress={handleNextActionPress}
          onCheckIn={handleCheckIn}
          onNavigate={handleNavigate}
        />

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 오늘의 일정 */}
        <View style={styles.todaySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>오늘의 일정</Text>
            <Text style={styles.sectionCount}>{todaySchedules.length}개</Text>
          </View>
          
          <View style={styles.scheduleList}>
            {todaySchedules.map((schedule, index) => (
              <TouchableOpacity 
                key={schedule.id} 
                style={[
                  styles.listItem,
                  index === todaySchedules.length - 1 && styles.lastListItem
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.listTime}>{schedule.time}</Text>
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>{schedule.title}</Text>
                  <Text style={styles.listLocation}>{schedule.location}</Text>
                </View>
                <Text style={styles.listType}>{schedule.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 공지사항 섹션 */}
        <View style={styles.noticeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📢 공지사항</Text>
            <TouchableOpacity onPress={onNavigateToNotice}>
              <Text style={styles.moreButton}>더 보기 ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noticeList}>
            {notices.map((notice) => (
              <TouchableOpacity
                key={notice.id}
                style={styles.noticeItem}
                activeOpacity={0.7}
                onPress={() => handleNoticePress(notice)}
              >
                <View style={styles.noticeContent}>
                  <View style={styles.noticeTitleRow}>
                    {notice.isImportant && (
                      <View style={styles.importantBadge}>
                        <Text style={styles.badgeText}>중요</Text>
                      </View>
                    )}
                    {notice.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.badgeText}>N</Text>
                      </View>
                    )}
                    <Text style={styles.noticeTitle} numberOfLines={1}>
                      {notice.title}
                    </Text>
                  </View>
                  <Text style={styles.noticeDate}>{notice.date}</Text>
                </View>
                <View style={styles.noticeArrow}>
                  <Text style={styles.arrowIcon}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 빠른 메뉴 */}
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onNavigateToTimetable}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>📅</Text>
            <Text style={styles.menuText}>시간표</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onNavigateToReservationManagement}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuText}>예약 관리</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onNavigateToGrades}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>🏆</Text>
            <Text style={styles.menuText}>성적</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 🔥 핵심: 최상위 컨테이너 - 반드시 flex: 1
  container: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 스크롤뷰
  scrollView: {
    flex: 1,
  },
  
  // 스크롤 콘텐츠 - 하단 여백 (하단 네비게이션 공간 확보)
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80, // 하단 네비게이션 높이 + 여백
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : 24, // 상단 안전 영역
    paddingBottom: 12,
    backgroundColor: EVERYTIME_COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.divider,
  },
  
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  notification: {
    fontSize: 20,
  },
  
  // 구분선 (에브리타임 스타일)
  divider: {
    height: 8,
    backgroundColor: EVERYTIME_COLORS.background,
  },
  
  // 오늘의 일정
  todaySection: {
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  sectionCount: {
    fontSize: 13,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  // 리스트 아이템
  scheduleList: {
    gap: 0, // 여백 없음
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  lastListItem: {
    borderBottomWidth: 0,
  },
  
  listTime: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.primary,
    width: 50,
  },
  
  listInfo: {
    flex: 1,
  },
  
  listTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 2,
  },
  
  listLocation: {
    fontSize: 13,
    fontWeight: '400',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  listType: {
    fontSize: 12,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
    backgroundColor: EVERYTIME_COLORS.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  // 빠른 메뉴 (리스트 형태)
  menuSection: {
    backgroundColor: EVERYTIME_COLORS.surface,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: EVERYTIME_COLORS.lightBorder,
  },
  
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  menuArrow: {
    fontSize: 14,
    color: EVERYTIME_COLORS.textTertiary,
  },
  
  // 공지사항 섹션
  noticeSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 16,
  },
  moreButton: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  noticeList: {
    paddingHorizontal: 16,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  importantBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  newBadge: {
    backgroundColor: '#1884FF',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  noticeTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#191F28',
  },
  noticeDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
    marginTop: 2,
  },
  noticeArrow: {
    marginLeft: 8,
  },
  arrowIcon: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  
});