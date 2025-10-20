import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, SIZES } from '../constants';

interface TimePickerModalProps {
  visible: boolean;
  selectedTime: string;
  onClose: () => void;
  onSelect: (time: string) => void;
}

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  selectedTime,
  onClose,
  onSelect,
}) => {
  // 시간 옵션 생성 (09:00 ~ 18:00, 30분 간격)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeSelect = (time: string) => {
    onSelect(time);
    onClose();
  };

  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const period = hourNum < 12 ? '오전' : '오후';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${period} ${displayHour}:${minute}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <Text style={styles.title}>시간 선택</Text>
            <View style={styles.placeholder} />
          </View>

          {/* 시간 옵션 리스트 */}
          <ScrollView 
            style={styles.timeList}
            showsVerticalScrollIndicator={false}
          >
            {timeOptions.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedTime === time && styles.selectedTimeOption,
                ]}
                onPress={() => handleTimeSelect(time)}
                activeOpacity={0.7}
              >
                <View style={styles.timeContent}>
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.selectedTimeText,
                    ]}
                  >
                    {formatTimeDisplay(time)}
                  </Text>
                  <Text
                    style={[
                      styles.timeValue,
                      selectedTime === time && styles.selectedTimeValue,
                    ]}
                  >
                    {time}
                  </Text>
                </View>
                {selectedTime === time && (
                  <View style={styles.checkIcon}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 빠른 선택 버튼들 */}
          <View style={styles.quickSelectContainer}>
            <Text style={styles.quickSelectTitle}>빠른 선택</Text>
            <View style={styles.quickSelectButtons}>
              {['09:00', '12:00', '14:00', '16:00', '18:00'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.quickSelectButton,
                    selectedTime === time && styles.selectedQuickButton,
                  ]}
                  onPress={() => handleTimeSelect(time)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.quickSelectText,
                      selectedTime === time && styles.selectedQuickText,
                    ]}
                  >
                    {formatTimeDisplay(time)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SIZES.spacing.lg,
    maxHeight: '70%',
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
  timeList: {
    maxHeight: 300,
    marginBottom: SIZES.spacing.lg,
  },
  timeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.spacing.md,
    paddingHorizontal: SIZES.spacing.lg,
    borderRadius: 12,
    marginBottom: SIZES.spacing.xs,
    backgroundColor: COLORS.background,
  },
  selectedTimeOption: {
    backgroundColor: COLORS.primary,
  },
  timeContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  selectedTimeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  timeValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  selectedTimeValue: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  quickSelectContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.spacing.lg,
  },
  quickSelectTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SIZES.spacing.md,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.spacing.sm,
  },
  quickSelectButton: {
    paddingVertical: SIZES.spacing.sm,
    paddingHorizontal: SIZES.spacing.md,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedQuickButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  quickSelectText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  selectedQuickText: {
    color: '#FFFFFF',
  },
});
