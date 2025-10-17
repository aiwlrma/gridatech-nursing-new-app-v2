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

interface AddReservationScreenProps {
  onBack: () => void;
}

export const AddReservationScreen: React.FC<AddReservationScreenProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    professor: '',
  });

  const handleSave = () => {
    console.log('예약 저장:', formData);
    // TODO: 실제 저장 로직 구현
    onBack();
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
            <View style={styles.inputContainer}>
              <Calendar color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="2025-01-15"
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* 시간 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>시간</Text>
            <View style={styles.inputContainer}>
              <Clock color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="14:00"
                value={formData.time}
                onChangeText={(text) => setFormData({ ...formData, time: text })}
                placeholderTextColor="#9CA3AF"
              />
            </View>
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
    color: '#1A1F2E',
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