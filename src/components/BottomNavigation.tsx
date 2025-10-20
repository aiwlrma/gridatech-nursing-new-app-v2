import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { Home, MessageCircle, Bell, Calendar } from 'lucide-react-native';

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.tabBar}>
          {/* 홈 */}
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => onTabPress('home')}
          >
            <Home 
              size={22} 
              color={activeTab === 'home' ? '#1884FF' : '#9CA3AF'}
              strokeWidth={activeTab === 'home' ? 2.5 : 2}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'home' && styles.activeTabText
            ]}>
              홈
            </Text>
          </TouchableOpacity>

          {/* 메시지 */}
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => onTabPress('messages')}
          >
            <View style={styles.iconContainer}>
              <MessageCircle 
                size={22}
                color={activeTab === 'messages' ? '#1884FF' : '#9CA3AF'}
                strokeWidth={activeTab === 'messages' ? 2.5 : 2}
              />
              {/* 배지 */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
            <Text style={[
              styles.tabText,
              activeTab === 'messages' && styles.activeTabText
            ]}>
              메시지
            </Text>
          </TouchableOpacity>

          {/* 공지사항 */}
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => onTabPress('notice')}
          >
            <Bell 
              size={22}
              color={activeTab === 'notice' ? '#1884FF' : '#9CA3AF'}
              strokeWidth={activeTab === 'notice' ? 2.5 : 2}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'notice' && styles.activeTabText
            ]}>
              공지사항
            </Text>
          </TouchableOpacity>

          {/* 나의 예약 */}
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => onTabPress('reservationManagement')}
          >
            <Calendar 
              size={22}
              color={activeTab === 'reservationManagement' ? '#1884FF' : '#9CA3AF'}
              strokeWidth={activeTab === 'reservationManagement' ? 2.5 : 2}
            />
            <Text style={[
              styles.tabText,
              activeTab === 'reservationManagement' && styles.activeTabText
            ]}>
              나의 예약
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  safeArea: {
    backgroundColor: '#FFFFFF',
  },

  tabBar: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 0,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2, // 4 → 2 (간격 축소)
  },

  iconContainer: {
    position: 'relative',
  },

  // 배지 (작게)
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 16, // 18 → 16
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    fontSize: 9, // 10 → 9
    fontWeight: '700',
    color: '#FFFFFF',
  },

  tabText: {
    fontSize: 11, // 12 → 11
    fontWeight: '500',
    color: '#9CA3AF',
  },

  activeTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1884FF',
  },
});
