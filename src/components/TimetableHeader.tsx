import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

interface TimetableHeaderProps {
  onBack?: () => void;
  onMenu?: () => void;
}

export const TimetableHeader: React.FC<TimetableHeaderProps> = ({ 
  onBack, 
  onMenu 
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      
      <View style={styles.titleSection}>
        <Text style={styles.title}>시간표</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={onMenu}
        activeOpacity={0.7}
      >
        <Text style={styles.menuIcon}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    height: 44,
  },
  
  backButton: {
    padding: 8,
  },
  
  backIcon: {
    fontSize: 24,
    color: '#191F28',
  },
  
  titleSection: {
    flex: 1,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191F28',
  },
  
  menuButton: {
    padding: 8,
  },
  
  menuIcon: {
    fontSize: 24,
    color: '#191F28',
  },
});
