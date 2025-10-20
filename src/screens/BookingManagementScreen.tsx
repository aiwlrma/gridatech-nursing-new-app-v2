import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Calendar, Plus } from 'lucide-react-native';
import { BookingTabNavigation, BookingTab } from '../components/BookingTabNavigation';
import { BookingStatusBadge, BookingStatus } from '../components/BookingStatusBadge';
import { ProfessorSelector, Professor } from '../components/ProfessorSelector';
import { WeeklyTimelineGrid } from '../components/WeeklyTimelineGrid';
import { BookingAlert } from '../components/BookingAlert';
import { ProfessorSchedule, Booking } from '../types';

// Mock 데이터
const mockProfessors: Professor[] = [
  { id: '1', name: '김민수 교수', department: '기초 간호학' },
  { id: '2', name: '이영희 교수', department: '성인 간호학' },
  { id: '3', name: '박철수 교수', department: '정신 간호학' },
];

const mockBookings = [
  {
    id: '1',
    title: '기초 간호 실습',
    date: '2024-10-21',
    time: '14:00',
    location: '실습실 A동 302호',
    status: 'pending' as BookingStatus,
  },
  {
    id: '2',
    title: '성인간호학 실습',
    date: '2024-10-22',
    time: '10:00',
    location: '실습실 B동 201호',
    status: 'approved' as BookingStatus,
  },
  {
    id: '3',
    title: '정신간호학 실습',
    date: '2024-10-23',
    time: '09:00',
    location: '실습실 C동 101호',
    status: 'pending' as BookingStatus,
  },
  {
    id: '4',
    title: '아동간호학 실습',
    date: '2024-10-24',
    time: '13:00',
    location: '실습실 A동 201호',
    status: 'approved' as BookingStatus,
  },
  {
    id: '5',
    title: '모성간호학 실습',
    date: '2024-10-25',
    time: '11:00',
    location: '실습실 B동 301호',
    status: 'pending' as BookingStatus,
  },
  {
    id: '8',
    title: '간호연구방법론 실습',
    date: '2024-10-28',
    time: '16:00',
    location: '실습실 B동 102호',
    status: 'approved' as BookingStatus,
  },
];

const mockProfessorSchedules: ProfessorSchedule[] = [
  { 
    id: '1', 
    professorId: '1', 
    type: 'class',
    date: '2025-10-21',
    day: 0, 
    startTime: '09:00', 
    endTime: '11:00', 
    title: '기초간호학 강의',
    location: 'A동 302호'
  },
  { 
    id: '2', 
    professorId: '1', 
    type: 'meeting',
    date: '2025-10-21',
    day: 0, 
    startTime: '14:00', 
    endTime: '16:00', 
    title: '연구회의'
  },
  { 
    id: '3', 
    professorId: '1', 
    type: 'class',
    date: '2025-10-23',
    day: 2, 
    startTime: '10:00', 
    endTime: '12:00', 
    title: '임상실습',
    location: 'B동 201호'
  },
];

const mockExistingBookings: Booking[] = [
  { 
    id: '1', 
    studentId: 'student1',
    professorId: '1',
    date: '2025-10-21',
    day: 0, 
    startTime: '14:00', 
    endTime: '15:00', 
    title: '이미 예약됨',
    status: 'approved',
    createdAt: '2025-10-20T09:00:00Z',
    updatedAt: '2025-10-20T09:00:00Z'
  },
];

interface BookingManagementScreenProps {
  onBack?: () => void;
  hideBottomNavigation?: boolean;
  onActiveTabChange?: (activeTab: BookingTab) => void;
}

