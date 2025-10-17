import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Reservation } from '../types';

interface StatusChipProps {
  status: Reservation['status'];
}

export const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'scheduled':
        return {
          label: '확정',
          backgroundColor: '#E3F2FD',
          textColor: '#1976D2',
        };
      case 'completed':
        return {
          label: '완료',
          backgroundColor: '#ECFDF5',
          textColor: '#10B981',
        };
      case 'cancelled':
        return {
          label: '취소',
          backgroundColor: '#FEF2F2',
          textColor: '#EF4444',
        };
      default:
        return {
          label: '대기',
          backgroundColor: '#FEF3C7',
          textColor: '#D97706',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          { color: config.textColor },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
