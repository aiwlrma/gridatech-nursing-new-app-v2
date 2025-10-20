import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { ClassSchedule, Schedule } from '../types';

interface TimetableGridProps {
  schedules: ClassSchedule[];
  newSchedules?: Schedule[];
  onClassPress?: (schedule: ClassSchedule) => void;
  onNewSchedulePress?: (schedule: Schedule) => void;
  onEmptySlotPress?: (day: number, time: string) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  schedules,
  newSchedules = [],
  onClassPress,
  onNewSchedulePress,
  onEmptySlotPress,
}) => {
  console.log('TimetableGrid 렌더링됨, schedules:', schedules);
  console.log('TimetableGrid 렌더링됨, newSchedules:', newSchedules);
  const { width: screenWidth } = Dimensions.get('window');
  const days = ['월', '화', '수', '목', '금'];
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // 시간표 최종 크기 조정 - 정확히 5개 요일 표시
  const isSmallScreen = screenWidth < 400;
  const HOUR_HEIGHT = 80; // 1시간 = 80px (고정)
  const cellHeight = HOUR_HEIGHT; // 모든 시간 셀을 80px로 통일
  const timeColumnWidth = 45; // 시간 컬럼 최소화 (60px → 45px)
  const dayColumnWidth = 65; // 요일 컬럼 최소화 (100px → 65px)
  const headerHeight = 50; // 헤더 높이 축소 (60px → 50px)

  // 시간을 분으로 변환하는 함수
  const timeToMinutes = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  // 정확한 블록 위치 계산 (09:00 기준)
  const getBlockTop = (startTime: string): number => {
    const startMinutes = timeToMinutes(startTime);
    const baseMinutes = timeToMinutes('09:00'); // 09:00 = 540분
    const offsetMinutes = startMinutes - baseMinutes;
    return (offsetMinutes / 60) * HOUR_HEIGHT;
  };

  // 정확한 블록 높이 계산
  const getBlockHeight = (startTime: string, endTime: string): number => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const duration = endMinutes - startMinutes;
    return (duration / 60) * HOUR_HEIGHT;
  };

  // 요일별 좌측 위치 계산
  const getDayPosition = (day: number): number => {
    return day * dayColumnWidth; // 픽셀 단위로 계산
  };

  // 수업 블록 높이에 따른 정보 표시 전략 (최종 축소 버전)
  const shouldShowProfessor = (height: number): boolean => height >= 60;
  const shouldShowLocation = (height: number): boolean => height >= 90;

  // 텍스트 처리 함수들 (최종 축소 버전)
  const truncateTitle = (title: string): string => {
    // 과목명 최대 5글자
    return title.length > 5 ? title.substring(0, 5) : title;
  };

  const truncateProfessor = (name: string): string => {
    // 교수명 1글자 + "..."
    return name.length > 1 ? name[0] + '...' : name;
  };

  const abbreviateLocation = (location: string): string => {
    // 장소 축약: "A동 302호" → "A302"
    const match = location.match(/([A-Z가-힣]).*?(\d+)/);
    if (match) {
      return match[1] + match[2];
    }
    
    // "실습실1" → "실1"
    if (location.includes('실습')) {
      return location.replace('실습실', '실').substring(0, 4);
    }
    
    return location.substring(0, 4);
  };

  const formatTime = (time: string): string => {
    // 시간 축약: "09:00" → "9시"
    const hour = time.split(':')[0].replace(/^0/, '');
    return hour + '시';
  };

  // 특정 요일과 시간에 수업이 있는지 확인
  const hasClassAtTime = (day: number, time: string): boolean => {
    return schedules.some(schedule => 
      schedule.day === day && 
      schedule.startTime === time
    );
  };

  // 특정 요일의 수업들 가져오기
  const getClassesForDay = (day: number) => {
    return schedules.filter(schedule => schedule.day === day);
  };

  // 특정 요일의 새 일정들 가져오기
  const getNewSchedulesForDay = (day: number) => {
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const dayName = dayNames[day];
    return newSchedules.filter(schedule => schedule.day === dayName);
  };


  // 블록 위치 계산 (상단)
  const calculateTop = (startTime: string): number => {
    const [hour, minute] = startTime.split(':').map(Number);
    const baseHour = 9; // 09:00 시작
    const hourOffset = (hour - baseHour) * 80;
    const minuteOffset = (minute / 60) * 80;
    return hourOffset + minuteOffset;
  };

  // 블록 높이 계산
  const calculateHeight = (startTime: string, endTime: string): number => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const duration = endMinutes - startMinutes;
    return (duration / 60) * 80;
  };

  // 빈 칸 클릭 핸들러
  const handleEmptySlotPress = (day: number, time: string) => {
    onEmptySlotPress?.(day, time);
  };

  return (
    <View style={styles.scrollContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.verticalScroll}
          contentContainerStyle={styles.verticalScrollContent}
        >
          <View style={styles.timetable}>
        {/* 시간 열 */}
        <View style={[styles.timeColumn, { width: timeColumnWidth }]}>
          <View style={[styles.dayHeader, { height: headerHeight }]} />
          {timeSlots.map((time, index) => (
            <View key={index} style={styles.timeCell}>
              <Text style={[styles.timeText, { fontSize: isSmallScreen ? 10 : 11 }]}>{time}</Text>
            </View>
          ))}
        </View>

        {/* 요일 열들 */}
        {days.map((day, dayIndex) => (
          <View key={dayIndex} style={[styles.dayColumn, { width: dayColumnWidth }]}>
            <View style={[styles.dayHeader, { height: headerHeight }]}>
              <Text style={[styles.dayText, { fontSize: isSmallScreen ? 12 : 13 }]}>{day}</Text>
            </View>
            
            <View style={[styles.scheduleContainer, { height: HOUR_HEIGHT * 9 }]}>
              {/* 빈 칸들 (클릭 가능) */}
              {timeSlots.map((time, timeIndex) => {
                const hasClass = hasClassAtTime(dayIndex, time);
                if (hasClass) return null;
                
                return (
                  <TouchableOpacity
                    key={`empty-${dayIndex}-${time}`}
                    style={[
                      styles.emptySlot,
                      { 
                        top: timeIndex * HOUR_HEIGHT,
                        height: HOUR_HEIGHT
                      }
                    ]}
                    onPress={() => handleEmptySlotPress(dayIndex, time)}
                    activeOpacity={0.3}
                  />
                );
              })}
              
               {/* 기존 수업 블록들 */}
               {getClassesForDay(dayIndex).map((schedule) => {
                 const blockHeight = getBlockHeight(schedule.startTime, schedule.endTime);
                 return (
                   <TouchableOpacity
                     key={schedule.id}
                     style={[
                       styles.classBlock,
                       {
                         top: getBlockTop(schedule.startTime),
                         height: blockHeight,
                         left: 2,
                         width: dayColumnWidth - 4,
                         backgroundColor: getClassColor(schedule.colorIndex),
                       }
                     ]}
                     onPress={() => onClassPress?.(schedule)}
                     activeOpacity={0.85}
                   >
                     <Text style={styles.scheduleTitle} numberOfLines={2}>
                       {schedule.name}
                     </Text>
                     <Text style={styles.scheduleTime} numberOfLines={1}>
                       {schedule.startTime}
                     </Text>
                   </TouchableOpacity>
                 );
               })}
               
               {/* 새로운 일정 블록들 */}
               {getNewSchedulesForDay(dayIndex).map((schedule) => {
                 const blockHeight = calculateHeight(schedule.startTime, schedule.endTime);
                 return (
                   <TouchableOpacity
                     key={schedule.id}
                     style={[
                       styles.scheduleBlock,
                       {
                         top: calculateTop(schedule.startTime),
                         height: Math.max(blockHeight, 60),
                         left: 2,
                         width: dayColumnWidth - 4,
                         backgroundColor: schedule.color,
                         borderWidth: 2,
                         borderColor: 'rgba(0,0,0,0.1)',
                       }
                     ]}
                     onPress={() => onNewSchedulePress?.(schedule)}
                     activeOpacity={0.85}
                   >
                     <Text style={styles.scheduleTitle} numberOfLines={2}>
                       {schedule.title}
                     </Text>
                     <Text style={styles.scheduleTime} numberOfLines={1}>
                       {schedule.startTime}
                     </Text>
                     {blockHeight >= 60 && (
                       <Text style={styles.scheduleProfessor} numberOfLines={1}>
                         {schedule.professor}
                       </Text>
                     )}
                     {blockHeight >= 80 && (
                       <Text style={styles.scheduleLocation} numberOfLines={1}>
                         {schedule.location}
                       </Text>
                     )}
                   </TouchableOpacity>
                 );
               })}
            </View>
          </View>
        ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

// 구글 캘린더 스타일 색상 팔레트 (진한 색상)
const getClassColor = (colorIndex: number): string => {
  const colors = [
    '#EF4444', // 빨강
    '#3B82F6', // 파랑
    '#F59E0B', // 주황
    '#10B981', // 초록
    '#8B5CF6', // 보라
    '#EC4899', // 핑크
    '#14B8A6', // 청록
    '#6B7280', // 회색
  ];
  return colors[colorIndex % colors.length];
};

// 시간 표시 형식 변경 (한국어)
const formatTimeKorean = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${period} ${displayHour}:${minute.toString().padStart(2, '0')}`;
};

// 텍스트 표시 함수들 (줄임표 최소화)
const displayTitle = (title: string): string => {
  // 7글자까지 표시 (기존 5글자에서 확장)
  return title.length > 7 ? title.substring(0, 7) + '...' : title;
};

const displayProfessor = (name: string): string => {
  // 전체 표시 (기존: 1글자 + ...)
  return name;
};

const abbreviateLocation = (location: string): string => {
  // 장소 축약: "A동 302호" → "A302"
  const match = location.match(/([A-Z가-힣]).*?(\d+)/);
  if (match) {
    return match[1] + match[2];
  }
  
  // "실습실1" → "실1"
  if (location.includes('실습')) {
    return location.replace('실습실', '실').substring(0, 4);
  }
  
  return location.substring(0, 4);
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  horizontalScroll: {
    flex: 1,
  },
  horizontalScrollContent: {
    flexGrow: 1,
  },
  verticalScroll: {
    flex: 1,
  },
  verticalScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  timetable: {
    flexDirection: 'row',
    minWidth: 370,
    minHeight: 600,
  },
  timeColumn: {
    width: 50,
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  timeCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  dayColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },
  dayHeader: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#191F28',
  },
  scheduleContainer: {
    position: 'relative',
  },
  emptySlot: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  classBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    backgroundColor: '#1884FF',
    borderRadius: 4,
    padding: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  className: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  classProfessor: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  classLocation: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 1,
  },
  classTime: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  // 새로운 일정 블록 스타일
  scheduleBlock: {
    position: 'absolute',
    padding: 6,
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  scheduleTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  scheduleProfessor: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 1,
  },
  scheduleLocation: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
