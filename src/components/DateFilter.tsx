import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/designSystem';

interface DateFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const filters = [
    { id: 'today', label: '오늘' },
    { id: 'tomorrow', label: '내일' },
    { id: 'week', label: '이번주' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.activeFilter,
            ]}
            onPress={() => onFilterChange(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 6,
    gap: 6,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.1)',
  },
  filterText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: -0.1,
  },
  activeFilterText: {
    color: '#191F28',
    fontWeight: '700',
  },
});
