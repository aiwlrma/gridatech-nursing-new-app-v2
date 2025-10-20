import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ChevronLeft, Calendar, Clock, MapPin, User } from 'lucide-react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { DatePickerModal } from '../components/DatePickerModal';
import { TimePickerModal } from '../components/TimePickerModal';

interface AddReservationScreenProps {
  onBack: () => void;
  onSave: (reservation: {
    title: string;
    date: string;
    time: string;
    location: string;
    professor: string;
  }) => void;
}

export const AddReservationScreen: React.FC<AddReservationScreenProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    professor: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    // 필수 필드 검증
    if (!formData.title.trim()) {
      alert('예약 제목을 입력해주세요.');
      return;
    }
    if (!formData.date.trim()) {
      alert('날짜를 입력해주세요.');
      return;
    }
    if (!formData.time.trim()) {
      alert('시간을 입력해주세요.');
      return;
    }
    if (!formData.location.trim()) {
      alert('장소를 입력해주세요.');
      return;
    }
    if (!formData.professor.trim()) {
      alert('담당 교수를 입력해주세요.');
      return;
    }

    // 데이터 저장
    onSave(formData);
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
    setShowDatePicker(false);
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setShowTimePicker(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft color="#1A1F2E" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>새 예약 추가</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 폼 */}
        <View style={styles.form}>
          {/* 제목 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>예약 제목</Text>
            <View style={styles.inputContainer}>
              <Calendar color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="예: 기초 간호 실습"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* 날짜 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>날짜</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Calendar color="#6B7280" size={20} style={styles.inputIcon} />
              <Text style={[styles.input, formData.date ? styles.inputText : styles.placeholderText]}>
                {formData.date || '2025-01-15'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 시간 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>시간</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
            >
              <Clock color="#6B7280" size={20} style={styles.inputIcon} />
              <Text style={[styles.input, formData.time ? styles.inputText : styles.placeholderText]}>
                {formData.time || '14:00'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 장소 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>장소</Text>
            <View style={styles.inputContainer}>
              <MapPin color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="실습실 A동 302호"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* 교수 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>담당 교수</Text>
            <View style={styles.inputContainer}>
              <User color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="김교수"
                value={formData.professor}
                onChangeText={(text) => setFormData({ ...formData, professor: text })}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>예약 저장</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 날짜 선택 모달 */}
      <DatePickerModal
        visible={showDatePicker}
        selectedDate={formData.date}
        onClose={() => setShowDatePicker(false)}
        onSelect={handleDateSelect}
      />

      {/* 시간 선택 모달 */}
      <TimePickerModal
        visible={showTimePicker}
        selectedTime={formData.time}
        onClose={() => setShowTimePicker(false)}
        onSelect={handleTimeSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  form: {
    marginTop: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1F2E',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1F2E',
  },
  inputText: {
    color: '#1A1F2E',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  saveButton: {
    backgroundColor: BLUE_THEME.primary,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});