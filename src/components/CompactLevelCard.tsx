import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { BLUE_THEME } from '../constants/blueTheme';

interface CompactLevelCardProps {
  level?: number;
  progress?: number;
  todayReservations?: number;
  onPress?: () => void;
}

export const CompactLevelCard: React.FC<CompactLevelCardProps> = ({
  level = 7,
  progress = 75,
  todayReservations = 2,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.levelSection}>
        <View style={styles.levelBadge}>
          <SvgIcon name="awardNew" size={16} color="#1884FF" />
          <Text style={styles.levelText}>Lv.{level}</Text>
        </View>
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>⭐ {progress}%</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.todaySection}>
        <Text style={styles.todayText}>오늘 {todayReservations}개 예약</Text>
        <SvgIcon name="chevronRight" size={16} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
    gap: 4,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1884FF',
  },
  progressSection: {
    flex: 1,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191F28',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  todaySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  todayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
});
