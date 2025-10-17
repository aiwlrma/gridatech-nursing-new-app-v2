import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { ReservationFilter } from '../types';

interface ReservationFilterTabsProps {
  filters: ReservationFilter[];
  activeFilter: string;
  onFilterSelect: (filter: string) => void;
}

export const ReservationFilterTabs: React.FC<ReservationFilterTabsProps> = ({
  filters = [],
  activeFilter,
  onFilterSelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters?.map((filter) => {
          const isActive = filter.filter === activeFilter;
          return (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
              onPress={() => onFilterSelect(filter.filter)}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: BLUE_THEME.quickActions.message.bg,
  },
  activeTab: {
    backgroundColor: BLUE_THEME.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: BLUE_THEME.quickActions.message.icon,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
