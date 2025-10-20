import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return {
          text: '승인 대기',
          backgroundColor: '#F59E0B',
          textColor: '#92400E',
        };
      case 'approved':
        return {
          text: '승인됨',
          backgroundColor: '#10B981',
          textColor: '#065F46',
        };
      case 'rejected':
        return {
          text: '거절됨',
          backgroundColor: '#EF4444',
          textColor: '#991B1B',
        };
      case 'cancelled':
        return {
          text: '취소됨',
          backgroundColor: '#6B7280',
          textColor: '#374151',
        };
      default:
        return {
          text: '알 수 없음',
          backgroundColor: '#6B7280',
          textColor: '#374151',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <View style={[styles.badge, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.badgeText, { color: config.textColor }]}>
        {config.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});