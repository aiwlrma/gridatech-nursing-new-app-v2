import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BLUE_THEME } from '../constants/blueTheme';
import { DateOption } from '../types';

interface DateScrollPickerProps {
  dates: DateOption[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export const DateScrollPicker: React.FC<DateScrollPickerProps> = ({
  dates = [],
  selectedDate,
  onDateSelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates?.map((date) => {
          const isSelected = date.date === selectedDate;
          return (
            <TouchableOpacity
              key={date.id}
              style={[
                styles.dateChip,
                isSelected && styles.selectedChip,
              ]}
              onPress={() => onDateSelect(date.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.selectedText,
                ]}
              >
                {date.label}
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
  dateChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: BLUE_THEME.quickActions.message.bg,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: BLUE_THEME.primary,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: BLUE_THEME.quickActions.message.icon,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});
