import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';
import { COLORS, TYPOGRAPHY, CARD_STYLES, ICON_STYLES } from '../constants/designSystem';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress?: () => void;
}

interface OptimizedQuickActionsProps {
  actions: QuickAction[];
}

export const OptimizedQuickActions: React.FC<OptimizedQuickActionsProps> = ({
  actions = [],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <SvgIcon name={action.icon} size={28} color="#1884FF" />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
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
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(24, 132, 255, 0.05)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(24, 132, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#1884FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#191F28',
    textAlign: 'center',
    letterSpacing: -0.1,
  },
});
