import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { ClassSchedule } from '../types';
import { COLORS, SIZES } from '../constants';

interface ClassDetailModalProps {
  visible: boolean;
  schedule: ClassSchedule | null;
  onClose: () => void;
  onMapPress?: (schedule: ClassSchedule) => void;
  onMemoPress?: (schedule: ClassSchedule) => void;
  onNotificationPress?: (schedule: ClassSchedule) => void;
}

// 수업 블록 색상 정의
const classColors = [
  { bg: '#E3F2FD', border: '#1884FF' }, // 파랑
  { bg: '#FFF7ED', border: '#F59E0B' }, // 주황
  { bg: '#ECFDF5', border: '#10B981' }, // 초록
  { bg: '#F5F3FF', border: '#8B5CF6' }, // 보라
  { bg: '#FEF2F2', border: '#EF4444' }, // 빨강
];

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({
  visible,
  schedule,
  onClose,
  onMapPress,
  onMemoPress,
  onNotificationPress,
}) => {
  if (!schedule) return null;

  const color = classColors[schedule.colorIndex] || classColors[0];
  const days = ['월', '화', '수', '목', '금'];

  const handleMapPress = () => {
    onMapPress?.(schedule);
    Alert.alert('지도 보기', `${schedule.location} 위치를 지도에서 확인합니다.`);
  };

  const handleMemoPress = () => {
    onMemoPress?.(schedule);
    Alert.alert('메모 추가', '수업 메모를 추가할 수 있습니다.');
  };

  const handleNotificationPress = () => {
    onNotificationPress?.(schedule);
    Alert.alert('알림 설정', '수업 시작 전 알림을 설정할 수 있습니다.');
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
          <View style={styles.modalHeader}>
            <View style={[styles.colorBar, { backgroundColor: color.border }]} />
            <View style={styles.headerContent}>
              <Text style={styles.modalTitle}>{schedule.name}</Text>
              <Text style={styles.classCode}>NURS{schedule.id.padStart(3, '0')}</Text>
            </View>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* 기본 정보 */}
            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>👨‍🏫</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>교수</Text>
                  <Text style={styles.infoValue}>{schedule.professor}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🕐</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>시간</Text>
                  <Text style={styles.infoValue}>
                    {days[schedule.day]}요일 {schedule.startTime} - {schedule.endTime}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>장소</Text>
                  <Text style={styles.infoValue}>{schedule.location}</Text>
                </View>
              </View>
            </View>

            {/* 액션 버튼 */}
            <View style={styles.actionSection}>
              <Text style={styles.sectionTitle}>액션</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionBtn} onPress={handleMapPress}>
                  <Text style={styles.actionIcon}>📍</Text>
                  <Text style={styles.actionText}>지도에서 보기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={handleMemoPress}>
                  <Text style={styles.actionIcon}>📝</Text>
                  <Text style={styles.actionText}>메모 추가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionBtn} onPress={handleNotificationPress}>
                  <Text style={styles.actionIcon}>🔔</Text>
                  <Text style={styles.actionText}>알림 설정</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 추가 정보 */}
            <View style={styles.additionalSection}>
              <Text style={styles.sectionTitle}>추가 정보</Text>
              <View style={styles.additionalInfo}>
                <View style={styles.additionalRow}>
                  <Text style={styles.additionalLabel}>수업 코드</Text>
                  <Text style={styles.additionalValue}>NURS{schedule.id.padStart(3, '0')}</Text>
                </View>
                <View style={styles.additionalRow}>
                  <Text style={styles.additionalLabel}>학점</Text>
                  <Text style={styles.additionalValue}>3학점</Text>
                </View>
                <View style={styles.additionalRow}>
                  <Text style={styles.additionalLabel}>수업 유형</Text>
                  <Text style={styles.additionalValue}>이론</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* 하단 버튼 */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>✏️ 편집</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>닫기</Text>
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
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  colorBar: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: SIZES.spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  classCode: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  scrollContent: {
    padding: SIZES.spacing.lg,
  },
  infoSection: {
    marginBottom: SIZES.spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.spacing.lg,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: SIZES.spacing.md,
    width: 32,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  actionSection: {
    marginBottom: SIZES.spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.spacing.md,
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SIZES.spacing.sm,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.spacing.md,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  additionalSection: {
    marginBottom: SIZES.spacing.lg,
  },
  additionalInfo: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SIZES.spacing.md,
  },
  additionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.spacing.sm,
  },
  additionalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Medium',
      android: 'Pretendard-Medium',
    }),
  },
  additionalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: SIZES.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SIZES.spacing.sm,
  },
  editBtn: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  closeBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
});

