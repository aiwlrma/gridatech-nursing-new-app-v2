import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

interface GradeScreenProps {
  onBack: () => void;
}

const GradeScreen: React.FC<GradeScreenProps> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>활동 배지</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareText}>공유</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* 레벨 카드 */}
        <View style={styles.levelCard}>
          <View style={styles.levelGradient}>
            <Text style={styles.levelLabel}>현재 레벨</Text>
            <Text style={styles.levelNumber}>Level 7</Text>
            <Text style={styles.xpText}>2,450 / 3,000 XP</Text>
          </View>
        </View>

        {/* 대표 뱃지 */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>나의 대표 뱃지</Text>
          <Text style={styles.sectionSub}>
            획득한 뱃지가 3개 있어요.{'\n'}
            '활동뱃지'만 대표 뱃지로 설정할 수 있어요.
          </Text>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredEmoji}>🚑</Text>
          </View>
        </View>

        {/* 뱃지 그리드 */}
        <View style={styles.badgeGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <View key={item} style={styles.badgeItem}>
              <Text style={styles.badgeEmoji}>🔒</Text>
              <Text style={styles.badgeName}>뱃지 {item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#191F28',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
  },
  shareButton: {
    padding: 8,
  },
  shareText: {
    fontSize: 16,
    color: '#191F28',
  },
  scrollView: {
    flex: 1,
  },
  levelCard: {
    margin: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#3B82F6',
  },
  levelGradient: {
    padding: 24,
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  xpText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  featuredSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191F28',
    marginBottom: 8,
  },
  sectionSub: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuredBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredEmoji: {
    fontSize: 64,
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  badgeItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  badgeEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191F28',
    textAlign: 'center',
  },
});

export default GradeScreen;