import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ProfessorSchedule, Booking } from '../types';

interface WeeklyTimelineGridProps {
  professorSchedules: ProfessorSchedule[];
  existingBookings: Booking[];
  onTimeSlotClick: (day: number, time: string) => void;
}

export const WeeklyTimelineGrid: React.FC<WeeklyTimelineGridProps> = ({
  professorSchedules,
  existingBookings,
  onTimeSlotClick,
}) => {
  const days = ['월', '화', '수', '목', '금'];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getSlotType = (day: number, time: string) => {
    // 교수 일정 확인
    const professorSchedule = professorSchedules.find(
      schedule => schedule.day === day && 
      time >= schedule.startTime && 
      time < schedule.endTime
    );

    if (professorSchedule) {
      return {
        type: 'professor-schedule',
        title: professorSchedule.title,
        color: '#D1D5DB', // 회색
      };
    }

    // 기존 예약 확인
    const existingBooking = existingBookings.find(
      booking => booking.day === day && 
      time >= booking.startTime && 
      time < booking.endTime
    );

    if (existingBooking) {
      return {
        type: 'booked',
        title: existingBooking.title,
        color: '#BFDBFE', // 연한 파란색
      };
    }

    // 예약 가능
    return {
      type: 'available',
      title: '',
      color: '#FFFFFF',
    };
  };

  const renderTimeSlot = (day: number, time: string) => {
    const slotInfo = getSlotType(day, time);
    const isAvailable = slotInfo.type === 'available';

    return (
      <TouchableOpacity
        key={`${day}-${time}`}
        style={[
          styles.timeSlot,
          { backgroundColor: slotInfo.color },
          isAvailable && styles.availableSlot,
        ]}
        onPress={() => isAvailable && onTimeSlotClick(day, time)}
        disabled={!isAvailable}
      >
        {slotInfo.title && (
          <Text style={styles.slotText} numberOfLines={1}>
            {slotInfo.title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeLabel}>시간</Text>
        </View>
        {days.map((day, index) => (
          <View key={day} style={styles.dayColumn}>
            <Text style={styles.dayLabel}>{day}</Text>
          </View>
        ))}
      </View>

      {/* 타임라인 그리드 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {timeSlots.map((time) => (
            <View key={time} style={styles.timeRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{time}</Text>
              </View>
              {days.map((day, dayIndex) => 
                renderTimeSlot(dayIndex, time)
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 범례 */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#D1D5DB' }]} />
          <Text style={styles.legendText}>교수 수업/회의</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#BFDBFE' }]} />
          <Text style={styles.legendText}>이미 예약됨</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' }]} />
          <Text style={styles.legendText}>예약 가능</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#191F28',
  },
  grid: {
    minWidth: 600, // 최소 너비 보장
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  timeSlot: {
    flex: 1,
    height: 48,
    marginHorizontal: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  availableSlot: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  slotText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#191F28',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
});
