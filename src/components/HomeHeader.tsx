import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Bell } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants';

interface HomeHeaderProps {
  userName?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName = '',
  onNotificationPress,
  onProfilePress,
}) => {
  // 이름에서 이니셜 추출
  const getInitials = (name: string) => {
    return name.slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileContainer} onPress={onProfilePress}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitials}>{getInitials(userName)}</Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          안녕하세요, {userName} 간호사님! 👋
        </Text>
      </View>
      
      <TouchableOpacity style={styles.notificationContainer} onPress={onNotificationPress}>
        <Bell color="#1A1F2E" size={24} />
        <View style={styles.notificationBadge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.border,
  },
  profileContainer: {
    marginRight: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1884FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1F2E',
    fontFamily: Platform.select({
      ios: 'Pretendard-Bold',
      android: 'Pretendard-Bold',
    }),
  },
  notificationContainer: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
});
