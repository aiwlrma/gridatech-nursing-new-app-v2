import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSelectionStepProps {
  selectedDate: string;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TimeSelectionStep: React.FC<TimeSelectionStepProps> = ({
  selectedDate,
  onTimeSelect,
  onNext,
  onBack,
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 시간 슬롯 데이터 (실제로는 API에서 가져올 것)
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00', available: true },
    { id: '2', time: '10:00', available: true },
    { id: '3', time: '11:00', available: false },
    { id: '4', time: '12:00', available: true },
    { id: '5', time: '13:00', available: true },
    { id: '6', time: '14:00', available: true },
    { id: '7', time: '15:00', available: false },
    { id: '8', time: '16:00', available: true },
    { id: '9', time: '17:00', available: true },
    { id: '10', time: '18:00', available: true },
  ];

  const handleTimeSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot.time);
      onTimeSelect(slot.time);
    }
  };

  const handleNext = () => {
    if (selectedTime) {
      onNext();
    }
  };

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    
    return `${month}월 ${day}일 (${weekday})`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>시간 선택</Text>
      
      {/* 선택한 날짜 표시 */}
      <View style={styles.selectedInfo}>
        <Text style={styles.infoIcon}>📅</Text>
        <Text style={styles.infoText}>{formatDateDisplay(selectedDate)}</Text>
      </View>
      
      {/* 시간 슬롯 */}
      <ScrollView style={styles.timeSlots} showsVerticalScrollIndicator={false}>
        {timeSlots.map(slot => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlot,
              selectedTime === slot.time && styles.timeSlotSelected,
              !slot.available && styles.timeSlotDisabled
            ]}
            disabled={!slot.available}
            onPress={() => handleTimeSelect(slot)}
            activeOpacity={0.7}
          >
            <View style={styles.timeSlotContent}>
              <Text style={[
                styles.timeText,
                selectedTime === slot.time && styles.timeTextSelected,
                !slot.available && styles.timeTextDisabled
              ]}>
                {slot.time}
              </Text>
              {!slot.available && (
                <Text style={styles.unavailableText}>예약 불가</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, !selectedTime && styles.buttonDisabled]}
          disabled={!selectedTime}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>
      </View>
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
  
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  timeSlots: {
    flex: 1,
    marginBottom: 20,
  },
  
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  
  timeSlotSelected: {
    borderColor: EVERYTIME_COLORS.primary,
    backgroundColor: '#E3F2FD',
  },
  
  timeSlotDisabled: {
    backgroundColor: '#F9FAFB',
    opacity: 0.5,
  },
  
  timeSlotContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  timeTextSelected: {
    color: EVERYTIME_COLORS.primary,
  },
  
  timeTextDisabled: {
    color: '#9CA3AF',
  },
  
  unavailableText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#EF4444',
  },
  
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  
  backButton: {
    flex: 1,
    height: 52,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  nextButton: {
    flex: 1,
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
