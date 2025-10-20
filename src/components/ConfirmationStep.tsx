import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EVERYTIME_COLORS } from '../constants/everytimeTheme';

interface ConfirmationStepProps {
  selectedDate: string;
  selectedTime: string;
  selectedPractice: string;
  practiceDetails: {
    name: string;
    location: string;
    professor: string;
    duration: string;
  };
  onConfirm: () => void;
  onBack: () => void;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedDate,
  selectedTime,
  selectedPractice,
  practiceDetails,
  onConfirm,
  onBack,
}) => {
  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  const getEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endHours = hours + 2; // 2시간 후
    return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>예약 확인</Text>
      
      {/* 예약 정보 카드 */}
      <View style={styles.confirmCard}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>날짜</Text>
          <Text style={styles.confirmValue}>{formatDateDisplay(selectedDate)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>시간</Text>
          <Text style={styles.confirmValue}>{selectedTime} - {getEndTime(selectedTime)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>실습</Text>
          <Text style={styles.confirmValue}>{practiceDetails.name}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>장소</Text>
          <Text style={styles.confirmValue}>{practiceDetails.location}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>담당</Text>
          <Text style={styles.confirmValue}>{practiceDetails.professor}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>소요시간</Text>
          <Text style={styles.confirmValue}>{practiceDetails.duration}</Text>
        </View>
      </View>
      
      {/* 준비물 안내 */}
      <View style={styles.noticeBox}>
        <Text style={styles.noticeIcon}>✅</Text>
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>준비물 안내</Text>
          <Text style={styles.noticeText}>
            청진기, 혈압계, 실습복, 노트북
          </Text>
        </View>
      </View>
      
      {/* 주의사항 */}
      <View style={styles.warningBox}>
        <Text style={styles.warningIcon}>⚠️</Text>
        <View style={styles.warningContent}>
          <Text style={styles.warningTitle}>주의사항</Text>
          <Text style={styles.warningText}>
            • 실습 10분 전까지 도착해주세요{'\n'}
            • 지각 시 예약이 취소될 수 있습니다{'\n'}
            • 실습복 착용 필수
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>예약하기</Text>
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
  
  confirmCard: {
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
  
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  
  confirmLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textSecondary,
  },
  
  confirmValue: {
    fontSize: 14,
    fontWeight: '600',
    color: EVERYTIME_COLORS.textPrimary,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  
  noticeBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  noticeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  
  noticeContent: {
    flex: 1,
  },
  
  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  
  noticeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#10B981',
    lineHeight: 18,
  },
  
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  warningIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  
  warningContent: {
    flex: 1,
  },
  
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 4,
  },
  
  warningText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#F59E0B',
    lineHeight: 18,
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
  
  confirmButton: {
    flex: 1,
    height: 52,
    backgroundColor: EVERYTIME_COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: EVERYTIME_COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
