import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface DateSelectionStepProps {
  onDateSelect: (date: string) => void;
  onNext: () => void;
}

export const DateSelectionStep: React.FC<DateSelectionStepProps> = ({
  onDateSelect,
  onNext,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleNext = () => {
    if (selectedDate) {
      onNext();
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 빈 날짜들 (이전 달)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 실제 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const formatDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const days = getDaysInMonth(currentMonth);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>날짜 선택</Text>
      
      {/* 달력 */}
      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowButton}>
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthYear}>{formatDate(currentMonth)}</Text>
          <TouchableOpacity onPress={handleNextMonth} style={styles.arrowButton}>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        {/* 요일 헤더 */}
        <View style={styles.weekdays}>
          {weekdays.map(day => (
            <Text key={day} style={styles.weekday}>{day}</Text>
          ))}
        </View>
        
        {/* 날짜 그리드 */}
        <View style={styles.datesGrid}>
          {days.map((day, index) => {
            if (day === null) {
              return <View key={index} style={styles.dateCell} />;
            }
            
            const dateString = formatDateString(day);
            const isSelected = selectedDate === dateString;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCell,
                  isSelected && styles.dateCellSelected
                ]}
                onPress={() => handleDateSelect(dateString)}
              >
                <Text style={[
                  styles.dateText,
                  isSelected && styles.dateTextSelected
                ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      {/* 다음 버튼 */}
      <TouchableOpacity 
        style={[styles.nextButton, !selectedDate && styles.buttonDisabled]}
        disabled={!selectedDate}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EVERYTIME_COLORS.background,
    padding: 20,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 20,
  },
  
  calendar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  arrow: {
    fontSize: 18,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  monthYear: {
    fontSize: 16,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  weekdays: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  dateCell: {
    width: '14.28%', // 7일 균등 분할
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  
  dateCellSelected: {
    backgroundColor: EVERYTIME_COLORS.primary,
  },
  
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  dateTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  
  nextButton: {
    height: 52,
    backgroundColor: EVERYTIME_COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
