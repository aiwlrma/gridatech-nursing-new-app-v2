import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { BLUE_THEME } from '../constants/blueTheme';

interface CollapsibleCalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  hasEvents?: { [key: string]: boolean };
}

export const CollapsibleCalendar: React.FC<CollapsibleCalendarProps> = ({
  onDateSelect,
  selectedDate = new Date(),
  hasEvents = {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatMonthYear = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const formatToday = (date: Date) => {
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = weekDays[date.getDay()];
    return `${month}월 ${day}일 (${weekDay})`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const hasEvent = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return hasEvents[dateKey];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const handleDatePress = (date: Date) => {
    onDateSelect?.(date);
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <View style={styles.container}>
      {/* 빠른 날짜 (항상 표시) */}
      <View style={styles.dateQuick}>
        <View style={styles.dateInfo}>
          <Calendar size={20} color="#1884FF" />
          <Text style={styles.dateText}>{formatToday(selectedDate)}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.expandButton}
        >
          <Text style={styles.expandButtonText}>
            {isExpanded ? '접기 ▲' : '펼치기 ▼'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 달력 (접을 수 있음) */}
      {isExpanded && (
        <View style={styles.calendarSection}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
              <ChevronLeft size={20} color={BLUE_THEME.text} />
            </TouchableOpacity>
            <Text style={styles.monthYear}>{formatMonthYear(currentMonth)}</Text>
            <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
              <ChevronRight size={20} color={BLUE_THEME.text} />
            </TouchableOpacity>
          </View>

          {/* 요일 헤더 */}
          <View style={styles.weekHeader}>
            {weekDays.map((day, index) => (
              <Text key={index} style={[styles.weekDay, index === 0 && styles.sunday]}>
                {day}
              </Text>
            ))}
          </View>

          {/* 달력 그리드 */}
          <View style={styles.calendarGrid}>
            {days.map((date, index) => {
              if (!date) {
                return <View key={index} style={styles.dayCell} />;
              }

              const isTodayDate = isToday(date);
              const isSelectedDate = isSelected(date);
              const hasEventDate = hasEvent(date);

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayCell,
                    isTodayDate && styles.todayCell,
                    isSelectedDate && styles.selectedCell,
                  ]}
                  onPress={() => handleDatePress(date)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isTodayDate && styles.todayText,
                      isSelectedDate && styles.selectedText,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  {hasEventDate && <View style={styles.eventDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  // 빠른 날짜
  dateQuick: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  
  expandButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  
  expandButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1884FF',
  },
  
  // 달력 섹션
  calendarSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  
  navButton: {
    padding: 8,
  },
  
  monthYear: {
    fontSize: 16,
    fontWeight: '700',
    color: BLUE_THEME.text,
  },
  
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: BLUE_THEME.textSecondary,
    paddingVertical: 8,
  },
  
  sunday: {
    color: '#EF4444',
  },
  
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  dayCell: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  todayCell: {
    backgroundColor: BLUE_THEME.primary,
    borderRadius: 8,
  },
  
  selectedCell: {
    backgroundColor: BLUE_THEME.primary,
    borderRadius: 8,
  },
  
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: BLUE_THEME.text,
  },
  
  todayText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#10B981',
  },
});
