import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../constants';

interface AddScheduleModalProps {
  visible: boolean;
  selectedDay: number;
  selectedTime: string;
  onClose: () => void;
  onSave: (schedule: {
    name: string;
    professor: string;
    location: string;
    startTime: string;
    endTime: string;
    day: number;
  }) => void;
}

export const AddScheduleModal: React.FC<AddScheduleModalProps> = ({
  visible,
  selectedDay,
  selectedTime,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const days = ['월', '화', '수', '목', '금'];

  useEffect(() => {
    if (visible) {
      // 모달이 열릴 때마다 폼 초기화
      setName('');
      setProfessor('');
      setLocation('');
      
      if (selectedTime) {
        setStartTime(selectedTime);
        // 기본적으로 1시간 수업으로 설정
        const [hour, minute] = selectedTime.split(':');
        const endHour = parseInt(hour) + 1;
        setEndTime(`${endHour.toString().padStart(2, '0')}:${minute}`);
      } else {
        setStartTime('13:00');
        setEndTime('14:00');
      }
    }
  }, [visible, selectedTime]);

  const handleSave = () => {
    console.log('📝 AddScheduleModal handleSave 호출됨');
    console.log('입력된 데이터:', { name, professor, location, startTime, endTime, day: selectedDay });
    console.log('name 값:', name, '길이:', name.length);
    console.log('professor 값:', professor, '길이:', professor.length);
    console.log('location 값:', location, '길이:', location.length);
    
    if (!name.trim()) {
      Alert.alert('입력 오류', '수업명을 입력해주세요.');
      return;
    }

    if (!professor.trim()) {
      Alert.alert('입력 오류', '교수명을 입력해주세요.');
      return;
    }

    if (!location.trim()) {
      Alert.alert('입력 오류', '장소를 입력해주세요.');
      return;
    }

    const scheduleData = {
      name: name.trim(),
      professor: professor.trim(),
      location: location.trim(),
      startTime,
      endTime,
      day: selectedDay,
    };
    
    console.log('📤 onSave 호출 전:', scheduleData);
    onSave(scheduleData);
    console.log('📤 onSave 호출 완료');

    // 폼 초기화
    setName('');
    setProfessor('');
    setLocation('');
    setStartTime('');
    setEndTime('');
    onClose();
  };

  const handleClose = () => {
    // 폼 초기화
    setName('');
    setProfessor('');
    setLocation('');
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
            <Text style={styles.title}>일정 추가</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 선택된 정보 표시 */}
          <View style={styles.selectedInfo}>
            <View style={styles.infoChip}>
              <Text style={styles.chipIcon}>📅</Text>
              <Text style={styles.chipText}>{days[selectedDay]}요일</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.chipIcon}>🕐</Text>
              <Text style={styles.chipText}>{selectedTime}</Text>
            </View>
          </View>

          {/* 입력 폼 */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>수업명 *</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 기초간호학"
                value={name}
                onChangeText={(text) => {
                  console.log('수업명 입력:', text);
                  setName(text);
                }}
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>교수명 *</Text>
              <TextInput
                style={styles.input}
                placeholder="예: 김교수"
                value={professor}
                onChangeText={(text) => {
                  console.log('교수명 입력:', text);
                  setProfessor(text);
                }}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>장소 *</Text>
              <TextInput
                style={styles.input}
                placeholder="예: A동 302호"
                value={location}
                onChangeText={(text) => {
                  console.log('장소 입력:', text);
                  setLocation(text);
                }}
              />
            </View>

            <View style={styles.timeRow}>
              <View style={styles.timeInputGroup}>
                <Text style={styles.label}>시작 시간</Text>
                <TextInput
                  style={styles.timeInput}
                  value={startTime}
                  onChangeText={setStartTime}
                  placeholder="09:00"
                />
              </View>
              <View style={styles.timeInputGroup}>
                <Text style={styles.label}>종료 시간</Text>
                <TextInput
                  style={styles.timeInput}
                  value={endTime}
                  onChangeText={setEndTime}
                  placeholder="10:00"
                />
              </View>
            </View>
          </View>

          {/* 버튼 */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>저장</Text>
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
    zIndex: 1000,
    elevation: 1000,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    maxHeight: '85%',
    width: '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 1001,
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  selectedInfo: {
    flexDirection: 'row',
    gap: SIZES.spacing.sm,
    marginBottom: SIZES.spacing.xl,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: SIZES.spacing.md,
    paddingVertical: SIZES.spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  chipIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  form: {
    marginBottom: SIZES.spacing.xl,
  },
  inputGroup: {
    marginBottom: SIZES.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SIZES.spacing.sm,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  input: {
    backgroundColor: COLORS.background,
    padding: SIZES.spacing.md,
    borderRadius: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontFamily: Platform.select({
      ios: 'Pretendard-Regular',
      android: 'Pretendard-Regular',
    }),
  },
  timeRow: {
    flexDirection: 'row',
    gap: SIZES.spacing.md,
  },
  timeInputGroup: {
    flex: 1,
  },
  timeInput: {
    backgroundColor: COLORS.background,
    padding: SIZES.spacing.md,
    borderRadius: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Pretendard-Regular',
      android: 'Pretendard-Regular',
    }),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SIZES.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: SIZES.spacing.md,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
  saveButton: {
    flex: 1,
    paddingVertical: SIZES.spacing.md,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
});
