import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NursingBadge } from '../data/nursingBadges';
import { SvgIcon } from './SvgIcon';

interface VRConfirmModalProps {
  visible: boolean;
  badge: NursingBadge | null;
  onClose: () => void;
  onConfirm: (badge: NursingBadge) => void;
}

export const VRConfirmModal: React.FC<VRConfirmModalProps> = ({
  visible,
  badge,
  onClose,
  onConfirm,
}) => {
  if (!badge) return null;

  const handleConfirm = () => {
    onConfirm(badge);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* 헤더 */}
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <SvgIcon name="vrHeadset" size={24} color="#1884FF" />
                <Text style={styles.title}>VR 실습을 시작할까요?</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 뱃지 정보 */}
            <View style={styles.badgeInfo}>
              <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
                <Text style={styles.iconText}>{badge.icon}</Text>
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>

            {/* 실습 정보 */}
            <View style={styles.practiceInfo}>
              <Text style={styles.sectionTitle}>실습 정보</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🥽</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>실습 유형</Text>
                  <Text style={styles.infoValue}>VR 가상 실습</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>⏱️</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>예상 소요 시간</Text>
                  <Text style={styles.infoValue}>약 30분</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🎯</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>목표 점수</Text>
                  <Text style={styles.infoValue}>{badge.passingScore}점</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📊</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>현재 점수</Text>
                  <Text style={styles.infoValue}>{badge.currentScore}점</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>🔄</Text>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>시도 횟수</Text>
                  <Text style={styles.infoValue}>{badge.attempts}회</Text>
                </View>
              </View>
            </View>

            {/* 준비사항 */}
            <View style={styles.checklist}>
              <Text style={styles.sectionTitle}>준비사항</Text>
              
              <View style={styles.checklistItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.checkText}>VR 헤드셋 착용</Text>
              </View>
              
              <View style={styles.checklistItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.checkText}>조용한 환경</Text>
              </View>
              
              <View style={styles.checklistItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.checkText}>30분 여유 시간</Text>
              </View>
              
              <View style={styles.checklistItem}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.checkText}>충분한 공간 확보</Text>
              </View>
            </View>

            {/* 주의사항 */}
            <View style={styles.warning}>
              <Text style={styles.warningTitle}>⚠️ 주의사항</Text>
              <Text style={styles.warningText}>
                • VR 실습 중 멀미나 어지러움을 느끼면 즉시 중단하세요{'\n'}
                • 실습 중 주변 환경에 주의하세요{'\n'}
                • 실습 완료 후 점수가 자동으로 업데이트됩니다
              </Text>
            </View>

            {/* 버튼 */}
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={onClose}
              >
                <Text style={styles.cancelBtnText}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmBtn}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmBtnText}>시작하기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 400,
  },
  
  scrollContent: {
    padding: 24,
  },
  
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191F28',
    flex: 1,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  // 뱃지 정보
  badgeInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  iconText: {
    fontSize: 32,
  },
  
  badgeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 4,
  },
  
  badgeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  
  // 섹션
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 16,
  },
  
  // 실습 정보
  practiceInfo: {
    marginBottom: 24,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  
  infoContent: {
    flex: 1,
  },
  
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191F28',
  },
  
  // 체크리스트
  checklist: {
    marginBottom: 24,
  },
  
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  checkIcon: {
    fontSize: 16,
    color: '#10B981',
    marginRight: 12,
    width: 20,
  },
  
  checkText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  
  // 주의사항
  warning: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D97706',
    marginBottom: 8,
  },
  
  warningText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  
  // 버튼
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  
  confirmBtn: {
    flex: 1,
    backgroundColor: '#1884FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

