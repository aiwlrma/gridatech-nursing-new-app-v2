import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageCircle, Megaphone, Calendar, BookOpen } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants';

interface QuickAction {
  id: string;
  icon: string;
  iconName?: string; // SVG 아이콘 이름
  title: string;
  subtitle: string;
  onPress?: () => void;
}

interface QuickActionGridProps {
  actions: QuickAction[];
}

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ actions = [] }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'message':
        return <MessageCircle color="#1884FF" size={32} />;
      case 'megaphone':
        return <Megaphone color="#F59E0B" size={32} />;
      case 'calendar':
        return <Calendar color="#10B981" size={32} />;
      case 'books':
        return <BookOpen color="#8B5CF6" size={32} />;
      default:
        return <Text style={styles.icon}>{actions?.find(a => a.id === iconName)?.icon}</Text>;
    }
  };

  const getIconBackgroundColor = (iconName: string) => {
    switch (iconName) {
      case 'message':
        return '#F0F7FF';
      case 'megaphone':
        return '#FFF7ED';
      case 'calendar':
        return '#ECFDF5';
      case 'books':
        return '#F5F3FF';
      default:
        return '#F9FAFB';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {actions?.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            onPress={action.onPress}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: getIconBackgroundColor(action.iconName || '') }
            ]}>
              {action.iconName ? getIconComponent(action.iconName) : (
                <Text style={styles.icon}>{action.icon}</Text>
              )}
            </View>
            <Text style={styles.title}>{action.title}</Text>
            <Text style={styles.subtitle}>{action.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    height: 140,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
});
