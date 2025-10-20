import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NoticeFilter } from '../types';

interface NoticeFilterTabsProps {
  filters: NoticeFilter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export const NoticeFilterTabs: React.FC<NoticeFilterTabsProps> = ({
  filters = [],
  activeFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters?.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.tab,
              activeFilter === filter.id && styles.activeTab,
            ]}
            onPress={() => onFilterChange(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeFilter === filter.id && styles.activeTabText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8, // 여백 감소
    paddingHorizontal: 16, // 여백 감소
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  tab: {
    paddingHorizontal: 12, // 패딩 감소
    paddingVertical: 8,
    marginRight: 16, // 간격 증가
    borderBottomWidth: 2, // 밑줄 추가
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1884FF', // 파란 밑줄
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1884FF', // 파란 텍스트
    fontWeight: '600',
  },
});
