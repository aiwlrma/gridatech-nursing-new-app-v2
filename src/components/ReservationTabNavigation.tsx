import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type ReservationTab = 'my-reservations' | 'professor-schedule';

interface ReservationTabNavigationProps {
  activeTab: ReservationTab;
  onTabChange: (tab: ReservationTab) => void;
}

export const ReservationTabNavigation: React.FC<ReservationTabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'my-reservations' && styles.activeTab]}
        onPress={() => onTabChange('my-reservations')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'my-reservations' && styles.activeTabText
        ]}>
          내 예약
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tab, activeTab === 'professor-schedule' && styles.activeTab]}
        onPress={() => onTabChange('professor-schedule')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'professor-schedule' && styles.activeTabText
        ]}>
          교수 일정 보기
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F0F9FF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#1884FF',
    fontWeight: '700',
  },
});
