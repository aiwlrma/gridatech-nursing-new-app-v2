import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Professor, Booking } from '../types';
import { BookingStatusBadge } from './BookingStatusBadge';

interface BookingModalProps {
  visible: boolean;
  selectedDay: number;
  selectedTime: string;
  selectedProfessor: Professor | null;
  onClose: () => void;
  onSave: (booking: {
    professorId: string;
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    location?: string;
    memo?: string;
  }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  selectedDay,
  selectedTime,
  selectedProfessor,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const days = ['월', '화', '수', '목', '금'];

  useEffect(() => {
    if (visible && selectedTime) {
      setStartTime(selectedTime);
      // 기본적으로 1시간 예약으로 설정
      const [hour, minute] = selectedTime.split(':');
      const endHour = parseInt(hour) + 1;
      setEndTime(`${endHour.toString().padStart(2, '0')}:${minute}`);
    }
  }, [visible, selectedTime]);

  const getSelectedDateText = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const targetDay = selectedDay + 1;
    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    
    const month = targetDate.getMonth() + 1;
    const date = targetDate.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[targetDate.getDay()];
    
    return `${month}월 ${date}일 (${dayName})`;
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('입력 오류', '실습명을 입력해주세요.');
      return;
    }

    if (!selectedProfessor) {
      Alert.alert('오류', '교수 정보가 없습니다.');
      return;
    }

    // 날짜 계산 (현재 주의 해당 요일)
    const today = new Date();
    const currentDay = today.getDay(); // 0: 일요일, 1: 월요일, ...
    const targetDay = selectedDay + 1; // selectedDay는 0-4 (월-금), targetDay는 1-5 (월-금)
    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    
    const dateString = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식

    onSave({
      professorId: selectedProfessor.id,
      date: dateString,
      startTime,
      endTime,
      title: title.trim(),
      location: location.trim() || undefined,
      memo: memo.trim() || undefined,
    });

    // 폼 초기화
    setTitle('');
    setLocation('');
    setMemo('');
    setStartTime('');
    setEndTime('');
    onClose();
  };

  const handleClose = () => {
    // 폼 초기화
    setTitle('');
    setLocation('');
    setMemo('');
    setStartTime('');
    setEndTime('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>예약 요청</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 선택된 정보 표시 */}
          <View style={styles.selectedInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 날짜</Text>
              <Text style={styles.infoValue}>{getSelectedDateText()}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🕐 시간</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.infoValue}>{startTime} - {endTime}</Text>
                <TouchableOpacity style={styles.changeButton}>
                  <Text style={styles.changeButtonText}>변경</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 입력 폼 */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>📝 실습명</Text>
              <TextInput
                style={styles.input}
                placeholder="기초 간호 실습"
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>📍 장소 (선택)</Text>
              <TextInput
                style={styles.input}
                placeholder="실습실 A동 302호"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeInputGroup}>
                <Text style={styles.label}>시작 시간</Text>
                <TextInput
                  style={styles.timeInput}
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="14:00"
                />
              </View>
              <View style={styles.timeInputGroup}>
                <Text style={styles.label}>종료 시간</Text>
                <TextInput
                  style={styles.timeInput}
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="15:00"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>💬 메모 (선택)</Text>
              <TextInput
                style={[styles.input, styles.memoInput]}
                placeholder="추가 메모..."
                value={memo}
                onChangeText={setMemo}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* 안내 메시지 */}
          <View style={styles.noticeContainer}>
            <Text style={styles.noticeIcon}>⚠️</Text>
            <Text style={styles.noticeText}>교수님 승인이 필요합니다</Text>
          </View>

          {/* 버튼 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>예약 요청</Text>
            </TouchableOpacity>
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
    borderRadius: 20,
    padding: 24,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1884FF',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    color: '#191F28',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timeInputGroup: {
    flex: 1,
  },
  timeInput: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
    color: '#191F28',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
  },
  memoInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  noticeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  noticeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  noticeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1884FF',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