export const BookingManagementScreen: React.FC<BookingManagementScreenProps> = ({
  onBack,
  hideBottomNavigation = false,
  onActiveTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<BookingTab>('myBookings');
  
  // 교수 일정 보기 탭일 때 하단 네비게이션 숨기기
  const shouldHideBottomNav = hideBottomNavigation || activeTab === 'professorSchedule';
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingData, setBookingData] = useState({
    practice: '기초 간호 실습',
    date: '10월 21일 (화)',
    startTime: '12:00',
    endTime: '13:00',
    location: '실습실 A동 302호'
  });

  const handleTimeSlotClick = (day: number, time: string) => {
    setSelectedDay(day);
    setSelectedTime(time);
    
    // 날짜 계산
    const today = new Date();
    const currentDay = today.getDay();
    const targetDay = day + 1;
    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[targetDate.getDay()];
    
    // 시간 계산 (1시간 예약으로 설정)
    const [hour, minute] = time.split(':');
    const endHour = parseInt(hour) + 1;
    const endTime = `${endHour.toString().padStart(2, '0')}:${minute}`;
    
    setBookingData({
      practice: '기초 간호 실습',
      date: `${month}월 ${date}일 (${dayName})`,
      startTime: time,
      endTime: endTime,
      location: '실습실 A동 302호'
    });
    
    setAlertVisible(true);
  };

  const handleTabChange = (tab: BookingTab) => {
    console.log('BookingManagementScreen - 탭 변경:', tab);
    setActiveTab(tab);
    onActiveTabChange?.(tab);
  };

  const handleBookingConfirm = () => {
    console.log('예약 요청:', bookingData);
    setAlertVisible(false);
    // 여기서 API 호출
  };

  const renderMyBookings = () => (
    <View style={styles.tabContent}>
      {/* 예약 추가 메뉴 (리스트형) */}
      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => setActiveTab('professorSchedule')}
        >
          <Text style={styles.menuIcon}>📅</Text>
          <Text style={styles.menuText}>교수 일정 보고 예약하기</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📝</Text>
          <Text style={styles.menuText}>직접 시간 선택해서 예약</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* 섹션 헤더 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>내 예약</Text>
      </View>

      {/* 예약 리스트 (타이트하게) */}
      <View style={styles.bookingList}>
        {mockBookings.map((booking) => (
          <TouchableOpacity key={booking.id} style={styles.bookingItem}>
            {/* 시간 블록 (작게) */}
            <View style={[
              styles.timeBlock,
              booking.status === 'approved' && styles.approvedTimeBlock
            ]}>
              <Text style={styles.timeText}>{booking.time}</Text>
            </View>

            {/* 정보 */}
            <View style={styles.bookingInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.bookingTitle}>{booking.title}</Text>
                <View style={[
                  styles.statusBadge,
                  booking.status === 'approved' && styles.approvedBadge
                ]}>
                  <Text style={[
                    styles.statusText,
                    booking.status === 'approved' && styles.approvedStatusText
                  ]}>
                    {booking.status === 'approved' ? '승인됨' : '승인 대기'}
                  </Text>
                </View>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.locationText}>{booking.location}</Text>
                <Text style={styles.dot}>·</Text>
                <Text style={styles.dateText}>{booking.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderProfessorSchedule = () => (
    <View style={styles.professorScheduleContent}>
      <ProfessorSelector
        professors={mockProfessors}
        selectedProfessor={selectedProfessor}
        onProfessorSelect={setSelectedProfessor}
        placeholder="교수를 선택해주세요"
      />
      
      {selectedProfessor && (
        <WeeklyTimelineGrid
          professorSchedules={mockProfessorSchedules}
          existingBookings={mockExistingBookings}
          onTimeSlotClick={handleTimeSlotClick}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#191F28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약 관리</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* 탭 네비게이션 */}
      <BookingTabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 탭 컨텐츠 */}
      {activeTab === 'myBookings' ? (
        <View style={styles.content}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderMyBookings()}
          </ScrollView>
        </View>
      ) : (
        <View style={[
          styles.professorScheduleContainer,
          shouldHideBottomNav && styles.professorScheduleContainerNoBottomNav
        ]}>
          {renderProfessorSchedule()}
        </View>
      )}

      {/* 예약 알럿 */}
      <BookingAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        onConfirm={handleBookingConfirm}
        data={bookingData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // 배경색 변경
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12, // 여백 감소
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE', // 구분선 색상 변경
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16, // 폰트 크기 감소
    fontWeight: '700',
    color: '#191F28',
  },
  headerSpacer: {
    width: 24, // 고정 너비
  },
  content: {
    flex: 1,
    paddingBottom: 80, // 하단 네비게이션 바를 위한 여백
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabContent: {
    flex: 1,
  },
  
  // 교수 일정 보기 전용 스타일
  professorScheduleContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  professorScheduleContainerNoBottomNav: {
    paddingBottom: 0, // 하단 네비게이션이 없을 때 하단 여백 제거
  },
  professorScheduleContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  
  // 메뉴 섹션 (리스트형)
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14, // 16 → 14
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    fontSize: 18, // 20 → 18
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14, // 16 → 14
    fontWeight: '500',
    color: '#191F28',
  },
  menuArrow: {
    fontSize: 18,
    color: '#D1D5DB',
  },
  
  // 섹션 헤더
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  sectionTitle: {
    fontSize: 14, // 폰트 크기 감소
    fontWeight: '700',
    color: '#191F28',
  },
  
  // 예약 리스트
  bookingList: {
    backgroundColor: '#FFFFFF',
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12, // 16 → 12 (타이트하게)
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  
  // 시간 블록 (작게)
  timeBlock: {
    width: 56, // 60 → 56
    height: 56, // 60 → 56
    borderRadius: 8, // 12 → 8
    backgroundColor: '#1884FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // 16 → 12
  },
  approvedTimeBlock: {
    backgroundColor: '#10B981', // 승인됨 - 초록색
  },
  timeText: {
    fontSize: 16, // 유지
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  // 예약 정보
  bookingInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  bookingTitle: {
    flex: 1,
    fontSize: 14, // 16 → 14
    fontWeight: '600',
    color: '#191F28',
  },
  
  // 상태 배지 (작게)
  statusBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    paddingHorizontal: 6, // 8 → 6
    paddingVertical: 2, // 4 → 2
  },
  approvedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 10, // 11 → 10
    fontWeight: '600',
    color: '#92400E', // 노란 배지용
  },
  approvedStatusText: {
    color: '#065F46', // 초록 배지용
  },
  
  // 메타 정보
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12, // 14 → 12
    fontWeight: '400',
    color: '#6B7280',
  },
  dot: {
    fontSize: 12,
    color: '#D1D5DB',
    marginHorizontal: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
});
