import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type BookingTab = 'myBookings' | 'professorSchedule';

interface BookingTabNavigationProps {
  activeTab: BookingTab;
  onTabChange: (tab: BookingTab) => void;
}

export const BookingTabNavigation: React.FC<BookingTabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'myBookings' as BookingTab, label: '내 예약' },
    { id: 'professorSchedule' as BookingTab, label: '교수 일정 보기' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
          ]}
          onPress={() => onTabChange(tab.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', // 구분선 색상 변경
  },
  tab: {
    flex: 1,
    paddingVertical: 12, // 높이 조정
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 2, // 밑줄 두께 감소
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1884FF', // 파란 밑줄
  },
  tabText: {
    fontSize: 14, // 폰트 크기 감소
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1884FF', // 파란 텍스트
    fontWeight: '700',
  },
});
