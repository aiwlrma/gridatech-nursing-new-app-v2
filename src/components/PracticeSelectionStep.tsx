import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface Practice {
  id: string;
  name: string;
  location: string;
  professor: string;
  duration: string;
}

interface PracticeSelectionStepProps {
  selectedDate: string;
  selectedTime: string;
  onPracticeSelect: (practiceId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PracticeSelectionStep: React.FC<PracticeSelectionStepProps> = ({
  selectedDate,
  selectedTime,
  onPracticeSelect,
  onNext,
  onBack,
}) => {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  // 실습 종류 데이터 (실제로는 API에서 가져올 것)
  const practices: Practice[] = [
    {
      id: '1',
      name: '기초 간호 실습',
      location: '실습실 A동 302호',
      professor: '김교수',
      duration: '2시간',
    },
    {
      id: '2',
      name: '성인간호학 실습',
      location: '실습실 B동 201호',
      professor: '이교수',
      duration: '2시간',
    },
    {
      id: '3',
      name: '아동간호학 실습',
      location: '실습실 C동 103호',
      professor: '박교수',
      duration: '2시간',
    },
    {
      id: '4',
      name: '정신간호학 실습',
      location: '실습실 D동 405호',
      professor: '최교수',
      duration: '2시간',
    },
  ];

  const handlePracticeSelect = (practiceId: string) => {
    setSelectedPractice(practiceId);
    onPracticeSelect(practiceId);
  };

  const handleNext = () => {
    if (selectedPractice) {
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
      <Text style={styles.sectionTitle}>실습 선택</Text>
      
      {/* 선택 정보 요약 */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>📅</Text>
          <Text style={styles.summaryText}>{formatDateDisplay(selectedDate)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryIcon}>⏰</Text>
          <Text style={styles.summaryText}>{selectedTime}</Text>
        </View>
      </View>
      
      {/* 실습 종류 리스트 */}
      <ScrollView style={styles.practiceList} showsVerticalScrollIndicator={false}>
        {practices.map(practice => (
          <TouchableOpacity
            key={practice.id}
            style={[
              styles.practiceItem,
              selectedPractice === practice.id && styles.practiceItemSelected
            ]}
            onPress={() => handlePracticeSelect(practice.id)}
            activeOpacity={0.7}
          >
            <View style={styles.practiceInfo}>
              <Text style={styles.practiceName}>{practice.name}</Text>
              <View style={styles.practiceDetails}>
                <Text style={styles.practiceLocation}>📍 {practice.location}</Text>
                <Text style={styles.practiceProfessor}>👤 {practice.professor}</Text>
              </View>
              <Text style={styles.practiceDuration}>⏱️ {practice.duration}</Text>
            </View>
            {selectedPractice === practice.id && (
              <View style={styles.checkIcon}>
                <Text style={styles.checkText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, !selectedPractice && styles.buttonDisabled]}
          disabled={!selectedPractice}
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
  
  summary: {
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
  
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  summaryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  practiceList: {
    flex: 1,
    marginBottom: 20,
  },
  
  practiceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  
  practiceItemSelected: {
    borderColor: EVERYTIME_COLORS.primary,
    backgroundColor: '#E3F2FD',
  },
  
  practiceInfo: {
    flex: 1,
  },
  
  practiceName: {
    fontSize: 16,
    fontWeight: '700',
    color: EVERYTIME_COLORS.textPrimary,
    marginBottom: 8,
  },
  
  practiceDetails: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  
  practiceLocation: {
    fontSize: 13,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
    marginRight: 16,
  },
  
  practiceProfessor: {
    fontSize: 13,
    fontWeight: '500',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  practiceDuration: {
    fontSize: 12,
    fontWeight: '500',
    color: EVERYTIME_COLORS.primary,
  },
  
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: EVERYTIME_COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  checkText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
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
