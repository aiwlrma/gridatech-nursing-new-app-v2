import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BLUE_THEME } from '../constants/blueTheme';

interface Tab {
  id: string;
  label: string;
}

interface SmartTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

export const SmartTabBar: React.FC<SmartTabBarProps> = ({
  tabs = [],
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs?.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                isActive ? styles.tabActive : styles.tabInactive,
              ]}
              onPress={() => onTabPress(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab.label}
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 28, // 탭과 콘텐츠 사이 간격 추가
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingHorizontal: 20, // 유지
    paddingVertical: 12, // 12px → 12px (높이 40px → 44px)
    marginRight: 12,
    borderRadius: 22, // 24px → 22px
    height: 44, // 40px → 44px
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: BLUE_THEME.primaryDark,
  },
  tabInactive: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 15, // 유지
    fontWeight: '700', // 600 → 700
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#6B7280',
  },
});
