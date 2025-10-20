import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface BookingAlertProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    practice: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
  };
}

export const BookingAlert: React.FC<BookingAlertProps> = ({
  visible,
  onClose,
  onConfirm,
  data,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {/* 제목 */}
          <Text style={styles.title}>예약 요청</Text>
          
          {/* 내용 */}
          <View style={styles.content}>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>📝</Text>
              <Text style={styles.infoText}>{data.practice}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.icon}>📅</Text>
              <Text style={styles.infoText}>{data.date}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.icon}>🕐</Text>
              <Text style={styles.infoText}>{data.startTime} - {data.endTime}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.icon}>📍</Text>
              <Text style={styles.infoText}>{data.location}</Text>
            </View>

            {/* 알림 */}
            <View style={styles.notice}>
              <Text style={styles.noticeText}>⚠️ 교수님 승인이 필요합니다</Text>
            </View>
          </View>

          {/* 버튼 */}
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.cancelBtn}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.confirmBtn}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>예약 요청</Text>
            </TouchableOpacity>
          </View>
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

  alertBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12, // 둥글게
    width: '90%',
    maxWidth: 320,
    overflow: 'hidden',
  },

  // 제목
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    textAlign: 'center',
  },

  // 내용
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  icon: {
    fontSize: 14,
    marginRight: 8,
    width: 18, // 아이콘 정렬
  },

  infoText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#191F28',
    lineHeight: 18,
  },

  // 알림
  notice: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
  },

  noticeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#92400E',
    textAlign: 'center',
  },

  // 버튼
  buttons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },

  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F3F4F6',
  },

  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  confirmBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },

  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1884FF',
  },
});
