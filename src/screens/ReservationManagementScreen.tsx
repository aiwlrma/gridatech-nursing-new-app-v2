import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calendar, ChevronDown, MapPin, Plus, ArrowLeft } from 'lucide-react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { DateScrollPicker } from '../components/DateScrollPicker';
import { DateOption } from '../types';

interface Reservation {
  id: number;
  time: string;
  title: string;
  location: string;
  icon: string;
  date: string; // 날짜 필드 추가
}

interface ReservationManagementScreenProps {
  onNavigateToAddReservation?: () => void;
  onBack?: () => void;
}

export const ReservationManagementScreen: React.FC<ReservationManagementScreenProps> = ({
  onNavigateToAddReservation,
  onBack,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // 예약 데이터 (여러 날짜에 걸친 예약들)
  const allReservations: Reservation[] = [
    {
      id: 1,
      time: '14:00',
      title: '기초 간호 실습',
      location: '실습실 A동 302호',
      icon: '💉',
      date: new Date().toISOString().split('T')[0], // 오늘
    },
    {
      id: 2,
      time: '16:30',
      title: '성인간호학 이론',
      location: '강의실 B동 201호',
      icon: '📚',
      date: new Date().toISOString().split('T')[0], // 오늘
    },
    {
      id: 3,
      time: '09:00',
      title: '해부생리학 실습',
      location: '실습실 C동 101호',
      icon: '🧬',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 내일
    },
    {
      id: 4,
      time: '11:00',
      title: '임상실습 준비',
      location: '강의실 A동 205호',
      icon: '🏥',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 모레
    },
  ];

  // 선택된 날짜의 예약만 필터링
  const filteredReservations = allReservations.filter(
    reservation => reservation.date === selectedDate
  );

  // 날짜 옵션 생성 (현재 날짜 기준으로 앞뒤 7일)
  const generateDateOptions = (): DateOption[] => {
    const options: DateOption[] = [];
    const today = new Date();
    
    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayName = dayNames[date.getDay()];
      
      const dateString = date.toISOString().split('T')[0];
      const isToday = i === 0;
      const isTomorrow = i === 1;
      
      options.push({
        id: dateString,
        label: `${month}월 ${day}일 (${dayName})`,
        date: dateString,
        isToday,
        isTomorrow,
      });
    }
    
    return options;
  };

  const dateOptions = generateDateOptions();

  // 선택된 날짜 포맷팅
  const getSelectedDateText = () => {
    const selectedOption = dateOptions.find(option => option.date === selectedDate);
    return selectedOption?.label || getTodayDate();
  };

  // 오늘 날짜 포맷팅 (fallback)
  const getTodayDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[today.getDay()];
    
    return `${month}월 ${date}일 (${dayName})`;
  };

  const handleAddReservation = () => {
    console.log('새 예약 추가');
    onNavigateToAddReservation?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color="#191F28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약 관리</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 날짜 헤더 */}
        <TouchableOpacity 
          style={styles.dateHeader}
          onPress={() => setShowDatePicker(!showDatePicker)}
          activeOpacity={0.7}
        >
          <Calendar size={20} color="#1884FF" />
          <Text style={styles.dateText}>{getSelectedDateText()}</Text>
          <ChevronDown 
            size={20} 
            color="#1884FF" 
            style={[
              styles.chevronIcon,
              showDatePicker && styles.chevronRotated
            ]}
          />
        </TouchableOpacity>

        {/* 날짜 선택 스크롤 */}
        {showDatePicker && (
          <View style={styles.datePickerContainer}>
            <DateScrollPicker
              dates={dateOptions}
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setShowDatePicker(false);
              }}
            />
          </View>
        )}

        {/* 선택된 날짜의 예약 리스트 */}
        <View style={styles.reservationList}>
          <Text style={styles.sectionTitle}>
            {selectedDate === new Date().toISOString().split('T')[0] 
              ? '오늘의 예약' 
              : `${getSelectedDateText()} 예약`
            }
          </Text>
          
          {filteredReservations.length > 0 ? (
            filteredReservations.map((item) => (
              <TouchableOpacity 
                style={styles.reservationCard}
                key={item.id}
                activeOpacity={0.7}
              >
                {/* 시간 */}
                <View style={styles.timeBox}>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                
                {/* 내용 */}
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.locationRow}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                </View>
                
                {/* 아이콘 */}
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📅</Text>
              <Text style={styles.emptyText}>예약이 없어요</Text>
              <Text style={styles.emptySub}>새로운 예약을 추가해보세요</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 새 예약 추가 버튼 */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddReservation}
        activeOpacity={0.8}
      >
        <View style={styles.buttonIcon}>
          <Plus size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.buttonText}>새 예약 추가</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  
  backButton: {
    padding: 8,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  
  headerSpacer: {
    width: 40, // 뒤로가기 버튼과 같은 너비로 균형 맞춤
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100, // 하단 버튼을 위한 여백
  },
  
  // 날짜 헤더
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  dateText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },

  chevronIcon: {
    transform: [{ rotate: '0deg' }],
  },

  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },

  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // 예약 리스트
  reservationList: {
    paddingHorizontal: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 16,
  },
  
  // 예약 카드
  reservationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  timeBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#1884FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  time: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  content: {
    flex: 1,
  },
  
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 6,
  },
  
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  
  location: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  
  icon: {
    fontSize: 24,
  },
  
  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 8,
  },
  
  emptySub: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 추가 버튼
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1884FF',
    height: 64,
    borderRadius: 20,
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    gap: 12,
  },
  
  buttonIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});