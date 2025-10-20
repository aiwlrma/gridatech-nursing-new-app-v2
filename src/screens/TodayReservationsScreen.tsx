import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { NavigationProps, VRReservation } from '../types';
import { SvgIcon } from '../components/SvgIcon';

const TodayReservationsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // 오늘의 예약 데이터
  const reservations: VRReservation[] = [
    {
      id: 1,
      time: '09:00',
      duration: 30,
      title: '활력징후 측정 실습',
      type: 'VR 시뮬레이션',
      level: '초급',
      booth: 'VR-A01',
      status: '예약완료',
    },
    {
      id: 2,
      time: '14:00',
      duration: 45,
      title: '응급상황 대처 훈련',
      type: 'VR 시뮬레이션',
      level: '중급',
      booth: 'VR-A03',
      status: '진행중',
    },
  ];

  // 오늘 날짜 포맷팅
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[today.getDay()];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#191F28" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>오늘의 예약</Text>
            <Text style={styles.date}>{month}월 {date}일 ({dayName})</Text>
          </View>
        </View>

        {/* 예약 카드 리스트 */}
        {reservations.length > 0 ? (
          reservations.map(item => (
            <View style={styles.card} key={item.id}>
              {/* 시간 */}
              <View style={styles.timeBox}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.duration}>{item.duration}분</Text>
              </View>
              
              {/* 내용 */}
              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <View style={styles.iconContainer}>
                    <SvgIcon name="vrGoggle" size={20} color="#6B7280" />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.type}>{item.type}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.level}>{item.level}</Text>
                </View>
                
                <View style={styles.locationRow}>
                  <View style={styles.iconContainer}>
                    <SvgIcon name="gameController" size={16} color="#6B7280" />
                  </View>
                  <Text style={styles.location}>{item.booth}</Text>
                </View>
              </View>
              
              {/* 상태 */}
              <View style={[
                styles.statusBadge,
                item.status === '진행중' && styles.statusActive
              ]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyText}>오늘 예약이 없어요</Text>
            <Text style={styles.emptySub}>새로운 VR 실습을 예약해보세요</Text>
          </View>
        )}
      </ScrollView>
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  
  headerContent: {
    marginLeft: 12,
  },
  
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
  },
  
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  
  // 카드
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  
  timeBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#1884FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  time: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  duration: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  
  content: {
    flex: 1,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#191F28',
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  
  type: {
    fontSize: 12,
    color: '#6B7280',
  },
  
  dot: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 4,
  },
  
  level: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  iconContainer: {
    marginRight: 8,
    paddingLeft: 4,
  },
  
  deviceIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  
  location: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  
  // 상태 뱃지
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1884FF',
  },
  
  // 빈 상태
  empty: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  
  emptyIcon: {
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
});

export default TodayReservationsScreen;
