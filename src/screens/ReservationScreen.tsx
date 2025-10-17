import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Plus, Calendar } from 'lucide-react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { Reservation, ReservationFilter, DateOption } from '../types';
import { DateScrollPicker } from '../components/DateScrollPicker';
import { ReservationFilterTabs } from '../components/ReservationFilterTabs';
import { ReservationCard } from '../components/ReservationCard';
import { FloatingActionButton } from '../components/FloatingActionButton';

// Mock 데이터
const mockReservations: Reservation[] = [
  {
    id: '1',
    title: '기초 간호 실습',
    subject: '기초간호학',
    location: '실습실 A동 302호',
    time: '14:00',
    date: '2024-01-15',
    status: 'scheduled',
  },
  {
    id: '2',
    title: '해부학 실습',
    subject: '해부생리학',
    location: '실습실 B동 201호',
    time: '10:00',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: '3',
    title: '생리학 실습',
    subject: '해부생리학',
    location: '실습실 C동 105호',
    time: '16:00',
    date: '2024-01-16',
    status: 'scheduled',
  },
  {
    id: '4',
    title: '임상 실습',
    subject: '성인간호학',
    location: '병원 3층',
    time: '09:00',
    date: '2024-01-17',
    status: 'cancelled',
  },
];

const filters: ReservationFilter[] = [
  { id: '1', label: '전체', filter: 'all' },
  { id: '2', label: '예정', filter: 'scheduled' },
  { id: '3', label: '완료', filter: 'completed' },
  { id: '4', label: '취소', filter: 'cancelled' },
];

export const ReservationScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [activeFilter, setActiveFilter] = useState('all');

  // 날짜 옵션 생성
  const dateOptions: DateOption[] = useMemo(() => {
    const today = new Date();
    const dates: DateOption[] = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      let label = '';
      if (i === 0) {
        label = '오늘';
      } else if (i === 1) {
        label = '내일';
      } else {
        label = `${month}/${day}`;
      }
      
      dates.push({
        id: dateStr,
        label,
        date: dateStr,
        isToday: i === 0,
        isTomorrow: i === 1,
      });
    }
    
    return dates;
  }, []);

  // 필터링된 예약 목록
  const filteredReservations = useMemo(() => {
    let filtered = mockReservations.filter(reservation => 
      reservation.date === selectedDate
    );

    if (activeFilter !== 'all') {
      filtered = filtered.filter(reservation => 
        reservation.status === activeFilter
      );
    }

    return filtered;
  }, [selectedDate, activeFilter]);

  // 날짜별 그룹핑
  const groupedReservations = useMemo(() => {
    const groups: { [key: string]: Reservation[] } = {};
    
    mockReservations.forEach(reservation => {
      if (activeFilter === 'all' || reservation.status === activeFilter) {
        if (!groups[reservation.date]) {
          groups[reservation.date] = [];
        }
        groups[reservation.date].push(reservation);
      }
    });

    return groups;
  }, [activeFilter]);

  const handleReservationPress = (reservation: Reservation) => {
    console.log('예약 선택:', reservation);
  };

  const handleAddReservation = () => {
    console.log('새 예약 추가');
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Calendar size={64} color={BLUE_THEME.textLight} />
      <Text style={styles.emptyTitle}>예약이 없습니다</Text>
      <Text style={styles.emptySubtitle}>
        새로운 예약을 추가해보세요
      </Text>
    </View>
  );

  const renderReservationGroup = (date: string, reservations: Reservation[]) => {
    const dateOption = dateOptions.find(opt => opt.date === date);
    const label = dateOption?.label || date;
    
    return (
      <View key={date} style={styles.groupContainer}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupTitle}>
            ▼ {label} ({reservations?.length || 0}건)
          </Text>
        </View>
        {reservations?.map(reservation => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onPress={handleReservationPress}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color={BLUE_THEME.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>예약 관리</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color={BLUE_THEME.primary} />
        </TouchableOpacity>
      </View>

      {/* 날짜 선택 */}
      <DateScrollPicker
        dates={dateOptions}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {/* 탭 필터 */}
      <ReservationFilterTabs
        filters={filters}
        activeFilter={activeFilter}
        onFilterSelect={setActiveFilter}
      />

      {/* 예약 목록 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.keys(groupedReservations || {}).length === 0 ? (
          renderEmptyState()
        ) : (
          Object.entries(groupedReservations || {}).map(([date, reservations]) =>
            renderReservationGroup(date, reservations)
          )
        )}
      </ScrollView>

      {/* FAB 버튼 */}
      <FloatingActionButton onPress={handleAddReservation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_THEME.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: BLUE_THEME.surface,
    borderBottomWidth: 1,
    borderBottomColor: BLUE_THEME.divider,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BLUE_THEME.text,
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  groupContainer: {
    marginBottom: 24,
  },
  groupHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: BLUE_THEME.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: BLUE_THEME.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: BLUE_THEME.textSecondary,
    textAlign: 'center',
  },
});
