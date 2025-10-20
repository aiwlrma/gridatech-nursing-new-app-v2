import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, SIZES } from '../constants';

interface DatePickerModalProps {
  visible: boolean;
  selectedDate: string;
  onClose: () => void;
  onSelect: (date: string) => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  selectedDate,
  onClose,
  onSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 현재 월의 날짜들 생성
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 이전 달의 빈 칸들
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = generateCalendarDays();
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    onSelect(dateString);
    onClose();
  };

  const isSelectedDate = (day: number) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return dateString === selectedDate;
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <Text style={styles.title}>날짜 선택</Text>
            <View style={styles.placeholder} />
          </View>

          {/* 월 네비게이션 */}
          <View style={styles.monthNavigation}>
            <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
              <Text style={styles.navIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
            </Text>
            <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
              <Text style={styles.navIcon}>›</Text>
            </TouchableOpacity>
          </View>

          {/* 요일 헤더 */}
          <View style={styles.dayHeader}>
            {dayNames.map((dayName) => (
              <Text key={dayName} style={styles.dayHeaderText}>
                {dayName}
              </Text>
            ))}
          </View>

          {/* 달력 그리드 */}
          <View style={styles.calendarGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  !day && styles.emptyDay,
                  isSelectedDate(day) && styles.selectedDay,
                  isToday(day) && styles.todayDay,
                ]}
                onPress={() => day && handleDateSelect(day)}
                disabled={!day}
              >
                {day && (
                  <Text
                    style={[
                      styles.dayText,
                      isSelectedDate(day) && styles.selectedDayText,
                      isToday(day) && !isSelectedDate(day) && styles.todayDayText,
                    ]}
                  >
                    {day}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  cancelButton: {
    padding: SIZES.spacing.sm,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  placeholder: {
    width: 60,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  dayHeader: {
    flexDirection: 'row',
    marginBottom: SIZES.spacing.sm,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    paddingVertical: SIZES.spacing.sm,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 1,
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  todayDay: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  todayDayText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
});
