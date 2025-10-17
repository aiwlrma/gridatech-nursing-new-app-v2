import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgIcon } from './SvgIcon';

interface TabItem {
  id: string;
  label: string;
  icon?: string;
  iconName?: string; // SVG 아이콘 이름
  hasNotification?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const { width } = Dimensions.get('window');

export const TabBar: React.FC<TabBarProps> = ({ tabs = [], activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();
  
  const TabItem: React.FC<{ tab: TabItem; isActive: boolean }> = ({ tab, isActive }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    
    const handlePress = () => {
      // 클릭 시 scale 애니메이션
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      onTabPress(tab.id);
    };

    const handlePressIn = () => {
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.tabContent,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <View style={styles.iconContainer}>
            {tab.iconName ? (
              <SvgIcon 
                name={tab.iconName} 
                size={28} 
                color={isActive ? '#1884FF' : '#9CA3AF'} 
              />
            ) : tab.icon ? (
              <Text style={[styles.icon, { color: isActive ? '#1884FF' : '#9CA3AF' }]}>
                {tab.icon}
              </Text>
            ) : null}
            {tab.hasNotification && (
              <View style={styles.notificationBadge} />
            )}
          </View>
          <Text
            style={[
              styles.label,
              {
                color: isActive ? '#1884FF' : '#9CA3AF',
                fontWeight: isActive ? '700' : '600',
              },
            ]}
          >
            {tab.label}
          </Text>
          {isActive && <View style={styles.activeIndicator} />}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {tabs?.map((tab) => (
          <TabItem
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBar: {
    flexDirection: 'row',
    height: 84,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Pretendard',
      android: 'Pretendard-Regular',
    }),
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1884FF',
  },
});
