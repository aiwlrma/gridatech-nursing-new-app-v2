import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { BLUE_THEME } from '../constants/blueTheme';

interface Appointment {
  id: string;
  time: string;
  title: string;
  location: string;
  category?: string;
}

interface AppointmentCardProps {
  appointments: Appointment[];
  upcomingAppointments?: Appointment[];
  onViewAll?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointments = [],
  upcomingAppointments = [],
  onViewAll,
}) => {
  // 안전한 배열 처리
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safeUpcoming = Array.isArray(upcomingAppointments) ? upcomingAppointments : [];

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case '실습':
        return 'syringe';
      case '이론':
        return 'booksStack';
      case '시험':
        return 'clipboardCheck';
      case '과제':
        return 'fileText';
      default:
        return 'calendarNew';
    }
  };

  return (
    <View style={styles.container}>
      {/* 오늘의 예약 섹션 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>오늘의 예약</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>전체보기</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        {safeAppointments.length > 0 ? (
          safeAppointments.map((appointment, index) => (
            <View key={appointment.id}>
              <TouchableOpacity style={styles.apptRow}>
                <View style={styles.timeBox}>
                  <Text style={styles.time}>{appointment.time}</Text>
                </View>
                
                <View style={styles.apptDetails}>
                  <Text style={styles.apptTitle}>{appointment.title}</Text>
                  <View style={styles.locationRow}>
                    <SvgIcon name="mapPin" color={BLUE_THEME.textLight} size={14} />
                    <Text style={styles.location}>{appointment.location}</Text>
                  </View>
                </View>
                
                
                <SvgIcon name="chevronRightNew" color={BLUE_THEME.divider} size={20} />
              </TouchableOpacity>
              
              {index < safeAppointments.length - 1 && <View style={styles.divider} />}
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <SvgIcon name="calendarNew" size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>오늘은 예약이 없어요</Text>
            <Text style={styles.emptySub}>새로운 예약을 추가해보세요!</Text>
          </View>
        )}
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 8, // 상단 탭과의 간격
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1F2E',
  },
  viewAll: {
    fontSize: 14,
    color: BLUE_THEME.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  apptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  timeBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: BLUE_THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  apptDetails: {
    flex: 1,
  },
  apptTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1F2E',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 4,
  },
  
  divider: {
    height: 1,
    backgroundColor: BLUE_THEME.divider,
    marginVertical: 8,
  },
  // 빈 상태
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
