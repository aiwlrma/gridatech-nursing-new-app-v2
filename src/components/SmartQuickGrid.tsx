import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageCircle, Megaphone, Calendar, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BLUE_THEME } from '../constants/blueTheme';

interface QuickAction {
  id: string;
  title: string;
  count: string;
  icon: React.ReactNode;
  gradient: string[];
  iconColor: string;
  onPress?: () => void;
}

interface SmartQuickGridProps {
  actions: QuickAction[];
}

export const SmartQuickGrid: React.FC<SmartQuickGridProps> = ({ actions = [] }) => {
  // 안전한 배열 처리
  const safeActions = Array.isArray(actions) ? actions : [];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {safeActions?.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickCard}
            onPress={action.onPress}
          >
            <LinearGradient
              colors={action.gradient || ['#E3F2FD', '#BBDEFB']}
              style={styles.iconCircle}
            >
              {action.icon}
            </LinearGradient>
            <Text style={styles.quickTitle}>{action.title}</Text>
            <Text style={styles.quickCount}>{action.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    height: 160, // 140px → 160px
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20, // 16px → 20px
    marginBottom: 16, // 12px → 16px
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: BLUE_THEME.shadow,
    shadowOffset: {
      width: 0,
      height: 2, // 4px → 2px
    },
    shadowOpacity: 0.06, // 0.12 → 0.06
    shadowRadius: 16,
    elevation: 2, // 4 → 2
  },
  iconCircle: {
    width: 88, // 72px → 88px
    height: 88, // 72px → 88px
    borderRadius: 44, // 36px → 44px
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickTitle: {
    fontSize: 17, // 15px → 17px
    fontWeight: '700', // 600 → 700
    color: '#1A1F2E',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickCount: {
    fontSize: 24, // 13px → 24px
    fontWeight: '800', // 600 → 800
    color: '#1976D2', // 이미지와 일치하는 파란색
    textAlign: 'center',
  },
});
