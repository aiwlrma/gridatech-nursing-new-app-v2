import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, SIZES } from '../constants';

interface DownloadModalProps {
  visible: boolean;
  onClose: () => void;
  onImageDownload?: () => void;
  onPDFDownload?: () => void;
  onCalendarSync?: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  visible,
  onClose,
  onImageDownload,
  onPDFDownload,
  onCalendarSync,
}) => {
  const handleImageDownload = () => {
    onImageDownload?.();
    Alert.alert('이미지 저장', '시간표가 갤러리에 저장되었습니다.');
    onClose();
  };

  const handlePDFDownload = () => {
    onPDFDownload?.();
    Alert.alert('PDF 저장', '시간표 PDF가 생성되었습니다.');
    onClose();
  };

  const handleCalendarSync = () => {
    onCalendarSync?.();
    Alert.alert('캘린더 연동', '수업 일정이 캘린더에 추가되었습니다.');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>다운로드</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleImageDownload}
            >
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>📷</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>이미지로 저장</Text>
                <Text style={styles.optionDescription}>
                  시간표를 이미지 파일로 저장
                </Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handlePDFDownload}
            >
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>📄</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>PDF로 저장</Text>
                <Text style={styles.optionDescription}>
                  시간표를 PDF 문서로 저장
                </Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleCalendarSync}
            >
              <View style={styles.optionIconContainer}>
                <Text style={styles.optionIcon}>📅</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>캘린더 연동</Text>
                <Text style={styles.optionDescription}>
                  수업 일정을 캘린더 앱에 추가
                </Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
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
    padding: SIZES.spacing.lg,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  optionsContainer: {
    padding: SIZES.spacing.lg,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing.md,
    borderRadius: 12,
    marginBottom: SIZES.spacing.sm,
    backgroundColor: COLORS.background,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
  optionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-Regular',
      android: 'Pretendard-Regular',
    }),
  },
  arrowIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: SIZES.spacing.sm,
  },
  cancelButton: {
    margin: SIZES.spacing.lg,
    padding: SIZES.spacing.md,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: Platform.select({
      ios: 'Pretendard-SemiBold',
      android: 'Pretendard-SemiBold',
    }),
  },
});

