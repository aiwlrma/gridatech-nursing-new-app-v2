import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from './SvgIcon';

interface SmartHomeHeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
}

export const SmartHomeHeader: React.FC<SmartHomeHeaderProps> = ({
  userName = '김간호',
  onNotificationPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>안녕하세요, {userName}님! 👋</Text>
        <Text style={styles.subGreeting}>오늘도 화이팅하세요!</Text>
      </View>
      
      <TouchableOpacity style={styles.notificationContainer} onPress={onNotificationPress}>
        <SvgIcon name="bell" color="#1A1F2E" size={24} />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20, // 8px → 20px로 조정
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 28, // 18px → 28px
    fontWeight: '800', // bold → 800
    color: '#1A1F2E',
    marginBottom: 4,
    letterSpacing: -0.5, // Toss 스타일
    lineHeight: 42, // 28 * 1.5 = 42
  },
  subGreeting: {
    fontSize: 15, // 14px → 15px
    fontWeight: '600', // 500 → 600
    color: '#6B7280',
    lineHeight: 22.5, // 15 * 1.5 = 22.5
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});
