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
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F0F7FF',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#1884FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
